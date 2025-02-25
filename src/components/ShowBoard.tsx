import React, { SetStateAction, useEffect, useState } from 'react'
import { Board, Column, Task } from '../Types'
import { useParams } from 'react-router-dom'


interface ShowBoardProps  {
    dataBoard: Board[];
    dataColumn: Column[]
    addColumn: (title: string, boardId: string | null) => void;
    addTask: (title: string, columnId: string) => void;
    dataTask: Task[];
    darkMode: boolean;
}


const ShowBoard = ({dataBoard, dataColumn, addColumn, addTask, dataTask, darkMode}: ShowBoardProps) => {
    const {slug} = useParams()
    const [board, setBoard] = useState<Board | null>(null)
    const [columnTitle, setColumnTitle] = useState('')
    const [taskTitle, setTaskTitle] = useState('')
    const [openCreateColumn, setOpenCreateColumn] = useState(false)
    const [editId, setEditId] = useState('')
    
    useEffect(()=> {
        const findDetail = dataBoard.filter((board) => board.slug === slug)
        if (findDetail.length > 0) {
            setBoard(findDetail[0])
        } else {
            window.location.href = '/'
        }
    },[slug])
    
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
    <div className='flex flex-col gap-5 h-screen '> 
        <div className='mt-5 ml-8 text-xl'>
            <h1>{board?.title}</h1>
        </div>
        <div className='flex gap-3 ml-5  overflow-x-auto scrollbar '>
            <div className={`ml-2 self-baseline flex-none p-2 order-last w-[300px] rounded-lg  ${openCreateColumn ? '' : darkMode ? 'hover:bg-[#434647]' : 'hover:bg-[#c9cbcc]'} duration-150 ${darkMode ? 'bg-[#34383b]' : 'bg-gray-200'}`}>
                <button onClick={() => {setOpenCreateColumn(true)}} className={`${openCreateColumn ? 'hidden' : 'block'} w-full h-full flex`}>+ Add new column</button>
                <form className={`${openCreateColumn ? 'block' : 'hidden'} flex flex-col gap-2`} onSubmit={handleSubmit}>
                    <input autoFocus placeholder='Type name of column...' 
                    className={`placeholder-gray-400 pl-2 focus:ring-2 focus:ring-blue-500
                        ${darkMode ? 'bg-gray-200 text-black' :
                         'bg-[#34383b] text-white'} text-sm pt-2 pb-2 rounded-sm focus:outline-none`} 
                         type='text' value={columnTitle} onChange={(e) => {setColumnTitle(e.target.value)}}>
                    </input>
                    <div className='flex items-center gap-4'>
                        <button className={` p-2 rounded-sm 
                            ${darkMode ? 'bg-gray-200 text-black  hover:bg-[#c9cbcc] ' 
                            : 'bg-[#34383b] text-white hover:bg-[#434647] '}uration-200`} type='submit'>Add column</button>
                        <i onClick={() => {setOpenCreateColumn(false)}} className="fa-solid fa-xmark hover:bg-gray-500 p-3 rounded-sm duration-150"></i>
                    </div>
                </form>
            </div>
            
            
            {dataColumn.length >= 1 && dataColumn.map((column) => (
                column.boardId === board?.slug && (
                    <div className={` w-[300px] flex-none  content-shadow  ${darkMode ? 'bg-[#0d0d0ed0] ' :
                        'bg-gray-100'}  ml-2 self-baseline p-2 rounded-lg  flex flex-col `} key={column.id}>
                        <h1 className='pt-1 pl-1'>{column.title}</h1>
                        <div className='flex flex-col pl-1 gap-2 mt-2'>
                            {dataTask.length >= 1 && dataTask.map((task, index) => (
                                task.id === column.title && (
                                    <div className={`${darkMode ? 'text-white bg-[#1d2125] hover:bg-[#2e3336] ' : 
                                    'text-gray-500  hover:bg-gray-300 bg-gray-200'} 
                                    pt-2 pb-2  rounded-lg `} key={index}>
                                        <h1 className='pl-2'>{task.title}</h1>
                                    </div>
                                )
                            ))}

                            
                            {editId === column.id  ? <form className={` flex flex-col gap-2`}onSubmit={(e) => {handleTaskSubmit(e, column.title)}}>
                                <input autoFocus placeholder='Type name of task...' 
                                className={`${darkMode ? ' bg-[#34383b] text-white' :
                                    'bg-gray-300 text-black placeholder-gray-600'} rounded-lg outline-none 
                                    text-sm pt-2 pb-5 pl-2 focus:ring-2 focus:ring-blue-500`} type='text' value={taskTitle} onChange={(e) => {setTaskTitle(e.target.value)}} ></input>
                                <div className='flex items-center gap-4'>
                                    <button  className={` p-2 rounded-sm 
                                    ${darkMode === false ? 'bg-gray-200 text-black  hover:bg-[#c9cbcc] ' 
                                    : 'bg-[#34383b] text-white hover:bg-[#434647] '} duration-200`} type="submit">+ Add Task</button>  
                                    <i onClick={() => {setEditId('')}} className="fa-solid fa-xmark hover:bg-gray-500 p-3 rounded-sm duration-150"></i>
                                </div>
                                
                            </form> : 
                            <button onClick={() => {setEditId(column.id)}} className={`${darkMode ? 'hover:bg-[#434647]' : 'hover:bg-[#c9cbcc]'} 
                            pt-2 pb-2 rounded-lg pl-2 w-full h-full flex duration-200`}>+ Add new task</button>}
                            
                        </div>
                    </div>
                )
            ))}
           
        </div>
    </div>
  )
}

export default ShowBoard