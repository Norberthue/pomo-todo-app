import { useEffect, useState } from 'react'
import { Board, Column, Task, Timer } from '../Types'
import { useParams } from 'react-router-dom'
import CreateNewColumn from './CreateNewColumn';
import Columns from './Columns';
import Header from './Header';


interface ShowBoardProps  {
    dataBoard: Board[];
    dataColumn: Column[];
    dataTask: Task[];
    addColumn: (title: string, boardId: string | null) => void;
    addTask: (title: string, columnId: string, boardId: string | null) => void;
    darkMode: boolean;
    setDarkMode: (set:boolean) => void ;
    deleteColumn: (id:string) => void;
    updateColumn: (id:string, newTitle:string) => void;
    updateTask: (id:string, newTitle:string) => void;
    deleteTask: (id:string) => void;
    toggleCompleteTask: (id:string) => void;
    setDataTask:(set: Task[]) => void;
    updateTaskDescription:(id:string, newDescription:string) => void;
    updateTaskTimer:(id:string, minutes:number, seconds:number) => void;
    addTimer: (taskId:string, boardId:string, colId:string) => void;
    dataTimer: Timer[];
    pauseStartTaskTimer: (id:string) => void;
    updateFixedTime: (id:string, newBreakTime:number, newPomoTime:number) => void;
    updateTaskHasTimer:(id: string, updatedHasTimer: boolean) => void;
    updateTaskOrder: (task: Task[]) => void;
    user: any;
    handleSignOut: () => void
}

const ShowBoard = ({dataBoard, dataColumn, dataTimer, user, handleSignOut, updateTaskOrder, updateTaskHasTimer, updateFixedTime, addTimer, pauseStartTaskTimer, setDataTask, addColumn, updateTaskTimer, updateTaskDescription, toggleCompleteTask, updateColumn, deleteColumn, addTask,  updateTask, deleteTask, dataTask, darkMode, setDarkMode}: ShowBoardProps) => {
    const {slug} = useParams()
    const [board, setBoard] = useState<Board | null>(null)
    const color = board?.bg 
   
    useEffect(()=> {
        const findDetail = dataBoard.filter((board) => board.id === slug)
        if (findDetail.length > 0) {
            setBoard(findDetail[0])
        } else {
            window.location.href = '/'
        }
    },[slug])

    
    return (
    <div className={`flex flex-col min-h-screen gap-5  transition-colors duration-500 bg-gradient-to-b  ${darkMode ? `from-20% from-${color}-900   via-${color}-800   to-${color}-500`
    : `  from-20% from-${color}-500   via-${color}-400    to-${color}-300`}  `}> 
       <Header handleSignOut={handleSignOut} darkMode={darkMode} setDarkMode={setDarkMode} user={user}></Header>
        <div className=' flex gap-5 mt-5 ml-8 text-xl items-center text-white'>
        <ul className='list-disc   ml-5'>
            <li className="text-white font-semibold ">{board?.title}</li>
        </ul>
        </div>
        <div className='flex gap-3 ml-5  overflow-x-auto scrollbar  '>
            <CreateNewColumn board={board} addColumn={addColumn} darkMode={darkMode}/>
            <Columns updateTaskOrder={updateTaskOrder} updateTaskHasTimer={updateTaskHasTimer} dataTimer={dataTimer} pauseStartTaskTimer={pauseStartTaskTimer}   updateFixedTime={updateFixedTime} addTimer={ addTimer} updateTaskTimer={updateTaskTimer}
                updateTaskDescription={updateTaskDescription} setDataTask={setDataTask} board={board} deleteColumn={deleteColumn} updateTask={updateTask}
                toggleCompleteTask={toggleCompleteTask} deleteTask={deleteTask}  updateColumn={updateColumn} darkMode={darkMode} dataColumn={dataColumn} dataTask={dataTask} addTask={addTask}/>
        </div>
    </div>
  )
}

export default ShowBoard