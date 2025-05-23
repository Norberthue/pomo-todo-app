import {Task, Timer } from "../Types"
import Notes from "./Notes";
import TaskTimer from "./TaskTimer";
import { motion } from 'framer-motion'
import linkifyHtml from 'linkify-html';
import { useTheme } from '../ThemeContext';

interface ModalTaskForms {
    dataTask: Task[];
    setIsTaskOpen: (open:boolean) => void;
    updateTaskDescription:(id:string, newDescription:string) => void;
    toggleCompleteTask: (id:string) => void;
    updateTaskTimer:(id:string, minutes:number, seconds:number, newBreakTime: boolean) => void;
    getTask: string;
    dataTimer: Timer[];
    pauseStartTaskTimer: (id:string) => void;
    updateFixedTime: (id:string, newBreakTime:number, newPomoTime:number) => void;
    addTimer: (taskId:string, boardId:string, colId:string) => void;
    updateTaskHasTimer:(id: string, updatedHasTimer: boolean) => void;
    updateTaskTimerFirebase:(id:string, minutes:number, seconds:number, newBreakTime: boolean) => void;
    updateBoardPomoCounter: (id:string, newCounter:number, newMinutes: number) => void;
}   

const ModalTasks = ({updateBoardPomoCounter,updateTaskTimer, getTask, dataTimer, addTimer, updateTaskTimerFirebase, updateTaskHasTimer, updateFixedTime, pauseStartTaskTimer, dataTask, toggleCompleteTask, updateTaskDescription, setIsTaskOpen}: ModalTaskForms) => {

    const {darkMode} = useTheme();
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
    <div onClick={() => {setIsTaskOpen(false)}} className={` fixed z-20 top-0 left-0 w-screen h-full bg-blur3`}>
        <motion.div
        initial={{top:-900}}
        animate={{top:1/2}}
        exit={{top:-900}}
        transition={{duration:0.7 , ease:'easeInOut', type:'spring'}}
        onClick={e => {e.stopPropagation()}} className={`fixed left-1/2 -translate-x-1/2 translate-y-1/8 max-h-[80vh] overflow-y-auto scrollbar2
             ${darkMode ? 'bg-[#242222]' : 'bg-[#e4e4e4]'} max-w-[500px] w-full min-h-[600px] rounded-lg p-4  flex flex-col gap-4 `}>
                <div className="flex items-center gap-2 justify-between ">
                    <div className="flex items-center gap-2">
                        <i onClick={() => toggleCompleteTask(task.id)} className={` ${task.completed ? ' cursor-pointer fa-circle-check fa-solid text-green-600' : ' cursor-pointer fa-circle fa-regular'} duration-500`}></i> 
                        <h1 className={`text-2xl duration-500 max-w-[400px] line-clamp-2 ${task.completed ? 'text-gray-400 line-through' : ''}`}  dangerouslySetInnerHTML={{ __html: linkifyHtml(task.title)}}></h1>
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
                    <Notes task={task} updateTaskDescription={updateTaskDescription}></Notes>
                </div>
                <div className="flex items-center gap-2 mt-4">
                    <i className="fa-regular fa-clock"></i>
                    <h1 className="text-lg">Timer</h1>
                </div>
                <div className="flex items-center justify-center">
                    {task.hasTimer ? 
                    (<TaskTimer updateBoardPomoCounter={updateBoardPomoCounter} updateFixedTime={updateFixedTime} updateTaskTimerFirebase={updateTaskTimerFirebase} pauseStartTaskTimer={pauseStartTaskTimer} dataTimer={dataTimer} updateTaskTimer={updateTaskTimer} task={task}></TaskTimer>) 
                    : 
                    (<button onClick={() => handleCreateTimer()} className={` p-2 rounded-sm duration-300 cursor-pointer ${darkMode === false ? 'bg-gray-300 text-black  hover:bg-[#c9cbcc] ' 
                            : 'bg-[#34383b] text-white hover:bg-[#434647] '}`}>Create Timer</button>)}
                    
                    
                </div>
        </motion.div>
    </div>
  )
}

export default ModalTasks

