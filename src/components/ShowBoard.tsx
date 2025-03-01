import { useEffect, useState } from 'react'
import { Board, Column, Task } from '../Types'
import { useParams } from 'react-router-dom'
import CreateNewColumn from './CreateNewColumn';
import Columns from './Columns';


interface ShowBoardProps  {
    dataBoard: Board[];
    dataColumn: Column[];
    dataTask: Task[];
    addColumn: (title: string, boardId: string | null) => void;
    addTask: (title: string, columnId: string, boardId: string | null) => void;
    darkMode: boolean;
    setDarkMode: (set:boolean) => void 
}


const ShowBoard = ({dataBoard, dataColumn, addColumn, addTask, dataTask, darkMode, setDarkMode}: ShowBoardProps) => {
    const {slug} = useParams()
    const [board, setBoard] = useState<Board | null>(null)
    
    
    useEffect(()=> {
        const findDetail = dataBoard.filter((board) => board.slug === slug)
        if (findDetail.length > 0) {
            setBoard(findDetail[0])
        } else {
            window.location.href = '/'
        }
    },[slug])
    const color = board?.bg
    return (
    <div className={`flex flex-col min-h-screen gap-5 ${darkMode ? `bg-gradient-to-b from-30% from-${color}-500 via-50% via-${color}-400  to-black`
    : `bg-gradient-to-b from-30% from-${color}-500 via-80% via-${color}-400  to-white`}  `}> 
       <div className={`flex text-sm sm:text-2xl  items-center justify-between p-10 border-b-[1px] border-[#5a626957]`}>
            <div className=''>
                <a href='/'>PomoTodo</a>
            </div>
            <div className='flex gap-2'>
                <button onClick={() => {setDarkMode(!darkMode)}}>{darkMode ? 'Theme 🌞' : 'Theme 🌙'}</button>
                <h1>| Login</h1>
            </div>
        </div>
        <div className='mt-5 ml-8 text-xl'>
            <h1>{board?.title}</h1>
        </div>
        <div className='flex gap-3 ml-5  overflow-x-auto scrollbar  '>
            <CreateNewColumn board={board} addColumn={addColumn} darkMode={darkMode}/>
            <Columns board={board} darkMode={darkMode} dataColumn={dataColumn} dataTask={dataTask} addTask={addTask}/>
        </div>
    </div>
  )
}

export default ShowBoard