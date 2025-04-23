import { useEffect, useRef, useState } from 'react'
import {Task, Timer } from '../Types'
import beep from '../assets/Audio/beep.wav'
import expolde from '../assets/Audio/clock-alarm.mp3'

interface TaskTimerProps {
  task: Task
  updateTaskTimer:(id:string, minutes:number, seconds:number, newBreakTime: boolean) => void;
  dataTimer: Timer[];
  pauseStartTaskTimer: (id:string) => void;
  darkMode: boolean;
  updateFixedTime: (id:string, newBreakTime:number, newPomoTime:number) => void;
  updateTaskTimerFirebase:(id:string, minutes:number, seconds:number, newBreakTime: boolean) => void;
  updateBoardPomoCounter: (id:string, newCounter:number, newMinutes: number) => void;
}

const TaskTimer = ({updateBoardPomoCounter, darkMode, task, dataTimer, updateFixedTime, updateTaskTimerFirebase, updateTaskTimer ,pauseStartTaskTimer}: TaskTimerProps) => {
  const [isSettingsOn, setIsSettingsOn] = useState(false)
  const timer = dataTimer.filter((data) => data.taskId === task.id)[0]
  const [timerMinutes, setTimerMinutes] = useState<number>(timer.fixedPomodoroTime)
  const [timerBreaks, setTimerBreaks] = useState<number>(timer.fixedBreakTime)
  const workerRef = useRef<Worker | null>(null);
  
  const audioBeep = useRef(new Audio(beep)).current;
  const audioAlarm = new Audio(expolde)
  audioAlarm.volume = 0.2
  audioBeep.volume = 0.2


  useEffect(() => {
    workerRef.current = new Worker(new URL('../ticker.js', import.meta.url));
    workerRef.current.onmessage = (e) => {
      const { timerId, elapsedTime } = e.data;
      if (timerId === timer.id && timer.isOn) {
        let totalSeconds = timer.minutes * 60 + timer.seconds - elapsedTime;
        if (totalSeconds <= 0) {
          if (timer.breakTime) {
            updateTaskTimer(timer.id, timer.fixedPomodoroTime, 0, false);
            setTimeout(() => {
              audioAlarm.pause()
            },2000)
            audioAlarm.play()
          } else {
            updateTaskTimer(timer.id, timer.fixedBreakTime, 0, true);
            if (task.boardId) {
              updateBoardPomoCounter(task.boardId, 1, timer.fixedPomodoroTime);
            } else {
              console.error("task.boardId is null");
            }
            setTimeout(() => {
              audioAlarm.pause()
            },2000)
            audioAlarm.play()
          }
        } else {
          const newMinutes = Math.floor(totalSeconds / 60);
          const newSeconds = totalSeconds % 60;
          updateTaskTimer(timer.id, newMinutes, newSeconds, timer.breakTime);

          if (newSeconds <= 10 && newMinutes === 0 ) {
            audioBeep.play()
          }

        }
      }
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, [timer.id, timer.isOn, timer.minutes, timer.seconds, updateTaskTimer, timer.breakTime]);

  useEffect(() => {
    updateTaskTimerFirebase(timer.id, timer.minutes, timer.seconds, timer.breakTime)
  },[])

  useEffect(() => {
    if (timer.isOn) {
      workerRef.current?.postMessage({ action: 'start', timerId: timer.id, duration: timer.minutes * 60 + timer.seconds });
    } else {
      workerRef.current?.postMessage({ action: 'stop' });
    }
  }, [timer.id, timer.isOn, timer.minutes, timer.seconds, updateTaskTimer,timer.breakTime]);

  const pauseTimer = () => {
    pauseStartTaskTimer(timer.id)
  }

  let minutes = timer.minutes <= 9 ? `0${timer.minutes}` : timer.minutes
  let seconds = timer.seconds <= 9 ? `0${timer.seconds}` : timer.seconds


  //update pomo after change
  useEffect(() => {
    if (timer.fixedPomodoroTime !== timerMinutes && !timer.breakTime) {
      updateTaskTimer(timer.id, timer.fixedPomodoroTime, 0, timer.breakTime)
      updateTaskTimerFirebase(timer.id, timer.fixedPomodoroTime, 0, timer.breakTime)
    }
    }, [timer.fixedPomodoroTime]);
  
  //update break after change
  useEffect(() => {
    if (timer.fixedBreakTime !== timerMinutes && timer.breakTime) {
      updateTaskTimer(timer.id, timer.fixedBreakTime, 0, timer.breakTime)
      updateTaskTimerFirebase(timer.id, timer.fixedBreakTime, 0, timer.breakTime)
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
          <h1 className='text-3xl w-[130px]'>{timer.breakTime ? 'Break' : 'Pomodoro'}</h1>
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
        <button onClick={() => updateTaskTimer(timer.id, timer.breakTime ? timer.fixedBreakTime : timer.fixedPomodoroTime, 0, timer.breakTime)} className={`cursor-pointer hover:-rotate-360 text-2xl pt-2 pb-2 pr-4 pl-4  rounded-lg hover:scale-90
            duration-500 `}>
          <i className="fa-solid fa-arrow-rotate-left"></i>
        </button>
        <button onClick={() =>{ pauseTimer()}} className={`cursor-pointer text-2xl pt-2 pb-2 pr-4 pl-4 w-[200px] rounded-lg hover:scale-95
           ${darkMode ? ' bg-[#1b1c1d]' : 'bg-[#c0c0c0]'} duration-500 `}>
            {timer.isOn ? 'Pause' : 'Start'}
        </button>
        <button onClick={() => updateTaskTimer(timer.id, 0, 1, timer.breakTime)} className={`cursor-pointer text-2xl pt-2 pb-2 pr-4 pl-4  rounded-lg hover:scale-90
            duration-500 `}>
          <i className="fa-solid fa-forward"></i>
        </button>
        
      </div>
      
    </div>
  )
}

export default TaskTimer