import React, { useState } from 'react'
import { Board} from '../Types'

interface CreateNewColumnForms {
    darkMode: boolean
    addColumn: (title: string, boardId: string | null) => void;
    board: Board | null
}


const CreateNewColumn = ({addColumn, darkMode, board}: CreateNewColumnForms) => {
    const [openCreateColumn, setOpenCreateColumn] = useState(false) 
    const [columnTitle, setColumnTitle] = useState('')
    
    const handleSubmit = (e:React.FormEvent ) => {
        e.preventDefault()
        if (columnTitle.length > 0 && board) {
            addColumn(columnTitle, board.slug, )
            setColumnTitle('')
        }
    }

    return (
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
  )
}

export default CreateNewColumn