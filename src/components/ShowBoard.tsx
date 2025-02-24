import React, { SetStateAction, useEffect, useState } from 'react'
import { Board, Column, Task } from '../Types'
import { data, useParams } from 'react-router-dom'


interface ShowBoardProps  {
    dataBoard: Board[];
    dataColumn: Column[]
    addColumn: (title: string, boardId: string | null) => void;
    addTask: (title: string, columnId: string) => void;
    dataTask: Task[];
}


const ShowBoard = ({dataBoard, dataColumn, addColumn, addTask, dataTask}: ShowBoardProps) => {
    const {slug} = useParams()
    const [board, setBoard] = useState<Board | null>(null)
    const [columnTitle, setColumnTitle] = useState('')
    const [taskTitle, setTaskTitle] = useState('')
    
    useEffect(()=> {
        const findDetail = dataBoard.filter((board) => board.slug === slug)
        if (findDetail.length > 0) {
            setBoard(findDetail[0])
        } else {
            window.location.href = '/'
        }
    },[slug])
    console.log(dataColumn)
   
    const handleSubmit = (e:React.FormEvent ) => {
        e.preventDefault()
        if (columnTitle.length > 0 && board) {
            addColumn(columnTitle, board.slug)
            setColumnTitle('')
        }
    }

    const handleTaskSubmit = (e: React.FormEvent , id: string) => {
        e.preventDefault()
        if (taskTitle.length > 0 ) {
            addTask(taskTitle, id)
            setTaskTitle('')
        }
    }

    return (
    <div className='flex flex-col gap-5 '> 
        <div className='flex justify-start items-center p-5 w-screen bg-blur1'>
            <h1>{board?.title}</h1>
        </div>
        <div className='flex overflow-x-scroll'>
            <div className='ml-2 p-2 order-last  bg-gray-400 max-w-[200px] rounded-lg w-full'>
                <button>+ Add new column</button>
                <form onSubmit={handleSubmit}>
                    <input type='text' value={columnTitle} onChange={(e) => {setColumnTitle(e.target.value)}}></input>
                    <button type='submit'>Add column</button>
                </form>
            </div>
            
            
            {dataColumn.length >= 1 && dataColumn.map((column) => (
                column.boardId === board?.slug && (
                    <div className='ml-2 p-2 bg-gray-400 max-w-[200px] rounded-lg w-full flex flex-col' key={column.id}>
                        <div>
                            {column.title}
                            {dataTask.length >= 1 && dataTask.map((task) => (
                                task.id === column.title && (
                                    <div>
                                        <h1>{task.title}</h1>
                                    </div>
                                )
                            ))}
                            <form onSubmit={(e) => {handleTaskSubmit(e, column.title)}}>
                                <input type='text' value={taskTitle} onChange={(e) => {setTaskTitle(e.target.value)}} ></input>
                                <button type="submit">Add Task</button>  
                            </form>
                            
                        </div>
                    </div>
                )
            ))}
           
        </div>
    </div>
  )
}

export default ShowBoard