import { Board, Column, Task } from '../Types'
import Tasks from './Tasks';
import AddNewTaskButton from './AddNewTaskButton';
import { useState } from 'react';

interface ColumnsForms {
    addTask: (title: string, columnId: string, boardId: string | null) => void;
    dataTask: Task[];
    dataColumn: Column[];
    board: Board | null;
    darkMode: boolean
    deleteColumn: (id:string) => void
    updateColumn: (id:string, newTitle:string) => void
    updateTask: (id:string, newTitle:string) => void
    deleteTask: (id:string) => void
    setActiveTask: (aa: number | null) => void 
    onDropTask: (status:string, position:number) => void
}

const Columns = ({addTask , updateTask, deleteTask, setActiveTask,  onDropTask,  dataTask, dataColumn, board, deleteColumn,  updateColumn, darkMode}: ColumnsForms) => {
    const [updatedColumnTitle, setUpdatedColumnTitle] = useState('')
    const [columnId, setColumnId] = useState('') 
   
    const handleChangeColumnName = (e:React.FormEvent) => {
        e.preventDefault()
        if (updatedColumnTitle.length >= 1) {
          updateColumn(columnId, updatedColumnTitle)
          setColumnId('')
    
        }
      }
   
    return (
        <>
            {dataColumn.length >= 1 && dataColumn.map((column) => (
                column.boardId === board?.id && (
                    <div draggable className={` w-[300px] relative  mb-2  max-h-[75vh] flex-none  transition-all duration-500 ${darkMode ? 'bg-[#0d0d0eb6] ' :
                        'bg-[#d8d8d8a8]'}  ml-2 self-baseline rounded-lg  flex flex-col `} key={column.id}>
                        {columnId !== column.id ? (
                            <div className='flex justify-between pl-2 pr-2 pb-2 pt-2 items-center sticky top-0 z-10  '>
                                <h1 className="pt-1 pl-1 font-semibold ">{column.title}</h1>
                                <div className='flex gap-2 place-items-end'>
                                    <button className='hover:scale-90 duration-200 cursor-pointer text-sm' onClick={() => {deleteColumn(column.id)}}><i className="fa-solid fa-trash"></i></button>
                                    <button className='hover:scale-90 duration-200 cursor-pointer text-sm' onClick={() => {setColumnId(column.id), setUpdatedColumnTitle(column.title)}}><i className="fa-solid fa-pen-to-square"></i></button>
                                </div>
                            </div>
                            ) : ( 
                            <form onSubmit={(e) => {handleChangeColumnName(e)}} className=" items-center justify-between flex gap-1">
                                <input maxLength={28}  value={updatedColumnTitle} onChange={(e) => {setUpdatedColumnTitle(e.target.value)}} autoFocus className={`  ml-2    border-b-2 border-[#5a626957]
                                duration-100 rounded-sm  pl-2 pr-2 pb-2 pt-3 items-center sticky  z-10  outline-none `}/>
                                <div className="flex items-center  gap-1 text-white">
                                    <button type='submit' className="hover:bg-slate-600 rounded-sm duration-200   pl-2 pr-2"><i className="fa-solid fa-check"></i></button>
                                    <button className="hover:bg-slate-600 rounded-sm duration-200  pl-2 pr-2" onClick={() => {setColumnId('')}}><i className="fa-solid fa-xmark"></i></button>
                                </div>
                            </form>
                        )}
                        <div className='flex flex-col pl-2 pr-2 mt-1 overflow-y-auto scrollbar2'>
                            <Tasks dataTask={dataTask} onDropTask={onDropTask} setActiveTask={setActiveTask} updateTask={updateTask} deleteTask={deleteTask} darkMode={darkMode} column={column}/>
                            
                        </div>
                        <AddNewTaskButton column={column} darkMode={darkMode} addTask={addTask}/>
                    </div>
                )
            ))}
        </>
    )
}

export default Columns