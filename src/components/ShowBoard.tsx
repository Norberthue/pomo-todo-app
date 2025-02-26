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
    addTask: (title: string, columnId: string) => void;
    darkMode: boolean;
}


const ShowBoard = ({dataBoard, dataColumn, addColumn, addTask, dataTask, darkMode}: ShowBoardProps) => {
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
    
    return (
    <div className='flex flex-col gap-5'> 
        <div className='mt-5 ml-8 text-xl'>
            <h1>{board?.title}</h1>
        </div>
        <div className='flex gap-3 ml-5  overflow-x-auto scrollbar '>
            <CreateNewColumn board={board} addColumn={addColumn} darkMode={darkMode}  />
            <Columns board={board} darkMode={darkMode} dataColumn={dataColumn} dataTask={dataTask} addTask={addTask}/>
        </div>
    </div>
  )
}

export default ShowBoard