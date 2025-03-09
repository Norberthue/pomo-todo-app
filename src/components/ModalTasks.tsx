import { Task } from "../Types"

interface ModalTaskForms {
    task: Task;
    setOpenTask: (task:Task | null) => void;
    setIsTaskOpen: (open:boolean) =>void
}

const ModalTasks = ({task, setOpenTask, setIsTaskOpen}: ModalTaskForms) => {
    console.log(task)
    return (
    <div onClick={() => {setOpenTask(null), setIsTaskOpen(false)}} className={` fixed z-10 top-0 left-0 w-screen h-full bg-[#0000000e]`}>
        <div  onClick={e => {e.stopPropagation()}} className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            {task.title}
        </div>
        
    </div>
  )
}

export default ModalTasks