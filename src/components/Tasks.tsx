import { useEffect, useRef, useState } from 'react';
import { Column, Task, Timer } from '../Types'
import DropArea from './DropArea';
import { AnimatePresence, motion } from "framer-motion";
import ModalTasks from './ModalTasks';

interface TasksForms {
    dataTask: Task[];
    darkMode: boolean;
    column: Column;
    updateTask: (id:string, newTitle:string) => void;
    deleteTask: (id:string) => void;
    toggleCompleteTask: (id:string) => void;
    updateTaskDescription:(id:string, newDescription:string) => void;
    updateTaskTimer:(id:string, minutes:number, seconds:number) => void;
    dataTimer: Timer[];
    pauseStartTaskTimer: (id:string) => void;
    updateFixedTime: (id:string, newBreakTime:number, newPomoTime:number) => void;
    addTimer: (taskId:string, boardId:string, colId:string) => void;
    updateTaskHasTimer:(id: string, updatedHasTimer: boolean) => void;
}

const Tasks = ({darkMode, dataTask, dataTimer, updateTaskHasTimer, deleteTask, updateFixedTime, addTimer, pauseStartTaskTimer, updateTask, updateTaskDescription, updateTaskTimer, toggleCompleteTask, column }: TasksForms) => {
    const [updatedTaskTitle, setUpdatedTaskTitle] = useState('')
    const [taskId, setTaskId] = useState('')  
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)
    const [isTaskOpen, setIsTaskOpen] = useState(false)
    const [getTask, setGetTask] = useState<string>('')
    
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
          handleChangeTaskName(e as unknown as React.FormEvent); 
        }
    };

    // make caret apper at the end of area
    useEffect(() => {
        const length = textareaRef.current?.value.length ?? null;
        if (length !== null) {
            textareaRef.current?.setSelectionRange(length, length);
        }
    },[taskId])  

    //start drag for task
    const handleDragStart = (e:any, card: Task) => {
        e.dataTransfer.setData("cardId", card.id);
      };


    return (
    <div>
        {dataTask.length >= 1 && dataTask.map((task) => (
            task.colId === column.id && (
                <div key={task.id}>
                    <DropArea darkMode={darkMode} beforeId={task.id} column={column.id}></DropArea>
                    <motion.div  layout='preserve-aspect' layoutId={task.id} 
                      draggable onDragStart={(e) => handleDragStart(e, task)} className={`group  ${darkMode ? 'text-[#f8f8f8ee] bg-[#1d2125] hover:bg-[#2e3336] ' : 
                        'text-gray-600  hover:bg-gray-200 bg-white'} 
                        pt-2 pb-2  rounded-lg content-shadow`} key={task.id}>
                            {taskId !== task.id ? (
                                <div className='flex justify-between items-center relative'>
                                    <div className='flex items-center relative'>
                                        <i onClick={() => toggleCompleteTask(task.id)} className={` ${task.completed ? ' cursor-pointer fa-circle-check fa-solid text-green-600' : ' cursor-pointer fa-circle fa-regular'}
                                         absolute top-1 opacity-0 group-hover:opacity-100 left-0 group-hover:left-2 duration-500`}></i> 
                                        <div onClick={() => {setIsTaskOpen(true), setGetTask(task.id)}} className={`${task.completed ? 'text-gray-400 line-through' : ''}  
                                        hover:font-extrabold cursor-pointer pt-1 pl-2 group-hover:pl-7 
                                        group-hover:overflow-hidden break-words font-semibold max-w-[230px] text-sm duration-500`}>
                                            {task.title}
                                        </div>
                                    </div>
                                    
                                    <div className='flex gap-2 opacity-0  group-hover:right-1 absolute right-0 group-hover:opacity-100 duration-500 pr-2'>
                                        <button className='hover:scale-90 duration-200 cursor-pointer text-sm' onClick={() => {deleteTask(task.id)}}><i className="fa-solid fa-trash"></i></button>
                                        <button className='hover:scale-90 duration-200 cursor-pointer text-sm' onClick={() => {setTaskId(task.id), setUpdatedTaskTitle(task.title)}}><i className="fa-solid fa-pen-to-square"></i></button>
                                    </div>
                                </div>
                                ) : ( 
                                <form onSubmit={(e) => {handleChangeTaskName(e)}} className=" items-center justify-between flex gap-1 text-sm">
                                    <textarea  onKeyDown={handleUserKeyPress} ref={textareaRef} maxLength={80}  value={updatedTaskTitle} onChange={(e) => {setUpdatedTaskTitle(e.target.value)}} autoFocus className={`  ml-1  border-2 border-[#5a626957]
                                    duration-100 rounded-sm pl-2 pr-2 outline-none  field-sizing-content min-w-[200px] max-w-[200px] `}/>
                                    <div className="flex items-center  gap-1 text-white mr-2">
                                        <button type='submit' className="hover:bg-slate-600 rounded-sm duration-200   pl-2 pr-2"><i className="fa-solid fa-check"></i></button>
                                        <button className="hover:bg-slate-600 rounded-sm duration-200  pl-2 pr-2" onClick={() => {setTaskId('')}}><i className="fa-solid fa-xmark"></i></button>
                                    </div>
                                </form>
                            )}
                    </motion.div>
                    <AnimatePresence>
                        {isTaskOpen && <ModalTasks updateTaskHasTimer={updateTaskHasTimer} addTimer={addTimer} updateFixedTime={updateFixedTime} pauseStartTaskTimer={pauseStartTaskTimer} dataTimer={dataTimer} updateTaskTimer={updateTaskTimer} dataTask={dataTask} getTask={getTask} updateTaskDescription={updateTaskDescription} toggleCompleteTask={toggleCompleteTask} darkMode={darkMode}  setIsTaskOpen={setIsTaskOpen}></ModalTasks>}
                    </AnimatePresence>
                </div>
            )
            
        ))}
        
    </div>
  )
}

export default Tasks

