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
    updateTaskTimer:(id:string, minutes:number, seconds:number, newBreakTime: boolean) => void;
    addTimer: (taskId:string, boardId:string, colId:string) => void;
    dataTimer: Timer[];
    pauseStartTaskTimer: (id:string) => void;
    updateFixedTime: (id:string, newBreakTime:number, newPomoTime:number) => void;
    updateTaskHasTimer:(id: string, updatedHasTimer: boolean) => void;
    updateTaskOrder: (task: Task[]) => void;
    user: any;
    handleSignOut: () => void
    updateTaskTimerFirebase:(id:string, minutes:number, seconds:number, newBreakTime: boolean) => void;
    updateBoardPomoCounter: (id:string, newCounter:number, newMinutes: number) => void;
    resetPomodoroCounter: (id:string) => void;
}

const ShowBoard = ({resetPomodoroCounter, updateBoardPomoCounter, dataBoard, dataColumn, dataTimer, user, updateTaskTimerFirebase, handleSignOut, updateTaskOrder, updateTaskHasTimer, updateFixedTime, addTimer, pauseStartTaskTimer, setDataTask, addColumn, updateTaskTimer, updateTaskDescription, toggleCompleteTask, updateColumn, deleteColumn, addTask,  updateTask, deleteTask, dataTask, darkMode, setDarkMode}: ShowBoardProps) => {
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
    },[slug, board?.timerCounter, dataBoard, board?.timerHours])

    
    return (
    <div className={`flex flex-col min-h-screen gap-5  transition-colors duration-500 bg-gradient-to-b  ${darkMode ? `from-20% from-${color}-900   via-${color}-800   to-${color}-500`
    : `  from-20% from-${color}-500 via-${color}-400 to-${color}-300`}  `}> 
       <Header handleSignOut={handleSignOut} darkMode={darkMode} setDarkMode={setDarkMode} user={user}></Header>
        <div className=' flex flex-col sm:flex-row gap-5 mt-5 ml-8 sm:text-xl sm:items-center justify-left text-white'>
            <ul className='list-disc ml-5 flex gap-10 '>
                <li className="text-white font-semibold ">{board?.title}</li>
            </ul>
            <div className=' sm:flex sm:items-center'>
                <ul className='list-disc ml-5 flex gap-5 '>
                    <li>Pomodoro Counter: {board?.timerCounter}</li>
                    <li className='flex gap-2 list-disc'>
                        {board?.timerHours && board?.timerHours > 0 ? <p>{board?.timerHours}h</p> :<p className='hidden'></p>}
                        {board?.timerMinutes && board?.timerMinutes > 0 ? <p>{board?.timerMinutes}m</p> :<p className='hidden'></p>}
                    </li>
                </ul>
                <div className='group relative'>
                    <button onClick={() => board?.id && resetPomodoroCounter(board.id)} className={`cursor-pointer z-20  hover:-rotate-360 sm:text-2xl pt-2 pb-2 pr-4 pl-4  rounded-lg hover:scale-90
                        duration-500 `}>
                        <i className="fa-solid fa-arrow-rotate-left text-xl"></i>
                    </button>
                    <p className='absolute flex items-center justify-center p-1 -top-3 left-10 bg-black/40 text-sm w-[150px]
                     rounded-xl opacity-0 group-hover:opacity-100 duration-500 z-0 transition-opacity'>
                        Reset the Counter
                    </p>
                </div>
            </div>
           
        </div>
        <div className='flex gap-1 ml-5  overflow-x-auto scrollbar  '>
            <CreateNewColumn board={board} addColumn={addColumn} darkMode={darkMode}/>
            <Columns updateBoardPomoCounter={updateBoardPomoCounter} updateTaskTimerFirebase={updateTaskTimerFirebase} updateTaskOrder={updateTaskOrder} updateTaskHasTimer={updateTaskHasTimer} dataTimer={dataTimer} pauseStartTaskTimer={pauseStartTaskTimer}   updateFixedTime={updateFixedTime} addTimer={ addTimer} updateTaskTimer={updateTaskTimer}
                updateTaskDescription={updateTaskDescription} setDataTask={setDataTask} board={board} deleteColumn={deleteColumn} updateTask={updateTask}
                toggleCompleteTask={toggleCompleteTask} deleteTask={deleteTask}  updateColumn={updateColumn} darkMode={darkMode} dataColumn={dataColumn} dataTask={dataTask} addTask={addTask}/>
        </div>
    </div>
  )
}

export default ShowBoard