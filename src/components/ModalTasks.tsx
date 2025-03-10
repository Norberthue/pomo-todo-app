import { useEffect, useRef, useState } from "react";
import { Task } from "../Types"

interface ModalTaskForms {
    task: Task;
    setIsTaskOpen: (open:boolean) => void;
    darkMode: boolean;
    updateTaskDescription:(id:string, newDescription:string) => void;
    toggleCompleteTask: (id:string) => void;
}

const ModalTasks = ({task, toggleCompleteTask, updateTaskDescription, setIsTaskOpen , darkMode}: ModalTaskForms) => {
    const [updatedTaskDescriptionValue, setUpdatedTaskDescriptionValue] = useState('') 
    const textareaRef = useRef<HTMLTextAreaElement | null>(null) 
    const  [openEditDisc, setOpenEditDisc] = useState(false)
    
    const handleChangeTaskDesc = (e: React.FormEvent | KeyboardEvent) => {
        e.preventDefault()
        if (updatedTaskDescriptionValue.length >= 1) {
          updateTaskDescription(task.id, updatedTaskDescriptionValue)
          setOpenEditDisc(false)
        }
      }
    
    // submit textarea with enter key
    const handleUserKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
        // e.preventDefault();
        handleChangeTaskDesc(e as unknown as React.FormEvent); 
        }   
    };

    return (
    <div onClick={() => {setIsTaskOpen(false)}} className={` fixed z-20 top-0 left-0 w-screen h-full bg-[#00000086]`}>
        <div onClick={e => {e.stopPropagation()}} className={`fixed top-1/2 left-1/2 -translate-x-1/2  -translate-y-1/2
             ${darkMode ? 'bg-[#1d2125]' : 'bg-[#e4e4e4]'} max-w-[500px] w-full h-[600px] rounded-lg p-4  flex flex-col gap-4`}>
                <div className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                        <i onClick={() => toggleCompleteTask(task.id)} className={` ${task.completed ? ' cursor-pointer fa-circle-check fa-solid text-green-600' : ' cursor-pointer fa-circle fa-regular'} duration-500`}></i> 
                        <h1 className={`text-2xl duration-500 ${task.completed ? 'text-gray-400 line-through' : ''}`}>{task.title}</h1>
                    </div>
                    <div>
                        <i onClick={() => {setIsTaskOpen(false)}} className="fa-solid fa-xmark hover:bg-gray-400 p-3 rounded-full duration-150"></i>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-bars"></i>
                    <h1 className="text-lg">Notes</h1>
                </div>
                <div>
                    {task.description.length >= 1 ? openEditDisc ? (
                        <form className="flex gap-4  ml-4 flex-col items-start" onSubmit={(e) => {handleChangeTaskDesc(e)}}>
                            <textarea onKeyDown={handleUserKeyPress} ref={textareaRef} value={updatedTaskDescriptionValue} onChange={(e) => setUpdatedTaskDescriptionValue(e.target.value)} 
                            autoFocus className={`  ml-1  border-2 border-[#5a626957]
                            rounded-sm pl-1 pr-1  focus:ring-2 focus:ring-blue-500 duration-100 outline-none field-sizing-content min-w-[300px]  sm:min-w-[400px] max-w-[400px] min-h-[100px] `}/>
                            <div className="flex gap-2 ml-2">
                                <button type='submit' className="hover:bg-blue-300 bg-blue-400 pt-2 pb-2 pl-3 pr-3 rounded-sm duration-200 ">Save</button>
                                <button  onClick={() => setOpenEditDisc(false)} className="hover:bg-red-300 bg-red-400 pt-2 pb-2 pl-3 pr-3 rounded-sm duration-200">Cancel</button>
                            </div>
                        </form>
                        ) : (
                        <div className={`relative ml-4 pt-1 p-1 max-w-[400px] min-h-[100px] ${darkMode ? 'bg-[#252525]' : 'bg-[#c0c0c0]'}  rounded-sm `}>
                            <p className="w-[400px] break-words">{task.description}</p>
                            <i onClick={() => (setOpenEditDisc(true) ,setUpdatedTaskDescriptionValue(task.description))} className="fa-solid cursor-pointer fa-pen-to-square absolute bottom-2 right-2"></i>
                        </div>
                        ) : openEditDisc ? (
                            <form className="flex gap-4  ml-4 flex-col items-start" onSubmit={(e) => {handleChangeTaskDesc(e)}}>
                                <textarea  onKeyDown={handleUserKeyPress} ref={textareaRef} value={updatedTaskDescriptionValue} onChange={(e) => setUpdatedTaskDescriptionValue(e.target.value)} autoFocus className={`  ml-1  border-2 border-[#5a626957]
                                    focus:ring-2 focus:ring-blue-500 duration-100 rounded-sm pl-2 pr-2 resize-none outline-none field-sizing-content  min-w-[400px] max-w-[400px]  min-h-[100px]`}/>
                                <div className="flex gap-2 ml-2">
                                    <button type='submit' className="hover:bg-blue-300 bg-blue-400 pt-2 pb-2 pl-3 pr-3 rounded-sm duration-200 ">Save</button>
                                    <button  onClick={() => setOpenEditDisc(false)} className="hover:bg-red-300 bg-red-400 pt-2 pb-2 pl-3 pr-3 rounded-sm duration-200">Cancel</button>
                                </div>
                            </form>
                        ) : (
                        <div className={`relative ml-4 pt-1 p-1 max-w-[400px] min-h-[100px] ${darkMode ? 'bg-[#252525]' : 'bg-[#c0c0c0]'}  rounded-sm `}>
                            <p className="ml-1 mt-1">Detail descriptions...</p>
                            <i onClick={() => (setOpenEditDisc(true) ,setUpdatedTaskDescriptionValue(task.description))} className="fa-solid cursor-pointer fa-pen-to-square absolute bottom-2 right-2"></i>
                        </div>
                        )}
                </div>
        </div>
    </div>
  )
}

export default ModalTasks

