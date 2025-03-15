
import { useEffect, useState } from 'react'
import { Task, Timer } from '../Types'

interface TaskTimerProps {
  task: Task
  updateTaskTimer:(id:string, minutes:number, seconds:number) => void;
  dataTimer: Timer[];
  pauseStartTaskTimer: (id:string) => void;
  darkMode: boolean;
}

const TaskTimer = ({darkMode, task, dataTimer, updateTaskTimer ,pauseStartTaskTimer}: TaskTimerProps) => {
  const [breakTime, setBreakTime] = useState(false)
  const timer = dataTimer.filter((data) => data.taskId === task.id)[0]
  

  useEffect(() => {
    let interval = setInterval(() => {
      if (timer.isOn) {
        if (timer.seconds === 0) {
          if (timer.minutes !== 0) {
            updateTaskTimer(timer.id, timer.minutes - 1, 59)
          } else {
            if (breakTime) {
              updateTaskTimer(timer.id, 25, 0)
              setBreakTime(false)
            } else {
              updateTaskTimer(timer.id, 5, 0)
              setBreakTime(true)
            }
        }
        } else {
          updateTaskTimer(timer.id, timer.minutes ,  timer.seconds - 1)
        }
    }
    
    },1000)

    return () => clearInterval(interval)
    
  },[timer.isOn, timer.seconds, timer.minutes, timer.id, updateTaskTimer, pauseStartTaskTimer, breakTime])

  const pauseTimer = () => {
    pauseStartTaskTimer(timer.id)
  }
  
  let minutes = timer.minutes <= 9 ? `0${timer.minutes}` : timer.minutes
  let seconds = timer.seconds <= 9 ? `0${timer.seconds}` : timer.seconds
  
  return (
    <div className='flex flex-col items-center gap-5'>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-3xl'>{breakTime ? 'Break' : 'Pomodoro'}</h1>
        <h1 className='text-8xl '>{minutes}:{seconds}</h1>
      </div>
      <div className='flex gap-5 items-center'>
        <button onClick={() => updateTaskTimer(timer.id, breakTime ? 5 : 25, 0)} className={`cursor-pointer text-2xl pt-2 pb-2 pr-4 pl-4  rounded-lg hover:scale-90
            duration-500 `}>
          <i className="fa-solid fa-arrow-rotate-left"></i>
        </button>
        <button onClick={() => pauseTimer()} className={`cursor-pointer text-2xl pt-2 pb-2 pr-4 pl-4 w-[200px] rounded-lg hover:scale-95
           ${darkMode ? ' bg-[#1b1c1d]' : 'bg-[#c0c0c0]'} duration-500 `}>
            {timer.isOn ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => updateTaskTimer(timer.id, 0, 1)} className={`cursor-pointer text-2xl pt-2 pb-2 pr-4 pl-4  rounded-lg hover:scale-90
            duration-500 `}>
          <i className="fa-solid fa-forward"></i>
        </button>
        
      </div>
      
    </div>
  )
}

export default TaskTimer