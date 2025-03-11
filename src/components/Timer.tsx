
import { useEffect } from 'react'
import { Task } from '../Types'

interface TimerProps {
  task: Task
  updateTaskTimer:(id:string, minutes:number, seconds:number) => void;
}

const Timer = ({task, updateTaskTimer}: TimerProps) => {
  
  useEffect(() => {
    let interval = setInterval(() => {
      
    clearInterval(interval)
      
    if (task.seconds === 0) {
      if (task.minutes !== 0) {
         updateTaskTimer(task.id, task.minutes - 1, 59)
      } else{
        //
      }
    } else {
       updateTaskTimer(task.id, task.minutes ,  task.seconds - 1)
    }
  
    },1000)
    
  },[task.seconds])
  
  let minutes = task.minutes <= 9 ? `0${task.minutes}` : task.minutes
  let seconds = task.seconds <= 9 ? `0${task.seconds}` : task.seconds
  
  return (
    <div className='text-6xl'>{minutes}:{seconds}</div>
  )
}

export default Timer