
import { useEffect, useState } from 'react'
import { Task, Timer } from '../Types'
//import ticker from './ticker.js'
interface TaskTimerProps {
  task: Task
  updateTaskTimer:(id:string, minutes:number, seconds:number) => void;
  dataTimer: Timer[];
  pauseStartTaskTimer: (id:string) => void;
  darkMode: boolean;
  updateFixedTime: (id:string, newBreakTime:number, newPomoTime:number) => void;
}

const TaskTimer = ({darkMode, task, dataTimer, updateFixedTime, updateTaskTimer ,pauseStartTaskTimer}: TaskTimerProps) => {
  const [breakTime, setBreakTime] = useState(false)
  const [isSettingsOn, setIsSettingsOn] = useState(false)
  const timer = dataTimer.filter((data) => data.taskId === task.id)[0]
  const [timerMinutes, setTimerMinutes] = useState<number>(timer.fixedPomodoroTime)
  const [timerBreaks, setTimerBreaks] = useState<number>(timer.fixedBreakTime)
  // const [isActive, setIsActive] = useState(true);
  // const [lastTime, setLastTime] = useState(Date.now());
  // const [time, setTime] = useState(timer.seconds);
  
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.hidden) {
  //       setIsActive(false);
  //       setLastTime(Date.now());
  //     } else {
  //       setIsActive(true);
  //       setTime((prev) => {
  //         const elapsed = Math.floor((Date.now() - lastTime) / 1000);
  //         const totalSeconds = prev + elapsed;
  //         const newMinutes = Math.floor(totalSeconds / 60);
  //         const newSeconds = totalSeconds % 60;

  //         if (newMinutes > 0) {
  //           updateTaskTimer(timer.id, timer.minutes - newMinutes, newSeconds);
  //         }

  //         return newSeconds;
  //       });
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  // }, [lastTime]);

  // update minutes and seconds and change it to break and pomo
  useEffect(() => {
    // if (!isActive) return;
    
    let interval = setInterval(() => {
      if (timer.isOn) {
        if (timer.seconds <= 0) {
          if (timer.minutes !== 0) {
              updateTaskTimer(timer.id, timer.minutes -1, 59)
          } else {
            if (breakTime) {
              updateTaskTimer(timer.id, timer.fixedPomodoroTime, 2);
              setBreakTime(false);
            } else {
                updateTaskTimer(timer.id, timer.fixedBreakTime, 2)
                setBreakTime(true)
            }
        }
        } else {
          updateTaskTimer(timer.id, timer.minutes, timer.seconds -1 );
         
        }
    }
    
    },1000)

    return () => clearInterval(interval)
    
  },[timer.isOn, timer.seconds, timer.id, updateTaskTimer, pauseStartTaskTimer, breakTime ])

  const pauseTimer = () => {
    pauseStartTaskTimer(timer.id)
  }

  let minutes = timer.minutes <= 9 ? `0${timer.minutes}` : timer.minutes
  let seconds = timer.seconds <= 9 ? `0${timer.seconds}` : timer.seconds


  //update pomo after change
  useEffect(() => {
    if (timer.fixedPomodoroTime !== timerMinutes && !breakTime) {
      updateTaskTimer(timer.id, timer.fixedPomodoroTime, 0)
    }
    }, [timer.fixedPomodoroTime]);
  
  //update break after change
  useEffect(() => {
    if (timer.fixedBreakTime !== timerMinutes && breakTime) {
      updateTaskTimer(timer.id, timer.fixedBreakTime, 0)
    }
    }, [timer.fixedBreakTime]);

  const handleChangePomo = (e: React.FormEvent | KeyboardEvent) => {
      e.preventDefault()
      updateFixedTime(timer.id, timerMinutes, timer.fixedBreakTime)
      setIsSettingsOn(!isSettingsOn)
  }

  const handleChangeBreak = (e: React.FormEvent | KeyboardEvent) => {
    e.preventDefault()
    updateFixedTime(timer.id, timer.fixedPomodoroTime, timerBreaks)
    setIsSettingsOn(!isSettingsOn)
  }

  const maxInputLength = (e:React.FormEvent | KeyboardEvent) => {
    const target = e.target as HTMLInputElement;

    // Removes non-numeric characters
    target.value = target.value.replace(/\D/g, "");

    // Limits to one digit
    if (target.value.length > target.maxLength) {
      target.value = target.value.slice(0, target.maxLength);
    }
  }
  
  return (
    <div className='flex flex-col items-center gap-5'>
      <div className='flex items-center gap-20'>
        <div>
          <h1 className='text-3xl w-[130px]'>{breakTime ? 'Break' : 'Pomodoro'}</h1>
        </div>
        <div className='relative'>
          <i onClick={() => setIsSettingsOn(!isSettingsOn)} className="fa-solid text-xl hover:-rotate-120 duration-500 fa-gear cursor-pointer"></i>
          <div className={`absolute ${isSettingsOn ? 'block' : 'hidden'} flex justify-evenly items-center gap-5 top-6 right-1/2 sm:right-auto sm:left-1/2 sm:-translate-x-1/2  -transalte-y-1/2  ${darkMode ? 'bg-[#1b1c1d]' : 'bg-[#c0c0c0]'}  rounded-lg p-4`}>
            <form onSubmit={handleChangePomo} className='flex flex-col items-center gap-2  w-[80px]'>
              <h2>Pomodoro</h2>
              <input onInput={(e) => {maxInputLength(e)}}  maxLength={2} type='number' value={timerMinutes} onChange={(e) => {setTimerMinutes(Number(e.target.value))}} className={` ${darkMode ? 'bg-[#242222] ' : 'bg-[#e4e4e4]'} pr-2  outline-none focus:ring-2 pl-2 pt-1 pb-1 focus:ring-blue-500 rounded-md w-[35px]`}></input>
              <button type="submit">Submit</button>
            </form>
            <form onSubmit={handleChangeBreak} className='flex flex-col items-center gap-2 w-[80px]'>
              <h2>Break</h2>
              <input maxLength={2} value={timerBreaks} onChange={(e) => setTimerBreaks(Number(e.target.value))} className={`${darkMode ? 'bg-[#242222] ' : 'bg-[#e4e4e4]'} outline-none focus:ring-2 pl-2 pr-2 pt-1 pb-1 focus:ring-blue-500 rounded-md w-[35px]`}></input>
              <button>Submit</button>
            </form>
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center gap-2'>
        <h1 className='text-8xl '>{minutes}:{seconds}</h1>
      </div>
      <div className='flex gap-5 items-center'>
        <button onClick={() => updateTaskTimer(timer.id, breakTime ? timer.fixedBreakTime : timer.fixedPomodoroTime, 0)} className={`cursor-pointer hover:-rotate-360 text-2xl pt-2 pb-2 pr-4 pl-4  rounded-lg hover:scale-90
            duration-500 `}>
          <i className="fa-solid fa-arrow-rotate-left"></i>
        </button>
        <button onClick={() =>{ pauseTimer()}} className={`cursor-pointer text-2xl pt-2 pb-2 pr-4 pl-4 w-[200px] rounded-lg hover:scale-95
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