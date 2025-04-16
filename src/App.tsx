import { useEffect, useState, useRef } from 'react'
import Boards from './components/Boards'
import  { Board, Column, Task, Timer } from  './Types'
import { Routes, Route } from 'react-router-dom'
import ShowBoard from './components/ShowBoard'
import { db,auth } from './FirebaseConfig'; // Import your Firebase configuration
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc,orderBy, query, serverTimestamp, where } from 'firebase/firestore';
import Auth from './components/Auth';
import { signOut } from 'firebase/auth';

const App: React.FC = () => {
  const [dataBoard, setDataBoard] = useState<Board[]>([]);
  const [dataColumn, setDataColumn] = useState<Column[]>([]);
  const [dataTask, setDataTask] = useState<Task[]>([]);
  const [dataTimer, setDataTimer] = useState<Timer[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const [user, setUser] = useState(auth.currentUser);

  // Cache for authenticated user
  const userCacheRef = useRef(auth.currentUser);

  // Cache for fetched data
  const cacheRef = useRef({
    boards: null as Board[] | null,
    columns: null as Column[] | null,
    tasks: null as Task[] | null,
    timers: null as Timer[] | null,
  });

  // Debounce function for limiting writes
  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // console.log('board: ' + dataBoard)
  // console.log('col: ' + dataColumn)
  // console.log('task: ' + dataTask.map((task) => task.id))
  // console.log('timer: ' + dataTimer.map((task) => JSON.stringify(task)))
  //user authentication
  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      userCacheRef.current = currentUser; // Cache the authenticated user
      if (currentUser) {
        fetchData();
      } else {
        setDataTask([]);
        setDataColumn([]);
        setDataBoard([]);
        setDataTimer([]);
      }
    });
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
    setDataTask([]);
    setDataColumn([]);
    setDataBoard([]);
    setDataTimer([]);
  };

