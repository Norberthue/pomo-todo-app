import { useEffect, useRef, useState } from 'react';
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
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
 
    const handleChangeTaskName = (e: React.FormEvent | KeyboardEvent) => {
        e.preventDefault()
        if (updatedTaskTitle.length >= 1) {
          updateTask(taskId, updatedTaskTitle)
          setTaskId('')
    
        }
      }
    
    // submit textarea with enter key
    const handleUserKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
          // e.preventDefault();
          handleChangeTaskName(e as unknown as React.FormEvent); // this won't be triggered
        }
    };

    // make caret apper at the end of area
    useEffect(() => {
        const length = textareaRef.current?.value.length ?? null;
        if (length !== null) {
            textareaRef.current?.setSelectionRange(length, length);
        }
    },[taskId])  
      
    return (
    <>
        <DropArea darkMode={darkMode} onDropTask={() => onDropTask(column.id, 0)}></DropArea>
        {dataTask.length >= 1 && dataTask.map((task, index) => (
            task.colId === column.id && (
                <div  key={task.id}>
                    <div draggable onDragStart={() => setActiveTask(index)} onDragEnd={() => setActiveTask(null)} className={`  ${darkMode ? 'text-[#f8f8f8ee] bg-[#1d2125] hover:bg-[#2e3336] ' : 
                        'text-gray-600 hover:bg-gray-200 bg-white'} 
                        pt-2 pb-2  rounded-lg content-shadow`} key={task.id}>
                            {taskId !== task.id ? (
                                <div className='flex justify-between items-center '>
                                    <div className="pt-1 pl-2 break-words font-semibold max-w-[180px] text-sm">{task.title}</div>
                                    <div className='flex gap-2  pr-2'>
                                        <button className='hover:scale-90 duration-200 cursor-pointer text-sm' onClick={() => {deleteTask(task.id)}}><i className="fa-solid fa-trash"></i></button>
                                        <button className='hover:scale-90 duration-200 cursor-pointer text-sm' onClick={() => {setTaskId(task.id), setUpdatedTaskTitle(task.title)}}><i className="fa-solid fa-pen-to-square"></i></button>
                                    </div>
                                </div>
                                ) : ( 
                                <form onSubmit={(e) => {handleChangeTaskName(e)}} className=" items-center justify-between flex gap-1 text-sm">
                                    <textarea  onKeyDown={handleUserKeyPress} ref={textareaRef} maxLength={80}  value={updatedTaskTitle} onChange={(e) => {setUpdatedTaskTitle(e.target.value)}} autoFocus className={`  ml-1  border-2 border-[#5a626957]
                                    duration-100 rounded-sm pl-2 pr-2 outline-none  field-sizing-content max-w-[200px] `}/>
                                    <div className="flex items-center  gap-1 text-white mr-2">
                                        <button type='submit' className="hover:bg-slate-600 rounded-sm duration-200   pl-2 pr-2"><i className="fa-solid fa-check"></i></button>
                                        <button className="hover:bg-slate-600 rounded-sm duration-200  pl-2 pr-2" onClick={() => {setTaskId('')}}><i className="fa-solid fa-xmark"></i></button>
                                    </div>
                                </form>
                            )}
                    
                    </div>
                    <DropArea darkMode={darkMode} onDropTask={() => onDropTask(column.id, index + 1)}></DropArea>
                </div>
            )
            
        ))}
    </>
  )
}

export default Tasks