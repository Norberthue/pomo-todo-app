
import { Task, Timer } from "../Types"
import Notes from "./Notes";
import TaskTimer from "./TaskTimer";
import { motion } from 'framer-motion'

interface ModalTaskForms {
    dataTask: Task[];
    setIsTaskOpen: (open:boolean) => void;
    darkMode: boolean;
    updateTaskDescription:(id:string, newDescription:string) => void;
    toggleCompleteTask: (id:string) => void;
    updateTaskTimer:(id:string, minutes:number, seconds:number) => void;
    getTask: string;
    dataTimer: Timer[];
    pauseStartTaskTimer: (id:string) => void;
    updateFixedTime: (id:string, newBreakTime:number, newPomoTime:number) => void;
    addTimer: (taskId:string, boardId:string, colId:string) => void;
    updateTaskHasTimer:(id: string, updatedHasTimer: boolean) => void;
}   

const ModalTasks = ({updateTaskTimer, getTask, dataTimer, addTimer, updateTaskHasTimer, updateFixedTime, pauseStartTaskTimer, dataTask, toggleCompleteTask, updateTaskDescription, setIsTaskOpen , darkMode}: ModalTaskForms) => {
    
    const findTask = dataTask.filter((task) => task.id === getTask)

    const task = findTask[0]

    const  handleCreateTimer = () => {
        if (task.id && task.boardId && task.colId) {
            addTimer(task.id, task.boardId, task.colId);
        } else {
            console.error("Task properties are missing or invalid.");
        }
        updateTaskHasTimer(task.id, true)
        
    }
    
    return (
    <div onClick={() => {setIsTaskOpen(false)}} className={` fixed z-20 top-0 left-0 w-screen h-full bg-[#00000050] `}>
        <motion.div
        initial={{top:-900}}
        animate={{top:1/2 }}
        exit={{top:-900}}
        transition={{duration:0.7 , ease:'easeInOut', type:'spring'}}
        onClick={e => {e.stopPropagation()}} className={`fixed left-1/2 -translate-x-1/2 translate-y-1/8
             ${darkMode ? 'bg-[#242222]' : 'bg-[#e4e4e4]'} max-w-[500px] w-full min-h-[600px] rounded-lg p-4  flex flex-col gap-4`}>
                <div className="flex items-center gap-2 justify-between">
                    <div className="flex items-center gap-2">
                        <i onClick={() => toggleCompleteTask(task.id)} className={` ${task.completed ? ' cursor-pointer fa-circle-check fa-solid text-green-600' : ' cursor-pointer fa-circle fa-regular'} duration-500`}></i> 
                        <h1 className={`text-2xl duration-500 ${task.completed ? 'text-gray-400 line-through' : ''}`}>{task.title}</h1>
                    </div>
                    <div>
                        <i onClick={() => {setIsTaskOpen(false)}} className={`cursor-pointer fa-solid fa-xmark  ${darkMode ? 'hover:bg-[#1b1c1d]' : 'hover:bg-gray-400'}   p-3 rounded-full duration-150`}></i>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <i className="fa-solid fa-bars"></i>
                    <h1 className="text-lg">Notes</h1>
                </div>
                <div>
                    <Notes task={task} updateTaskDescription={updateTaskDescription} darkMode={darkMode}></Notes>
                </div>
                <div className="flex items-center gap-2 mt-4">
                    <i className="fa-regular fa-clock"></i>
                    <h1 className="text-lg">Timer</h1>
                </div>
                <div className="flex items-center justify-center">
                    {task.hasTimer ? 
                    (<TaskTimer updateFixedTime={updateFixedTime} pauseStartTaskTimer={pauseStartTaskTimer} dataTimer={dataTimer} darkMode={darkMode} updateTaskTimer={updateTaskTimer} task={task}></TaskTimer>) 
                    : 
                    (<button onClick={() => handleCreateTimer()} className={` p-2 rounded-sm duration-300 cursor-pointer ${darkMode === false ? 'bg-gray-300 text-black  hover:bg-[#c9cbcc] ' 
                            : 'bg-[#34383b] text-white hover:bg-[#434647] '}`}>Create Timer</button>)}
                    
                    
                </div>
        </motion.div>
    </div>
  )
}

export default ModalTasks

