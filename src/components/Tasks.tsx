import { useState } from 'react';
import { Column, Task } from '../Types'
import DropArea from './DropArea';

interface TasksForms {
    dataTask: Task[];
    darkMode: boolean;
    column: Column;
    updateTask: (id:string, newTitle:string) => void
    deleteTask: (id:string) => void
    onDropTask: (status:string, position:number) => void
    setActiveTask: (aa: number | null) => void 
    
}

const Tasks = ({darkMode , dataTask, deleteTask, updateTask, column , onDropTask, setActiveTask}: TasksForms) => {
    const [updatedTaskTitle, setUpdatedTaskTitle] = useState('')
    const [taskId, setTaskId] = useState('')  
   
    const handleChangeTaskName = (e:React.FormEvent) => {
        e.preventDefault()
        if (updatedTaskTitle.length >= 1) {
          updateTask(taskId, updatedTaskTitle)
          setTaskId('')
    
        }
      }
      

    return (
    <>
        <DropArea onDropTask={() => onDropTask(column.id, 0)}></DropArea>
        {dataTask.length >= 1 && dataTask.map((task, index) => (
            task.colId === column.id && (
                <div  key={task.id}>
                
                    <div draggable onDragStart={() => setActiveTask(index)} onDragEnd={() => setActiveTask(null)} className={`  ${darkMode ? 'text-white bg-[#1d2125] hover:bg-[#2e3336] ' : 
                        'text-gray-600 hover:bg-gray-200 bg-white'} 
                        pt-2 pb-2 h-[50px]  rounded-lg content-shadow`} key={task.id}>
                            {taskId !== task.id ? (
                                <div className='flex justify-between items-center '>
                                    <h1 className="pt-1 pl-2 font-semibold">{task.title}</h1>
                                    <div className='flex gap-2  pr-2'>
                                        <button className='hover:scale-90 duration-200 cursor-pointer text-sm' onClick={() => {deleteTask(task.id)}}><i className="fa-solid fa-trash"></i></button>
                                        <button className='hover:scale-90 duration-200 cursor-pointer text-sm' onClick={() => {setTaskId(task.id), setUpdatedTaskTitle(task.title)}}><i className="fa-solid fa-pen-to-square"></i></button>
                                    </div>
                                </div>
                                ) : ( 
                                <form onSubmit={(e) => {handleChangeTaskName(e)}} className=" items-center justify-between flex gap-1">
                                    <input maxLength={28}  value={updatedTaskTitle} onChange={(e) => {setUpdatedTaskTitle(e.target.value)}} autoFocus className={`  ml-1  border-2 border-[#5a626957]
                                    duration-100 rounded-sm pl-2 outline-none `}/>
                                    <div className="flex items-center  gap-1 text-white">
                                        <button type='submit' className="hover:bg-slate-600 rounded-sm duration-200   pl-2 pr-2"><i className="fa-solid fa-check"></i></button>
                                        <button className="hover:bg-slate-600 rounded-sm duration-200  pl-2 pr-2" onClick={() => {setTaskId('')}}><i className="fa-solid fa-xmark"></i></button>
                                    </div>
                                </form>
                            )}
                    
                    </div>
                    <DropArea onDropTask={() => onDropTask(column.id, index + 1)}></DropArea>
                </div>
            )
            
        ))}
    </>
  )
}

export default Tasks