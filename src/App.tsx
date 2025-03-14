import { useEffect, useState } from 'react'
import Boards from './components/Boards'
import  { Board, Column, Task, Timer } from  './Types'
import { Routes, Route } from 'react-router-dom'
import ShowBoard from './components/ShowBoard'
import { v4 as uuid } from 'uuid'

const App: React.FC = () => {
  const [dataBoard, setDataBoard] = useState<Board[]>([])
  const [dataColumn, setDataColumn] = useState<Column[]>([])
  const [dataTask, setDataTask] = useState<Task[]>([])
  const [dataTimer, setDataTimer] = useState<Timer[]>([])
  const [darkMode, setDarkMode] = useState(false)
  
  
  // console.log('board: ' + dataBoard)
  // console.log('col: ' + dataColumn)
  // console.log('task: ' + dataTask.map((task) => task.id))
  // console.log('timer: ' + dataTimer.map((task) => task.taskId))
  
  useEffect(() => {
    const getBoard = localStorage.getItem('board') 
    const getCol = localStorage.getItem('col')
    const getTask = localStorage.getItem('task')
    const getDarkMode = localStorage.getItem('mode')
    const getTimer = localStorage.getItem('timer')
    
    if (getDarkMode) setDarkMode(JSON.parse(getDarkMode))
    getBoard !== null ? setDataBoard(JSON.parse(getBoard)) : []
    if (getCol) setDataColumn(JSON.parse(getCol))
    if (getTask) setDataTask(JSON.parse(getTask))
    if (getTimer) setDataTimer(JSON.parse(getTimer))
  },[])

  useEffect(() => {
      localStorage.setItem('board', JSON.stringify(dataBoard))
  },[dataBoard])

  useEffect(() => {
    localStorage.setItem('col', JSON.stringify(dataColumn))
  },[dataColumn])

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(dataTask))
  },[dataTask])

  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(darkMode))
  },[darkMode])

  useEffect(() => {
    localStorage.setItem('timer', JSON.stringify(dataTimer))
  },[dataTimer])

  // boards-------------------------------------------------
  const addBoard = (title: string, bg: string) => {
    setDataBoard([...dataBoard , {id: uuid(), title, slug: title, bg}])
  } 

  const deleteBoard = (id: string) => {
    setDataBoard(dataBoard.filter((board) => board.id !== id))
    setDataColumn(dataColumn.filter((col) => col.boardId !== id))
    setDataTask(dataTask.filter((task) => task.boardId !== id))
    setDataTimer(dataTimer.filter((data) => data.boardId !== id))
  }

  const updateBoard = (id:string, newTitle:string) => {
    setDataBoard(dataBoard.map((data) => (data.id === id ? {...data, title:newTitle } : data)))
  }
  
  //cols--------------------------------------------------------------
  const addColumn = (title: string, boardId: string | null) => {
    setDataColumn([...dataColumn, { id: uuid(), title, boardId }])
  }

  const deleteColumn = (id:string) => {
    setDataColumn(dataColumn.filter((data) => data.id !== id))
    setDataTask(dataTask.filter((data) =>  data.colId !== id))
    setDataTimer(dataTimer.filter((data) => data.colId !== id))
  }

  const updateColumn = (id:string, newTitle:string) => {
    setDataColumn(dataColumn.map((data) => (data.id === id ? {...data, title: newTitle} : data)))
  }

  //tasks---------------------------------------------------------------
  const addTask = ( id:string, title: string, columnId: string, boardId: string | null) => {
    setDataTask([...dataTask, {id, boardId, colId: columnId, title, description: '', completed: false,}])
  }

  const deleteTask = (id:string) => {
    setDataTask(dataTask.filter((data) => data.id !== id))
    setDataTimer(dataTimer.filter((data) => data.taskId !== id))
  }

  const updateTask = (id:string, newTitle:string) => {
    setDataTask(dataTask.map((data) => (data.id === id ? {...data, title:newTitle} : data)))
  }

  const toggleCompleteTask = (id:string) => {
    setDataTask(dataTask.map((data) => (data.id === id ? {...data, completed: !data.completed} : data)) )
  }

  const updateTaskDescription = (id:string, newDescription:string) => {
    setDataTask(dataTask.map((data) => (data.id === id ? {...data, description:newDescription} : data)))
  }


  // timer---------------------------------------------------------------
  const addTimer = (taskId:string, boardId:string, colId:string) => {
    setDataTimer([...dataTimer, {taskId, boardId, colId, id:uuid() , minutes: 25, seconds: 0, isOn: false}])
  }

  const updateTaskTimer = (id:string, newMinutes:number, newSeconds:number) => {
    setDataTimer(dataTimer.map((data) => (data.id === id ? {...data, minutes:newMinutes, seconds:newSeconds} : data)))
  }

  const pauseStartTaskTimer = (id:string) => {
    setDataTimer(dataTimer.map((data) => (data.id === id ? {...data, isOn:!data.isOn} : data)))
  }
  
  
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
    '>

   </div>
      <Routes>
        <Route path='/' element={<Boards updateBoard={updateBoard}  setDarkMode={setDarkMode} deleteBoard={deleteBoard} darkMode={darkMode} dataBoard={dataBoard} addBoard={addBoard}></Boards>}></Route>
        <Route path=':slug' element={<ShowBoard deleteColumn={deleteColumn} pauseStartTaskTimer={pauseStartTaskTimer}  dataTimer={dataTimer} addTimer={ addTimer} updateTaskTimer={updateTaskTimer} updateTaskDescription={updateTaskDescription} toggleCompleteTask={toggleCompleteTask} deleteTask={deleteTask} updateTask={updateTask} updateColumn={updateColumn} setDarkMode={setDarkMode} darkMode={darkMode} dataColumn={dataColumn} addTask={addTask} dataTask={dataTask} setDataTask={setDataTask}  addColumn={addColumn} dataBoard={dataBoard}></ShowBoard>}></Route>
      </Routes>
   </div>
  )
}

export default App
