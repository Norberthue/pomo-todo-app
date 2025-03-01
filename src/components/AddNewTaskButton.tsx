import React, { useState } from 'react'
import { Column } from '../Types'

interface AddNewTaskButtonForms {
    addTask: (title: string, columnId: string, boardId: string | null) => void;
    darkMode: boolean;
    column: Column;
}

const AddNewTaskButton = ({ addTask, darkMode, column}: AddNewTaskButtonForms) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [editId, setEditId] = useState('')  
    
    const handleTaskSubmit = (e: React.FormEvent , id: string , boardId: string | null) => {
        e.preventDefault()
        if (taskTitle.length > 0 ) {
            addTask(taskTitle, id, boardId)
            setTaskTitle('')
        }
    } 
  
    return (
    <>
        {editId === column.id  ? 
                <form className={` flex flex-col gap-2`}onSubmit={(e) => {handleTaskSubmit(e, column.title , column.boardId)}}>
                    <input autoFocus placeholder='Type name of task...' 
                        className={`${darkMode ? ' bg-[#34383b] text-white' :
                            'bg-gray-200 text-black placeholder-gray-600'} rounded-lg outline-none 
                            text-sm pt-2 pb-5 pl-2 focus:ring-2 focus:ring-blue-500`} type='text' value={taskTitle} onChange={(e) => {setTaskTitle(e.target.value)}} >
                    </input>
                    <div className='flex items-center gap-4'>
                        <button  className={` p-2 rounded-sm 
                            ${darkMode === false ? 'bg-gray-200 text-black  hover:bg-[#c9cbcc] ' 
                            : 'bg-[#34383b] text-white hover:bg-[#434647] '} duration-200`} type="submit">
                                + Add Task
                        </button>  
                        <i onClick={() => {setEditId('')}} className="fa-solid fa-xmark hover:bg-gray-500 p-3 rounded-sm duration-150"></i>
                    </div>   
                </form> : 
                <button onClick={() => {setEditId(column.id)}} 
                    className={`${darkMode ? 'hover:bg-[#434647]' : 'hover:bg-[#c9cbcc]'} 
                    pt-2 pb-2 rounded-lg pl-2 w-full h-full flex duration-200`}>
                    + Add new task
                </button>
        }
    </>
  )
}

export default AddNewTaskButton