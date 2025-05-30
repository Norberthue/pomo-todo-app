import { Board, Column, Task, Timer } from '../Types'
import Tasks from './Tasks';
import AddNewTaskButton from './AddNewTaskButton';
import { useState } from 'react';
import DropArea from './DropArea';
import { AnimatePresence, motion } from "framer-motion";
import ConfirmDeleting from './ConfirmDeleting';
import { useTheme } from '../ThemeContext';

interface ColumnsForms {
    addTask: (title: string, columnId: string, boardId: string | null) => void;
    dataTask: Task[];
    dataColumn: Column[];
    board: Board | null;
    deleteColumn: (id:string) => void;
    updateColumn: (id:string, newTitle:string) => void;
    updateTask: (id:string, newTitle:string) => void;
    deleteTask: (id:string) => void;
    toggleCompleteTask: (id:string) => void;
    setDataTask:(set: Task[]) => void;
    updateTaskDescription:(id:string, newDescription:string) => void;
    updateTaskTimer:(id:string, minutes:number, seconds:number, newBreakTime: boolean) => void;
    addTimer: (taskId:string, boardId:string, colId:string) => void;
    dataTimer: Timer[];
    pauseStartTaskTimer: (id:string) => void;
    updateFixedTime: (id:string, newBreakTime:number, newPomoTime:number) => void;
    updateTaskHasTimer:(id: string, updatedHasTimer: boolean) => void;
    updateTaskOrder: (task: Task[]) => void;
    updateTaskTimerFirebase:(id:string, minutes:number, seconds:number, newBreakTime: boolean) => void;
    updateBoardPomoCounter: (id:string, newCounter:number, newMinutes: number) => void;
}