//fetch all data from firebase
  const fetchData = async () => {
    const cachedUser = userCacheRef.current; // Use cached user
    if (!cachedUser) return;

    if (cacheRef.current.boards && cacheRef.current.columns && cacheRef.current.tasks && cacheRef.current.timers) {
      setDataBoard(cacheRef.current.boards);
      setDataColumn(cacheRef.current.columns);
      setDataTask(cacheRef.current.tasks);
      setDataTimer(cacheRef.current.timers);
      return;
    }

    const boardCollection = collection(db, 'boards');
    const columsCollection = collection(db, 'columns')
    
    try {
      //get boards data and filter it by user id
      const q_boards =  query(boardCollection, where('userId', '==', cachedUser.uid), orderBy('createdAt', 'asc'));
      const boardSnapshot = await getDocs(q_boards);
      const boards = boardSnapshot.docs
        .map(doc => {
          const data = doc.data();
          return { id: doc.id, title: data.title, slug: data.slug, bg: data.bg, userId: data.userId, createdAt:data.createdAt };
        })
      setDataBoard(boards);
      
      //get columns data and filter it by board id
      const q_columns = query(columsCollection, orderBy('createdAt', 'asc'))
      const columnSnapshot = await getDocs(q_columns)
      const columns = columnSnapshot.docs
        .map(doc => {
          const data = doc.data();
          return { id: doc.id, boardId: data.boardId, title: data.title, userId: data.userId, createdAt:data.createdAt };
        })
        .filter(column => boards.some(board => board.id === column.boardId));
      setDataColumn(columns);

      //get tasks data and filter it by board id
      const taskSnapshot = await getDocs(collection(db, 'tasks'));
      const tasks = taskSnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            boardId: data.boardId || '',
            colId: data.colId || '',
            title: data.title || '',
            description: data.description || '',
            completed: data.completed || false,
            hasTimer: data.hasTimer || false,
            userId: data.userId,
          };
        })
        .filter(task => boards.some(board => board.id === task.boardId));
      setDataTask(tasks);

      //get timers data and filter it by task id
      const timerSnapshot = await getDocs(collection(db, 'timers'));
      const timers = timerSnapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            taskId: data.taskId || '',
            boardId: data.boardId || '',
            colId: data.colId || '',
            minutes: data.minutes || 0,
            seconds: data.seconds || 0,
            isOn: data.isOn || false,
            fixedBreakTime: data.fixedBreakTime || 5,
            fixedPomodoroTime: data.fixedPomodoroTime || 25,
            userId: data.userId,
            breakTime: false
          };
        })
        .filter(timer => tasks.some(task => task.id === timer.taskId));
      setDataTimer(timers);

      // Cache the fetched data
      cacheRef.current.boards = boards;
      cacheRef.current.columns = columns;
      cacheRef.current.tasks = tasks;
      cacheRef.current.timers = timers;

    } catch (error) {
      console.error('Error fetching data from Firebase:', error);
    }
  };

  // dark/light mode-------------------------------------------------
  useEffect(() => {
    const mode = JSON.parse(localStorage.getItem('mode') || 'true');
    setDarkMode(mode);
    
  }, []);

  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(darkMode));
  }, [darkMode]);

  // boards-------------------------------------------------
  const addBoard = async (title: string, bg: string) => {
    try {
      const user = auth.currentUser;
      if (user) {
        const docRef = await addDoc(collection(db, 'boards'), { title, slug: title, bg, userId: user ? user.uid : null, createdAt: serverTimestamp() });
        setDataBoard([...dataBoard, { id: docRef.id, title, slug: title, bg, userId: user ? user.uid : null }]);
      }      
    } catch (error) {
      console.error('Error adding board:', error);
    }
  }
  
  const deleteBoard = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'boards', id));
      setDataBoard(dataBoard.filter(board => board.id !== id));
      const columnsToDelete = dataColumn.filter(col => col.boardId === id);
      const tasksToDelete = dataTask.filter(task => task.boardId === id);
      const timersToDelete = dataTimer.filter(timer => timer.boardId === id);

      // Delete related columns
      for (const col of columnsToDelete) {
        await deleteDoc(doc(db, 'columns', col.id));
      }

      // Delete related tasks
      for (const task of tasksToDelete) {
        await deleteDoc(doc(db, 'tasks', task.id));
      }

      // Delete related timers
      for (const timer of timersToDelete) {
        await deleteDoc(doc(db, 'timers', timer.id));
      }

      setDataColumn(dataColumn.filter(col => col.boardId !== id));
      setDataTask(dataTask.filter(task => task.boardId !== id));
      setDataTimer(dataTimer.filter(timer => timer.boardId !== id));
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  const updateBoard = async (id: string, newTitle: string) => {
    try {
      await updateDoc(doc(db, 'boards', id), { title: newTitle });
      setDataBoard(dataBoard.map(data => (data.id === id ? { ...data, title: newTitle } : data)));
    } catch (error) {
      console.error('Error updating board:', error);
    }
  };

  // columns--------------------------------------------------------------
  const addColumn = async (title: string, boardId: string | null) => {
    try {
      const docRef = await addDoc(collection(db, 'columns'), { title, boardId, createdAt: serverTimestamp() });
      setDataColumn([...dataColumn, { id: docRef.id, title, boardId }]);
    } catch (error) {
      console.error('Error adding column:', error);
    }
  };

  const deleteColumn = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'columns', id));
      const tasksToDelete = dataTask.filter(task => task.colId === id);
      const timersToDelete = dataTimer.filter(timer => timer.colId === id);

      // Delete related tasks
      for (const task of tasksToDelete) {
        await deleteDoc(doc(db, 'tasks', task.id));
      }

      // Delete related timers
      for (const timer of timersToDelete) {
        await deleteDoc(doc(db, 'timers', timer.id));
      }

      setDataColumn(dataColumn.filter(data => data.id !== id));
      setDataTask(dataTask.filter(data => data.colId !== id));
      setDataTimer(dataTimer.filter(data => data.colId !== id));
    } catch (error) {
      console.error('Error deleting column:', error);
    }
  };

  const updateColumn = async (id: string, newTitle: string) => {
    try {
      await updateDoc(doc(db, 'columns', id), { title: newTitle });
      setDataColumn(dataColumn.map(data => (data.id === id ? { ...data, title: newTitle } : data)));
    } catch (error) {
      console.error('Error updating column:', error);
    }
  };

  // tasks---------------------------------------------------------------
  const addTask = async (title: string, columnId: string, boardId: string | null) => {
    try {
      const docRef = await addDoc(collection(db, 'tasks'), {boardId, colId: columnId, title, description: '', completed: false , hasTimer: false});
      setDataTask([...dataTask, { id: docRef.id, boardId, colId: columnId, title, description: '', completed: false , hasTimer: false}]);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const debouncedUpdateTaskOrder = debounce(async (tasks: Task[]) => {
    try {
      for (const task of tasks) {
        await updateDoc(doc(db, 'tasks', task.id), { colId: task.colId });
      }
      setDataTask(tasks);
    } catch (error) {
      console.error('Error updating task order:', error);
    }
  }, 500);

  const updateTaskOrder = (tasks: Task[]) => {
    debouncedUpdateTaskOrder(tasks);
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));

      const timersToDelete = dataTimer.filter(timer => timer.taskId === id);

      // Delete related timers
      for (const timer of timersToDelete) {
        await deleteDoc(doc(db, 'timers', timer.id));
      }

      setDataTask(dataTask.filter(data => data.id !== id));
      setDataTimer(dataTimer.filter(data => data.taskId !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const updateTask = async (id: string, newTitle: string) => {
    try {
      await updateDoc(doc(db, 'tasks', id), { title: newTitle });
      setDataTask(dataTask.map(data => (data.id === id ? { ...data, title: newTitle } : data)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const updateTaskHasTimer = async (id: string, updatedHasTimer: boolean) => {
    try {
      await updateDoc(doc(db, 'tasks', id), { hasTimer:updatedHasTimer });
      setDataTask(dataTask.map(data => (data.id === id ? { ...data, hasTimer:updatedHasTimer } : data)));
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const toggleCompleteTask = async (id: string) => {
    try {
      const task = dataTask.find(data => data.id === id);
      if (task) {
        await updateDoc(doc(db, 'tasks', id), { completed: !task.completed });
        setDataTask(dataTask.map(data => (data.id === id ? { ...data, completed: !data.completed } : data)));
      }
    } catch (error) {
      console.error('Error toggling task completion:', error);
    }
  };

  const updateTaskDescription = async (id: string, newDescription: string) => {
    try {
      await updateDoc(doc(db, 'tasks', id), { description: newDescription });
      setDataTask(dataTask.map(data => (data.id === id ? { ...data, description: newDescription } : data)));
    } catch (error) {
      console.error('Error updating task description:', error);
    }
  };

  // timer---------------------------------------------------------------
  const addTimer = async (taskId: string, boardId: string, colId: string) => {
    try {
      const docRef = await addDoc(collection(db, 'timers'), { taskId, boardId, colId, minutes: 25, seconds: 0, isOn: false, fixedBreakTime: 5, fixedPomodoroTime: 25, breakTime: false});
      setDataTimer([...dataTimer, { id: docRef.id, taskId, boardId, colId, minutes: 25, seconds: 0, isOn: false, fixedBreakTime: 5, fixedPomodoroTime: 25, breakTime: false, }]);
    } catch (error) {
      console.error('Error adding timer:', error);
    }
  };

  const updateTaskTimer = (id: string, newMinutes: number, newSeconds: number, newBreakTime: boolean) => {
    setDataTimer(dataTimer.map(data => (data.id === id ? { ...data, minutes: newMinutes, seconds: newSeconds, breakTime: newBreakTime } : data)));
  };

  const debouncedUpdateTaskTimerFirebase = debounce(async (id: string, newMinutes: number, newSeconds: number, newBreakTime: boolean) => {
    try {
        await updateDoc(doc(db, 'timers', id), { minutes: newMinutes, seconds: newSeconds, breakTime: newBreakTime });
        setDataTimer(dataTimer.map(data => (data.id === id ? { ...data, minutes: newMinutes, seconds: newSeconds, breakTime: newBreakTime  } : data))); 
    } catch (error) {
      console.error('Error updating timer:', error);
    }
  }, 500);

  const updateTaskTimerFirebase = (id: string, newMinutes: number, newSeconds: number, newBreakTime: boolean) => {
    debouncedUpdateTaskTimerFirebase(id, newMinutes, newSeconds, newBreakTime);
  };

  const updateFixedTime = async (id: string, newPomoTime: number, newBreakTime: number) => {
    try {
      await updateDoc(doc(db, 'timers', id), { fixedBreakTime: newBreakTime, fixedPomodoroTime: newPomoTime });
      setDataTimer(dataTimer.map(data => (data.id === id ? { ...data, fixedBreakTime: newBreakTime, fixedPomodoroTime: newPomoTime } : data)));
    } catch (error) {
      console.error('Error updating fixed time:', error);
    }
  };

  const pauseStartTaskTimer = async (id: string) => {
    try {
      const timer = dataTimer.find(data => data.id === id);
      if (timer) {
        await updateDoc(doc(db, 'timers', id), { isOn: !timer.isOn });
        setDataTimer(dataTimer.map(data => (data.id === id ? { ...data, isOn: !data.isOn } : data)));
      }
    } catch (error) {
      console.error('Error toggling timer state:', error);
    }
  };
  
  return (
   <div className={` transition-all duration-300 min-h-screen ${darkMode ? 'text-white bg-[#1d2125]' : 'text-gray-600 bg-[#ffffff85]'}`}>
   <div className='hidden from-red-900 via-red-600 from-green-900 via-green-600 from-blue-900
    via-blue-600 from-orange-900 via-orange-600 from-yellow-900 via-yellow-600 from-purple-900 via-purple-600 from-pink-900 via-pink-600
    from-lime-900 via-lime-600 from-cyan-900 via-cyan-600 from-slate-900 via-slate-600 to-red-500 to-green-500
    to-blue-500 to-orange-500 to-yellow-500 to-purple-500 to-pink-500 to-lime-500 to-cyan-500 to-slate-500 
    
    from-red-500 via-red-400 from-green-500 via-green-400 from-blue-500
    via-blue-400 from-orange-500 via-orange-400 from-yellow-500 via-yellow-400 from-purple-500 via-purple-400 from-pink-500 via-pink-400
    from-lime-500 via-lime-400 from-cyan-500 via-cyan-400 from-slate-500 via-slate-400 to-red-300 to-green-300
    to-blue-300 to-orange-300 to-yellow-300 to-purple-300 to-pink-300 to-lime-300 to-cyan-300 to-slate-300

    hover:bg-purple-400/80 hover:bg-red-400/80 hover:bg-green-400/80 hover:bg-blue-400/80 hover:bg-orange-400/80 hover:bg-yellow-400/80 hover:bg-pink-400/80 hover:bg-lime-400/80 hover:bg-cyan-400/80
    hover:bg-slate-400/80
    '>

   </div>
      <Routes>
          <Route path='/' element={<Boards updateBoard={updateBoard} handleSignOut={handleSignOut} user={user} setDarkMode={setDarkMode} deleteBoard={deleteBoard} darkMode={darkMode} dataBoard={dataBoard} addBoard={addBoard}></Boards>}></Route>
          <Route path=':slug' element={<ShowBoard updateTaskTimerFirebase={updateTaskTimerFirebase} updateTaskOrder={updateTaskOrder} user={user}  handleSignOut={handleSignOut} updateTaskHasTimer={updateTaskHasTimer } deleteColumn={deleteColumn} updateFixedTime={updateFixedTime} pauseStartTaskTimer={pauseStartTaskTimer}  dataTimer={dataTimer} addTimer={ addTimer} updateTaskTimer={updateTaskTimer} updateTaskDescription={updateTaskDescription} toggleCompleteTask={toggleCompleteTask} deleteTask={deleteTask} updateTask={updateTask} updateColumn={updateColumn} setDarkMode={setDarkMode} darkMode={darkMode} dataColumn={dataColumn} addTask={addTask} dataTask={dataTask} setDataTask={setDataTask}  addColumn={addColumn} dataBoard={dataBoard}></ShowBoard>}></Route>
          <Route path='/auth' element={<Auth darkMode={darkMode} setDarkMode={setDarkMode} onAuthSuccess={fetchData}></Auth>}></Route>
      </Routes>
   </div>
  )
}

export default App
