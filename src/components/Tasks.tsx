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
    const [showDrop , setShowDrop] = useState(false) 
    
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

    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        highlightIndicator(e);
    };


    const clearHighlights = (els: HTMLElement[] = []) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => {
            i.style.opacity = "0";
        });
    };

        
    const highlightIndicator = (e: React.DragEvent) => {
        const indicators = getIndicators();

        clearHighlights(indicators as HTMLElement[]);

        const el = getNearestIndicator(e, indicators);

        el.element.style.opacity = "1";
    };


    const getNearestIndicator = (e: React.DragEvent, indicators: HTMLElement[]) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest, child) => {
            const box = child.getBoundingClientRect();

            const offset = e.clientY - (box.top + DISTANCE_OFFSET);

            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
            },
            {
            offset: Number.NEGATIVE_INFINITY,
            element: indicators[indicators.length - 1],
            }
        );

        return el;
    };
    
    
    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${column.id}"]`)) as HTMLElement[];
      };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, card: Task) => {
    e.dataTransfer.setData("cardId", card.id);
    };

    const handleDragLeave = () => {
        clearHighlights();
    };

    const handleDragEnd = () => {
        clearHighlights();
        setActiveTask(null)
    };
    return (
    <>
        <DropArea darkMode={darkMode} showDrop={showDrop} beforeId={null} column={column.id}></DropArea>
        {dataTask.length >= 1 && dataTask.map((task, index) => (
            task.colId === column.id && (
                <div key={task.id}>
                    <div draggable onDragOver={e => handleDragOver(e)} onDragEnter={() => setShowDrop(true)}
                     onDragLeave={() => handleDragLeave()}  onDrop={() => {onDropTask(column.id, index); setShowDrop(false)}} 
                      onDragStart={(e) => {setActiveTask(index); handleDragStart(e, task) }} onDragEnd={() => handleDragEnd()} 
                      className={`  ${darkMode ? 'text-[#f8f8f8ee] bg-[#1d2125] hover:bg-[#2e3336] ' : 
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
                    <DropArea darkMode={darkMode} showDrop={showDrop} beforeId={null} column={column.id}></DropArea>
                </div>
            )
            
        ))}
    </>
  )
}

export default Tasks