const Columns = ({ updateBoardPomoCounter, addTask ,dataTimer, updateTask, updateTaskOrder, updateTaskTimerFirebase, addTimer, updateTaskHasTimer, updateFixedTime, pauseStartTaskTimer, deleteTask, setDataTask, updateTaskTimer, updateTaskDescription, toggleCompleteTask, dataTask, dataColumn, board, deleteColumn,  updateColumn}: ColumnsForms) => {
    const [updatedColumnTitle, setUpdatedColumnTitle] = useState('')
    const [columnId, setColumnId] = useState('') 
    const [isDeleteOpen, setIsDeleteOpen] = useState(false)
    const [columnIdForDelete, setColumnIdForDelete ] = useState('')
    const {darkMode} = useTheme();
    
    const handleChangeColumnName = (e:React.FormEvent) => {
        e.preventDefault()
        if (updatedColumnTitle.length >= 1) {
          updateColumn(columnId, updatedColumnTitle)
          setColumnId('')
    
        }
      }
    
    ////////////// Drag and drop functiions for tasks\\\\\\\\\\\\\\\\\
    const handleDragEnd = (e: React.DragEvent<HTMLDivElement>, column:string) => {
        const cardId = e.dataTransfer.getData("cardId");
        
        clearHighlights([], column);

        const indicators = getIndicators(column);
        const { element } = getNearestIndicator(e, indicators);
        
        const before = (element).dataset.before || "-1";
        
        if (before !== cardId) {
            let copy = [...dataTask];

            let cardToTransfer = copy.find((c) => c.id === cardId);
            if (!cardToTransfer) return;
            cardToTransfer = { ...cardToTransfer, colId: column };

            copy = copy.filter((c) => c.id !== cardId);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.id === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }

            updateTaskOrder(copy);
            setDataTask(copy);
        }
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, column:string) => {
        e.preventDefault();
        highlightIndicator(e, column);
    };

    const clearHighlights = (els: HTMLElement[] = [], column:string) => {
        const indicators = els.length ? els : getIndicators(column);

        indicators.forEach((i) => {
            i.style.opacity = "0";
        });
    };

    const highlightIndicator = (e: React.DragEvent<HTMLDivElement>, column:string) => {
        const indicators = getIndicators(column);

        clearHighlights(indicators, column);

        const el = getNearestIndicator(e, indicators);

        el.element.style.opacity = "1";
    };

    const getNearestIndicator = (e: React.DragEvent<HTMLDivElement>, indicators: HTMLElement[]) => {
        const DISTANCE_OFFSET = 25;

        const el = indicators.reduce(
            (closest, child) => {
            const box = child.getBoundingClientRect();

            const offset = e.clientY - (box.top +  DISTANCE_OFFSET);

            if (offset < 0 && offset > closest.offset) {
                return {offset: offset, element: child };
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

    const getIndicators = (column: string): HTMLElement[] => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`)) as HTMLElement[];
    };

    const handleDragLeave = (column:string) => {
        clearHighlights([], column);
       
    };

    
    return (
        <>
            {dataColumn.length >= 1 && dataColumn.map((column) => (
                column.boardId === board?.id && (
                    <div key={column.id} className='flex flex-col'>
                        <AnimatePresence>
                            {isDeleteOpen && <ConfirmDeleting title='Column' deleteFunc={deleteColumn} itemsId={columnIdForDelete} isDeleteOpen={isDeleteOpen} setIsDeleteOpen={setIsDeleteOpen}/>}
                        </AnimatePresence>
                        <motion.div  className={` w-[300px]  mb-2  max-h-[75vh]  transition-all duration-500 ${darkMode ? 'bg-[#0d0d0ea2] ' :
                            'bg-[#d8d8d8a8]'}  ml-2 self-baseline rounded-lg  flex flex-col `} >
                            {columnId !== column.id ? (
                                <div className={`flex justify-between pl-2 pr-2 pb-2 pt-2 items-center sticky top-0 z-10 `}>
                                    <h1 className="pt-1 pl-1 font-semibold ">{column.title}</h1>
                                    <div className='flex gap-2 place-items-end'>
                                        <button className='hover:scale-90 duration-200 cursor-pointer text-sm' onClick={() => {setIsDeleteOpen(true), setColumnIdForDelete(column.id)}}><i className="fa-solid fa-trash"></i></button>
                                        <button className='hover:scale-90 duration-200 cursor-pointer text-sm' onClick={() => {setColumnId(column.id), setUpdatedColumnTitle(column.title)}}><i className="fa-solid fa-pen-to-square"></i></button>
                                    </div>
                                </div>
                                ) : ( 
                                <form onSubmit={(e) => {handleChangeColumnName(e)}} className=" items-center justify-between flex gap-1">
                                    <input maxLength={28}  value={updatedColumnTitle} onChange={(e) => {setUpdatedColumnTitle(e.target.value)}} autoFocus className={`  ml-2    border-b-2 border-[#5a626957]
                                    duration-100 rounded-sm  pl-2 pr-2 pb-2 pt-3 items-center sticky  z-10  outline-none `}/>
                                    <div className="flex items-center  gap-1 text-white">
                                        <button type='submit' className="hover:bg-slate-600 rounded-sm duration-200   pl-2 pr-2"><i className="fa-solid fa-check"></i></button>
                                        <button className="hover:bg-slate-600 rounded-sm duration-200  pl-2 pr-2" onClick={() => {setColumnId('')}}><i className="fa-solid fa-xmark"></i></button>
                                    </div>
                                </form>
                            )}
                            <div onDrop={(e) => handleDragEnd(e,column.id)}
                                onDragOver={(e) => handleDragOver(e,column.id)}
                                onDragLeave={() => handleDragLeave(column.id)} className='flex flex-col mt-1 pl-2 pr-2 overflow-y-auto scrollbar2'>
                                <Tasks updateBoardPomoCounter={updateBoardPomoCounter} updateTaskTimerFirebase={updateTaskTimerFirebase} updateTaskHasTimer={updateTaskHasTimer} addTimer={addTimer}
                                    updateFixedTime={updateFixedTime} pauseStartTaskTimer={pauseStartTaskTimer} dataTimer={dataTimer} updateTaskTimer={updateTaskTimer}
                                    updateTaskDescription={updateTaskDescription} dataTask={dataTask} toggleCompleteTask={toggleCompleteTask} updateTask={updateTask}
                                    deleteTask={deleteTask} column={column} />
                                <DropArea  beforeId={null} column={column.id}></DropArea>
                                <AddNewTaskButton  column={column} addTask={addTask}/>
                            </div>
                        </motion.div>
                    </div>
                )
            ))}
        </>
    )
}

export default Columns