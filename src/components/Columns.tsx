import { Board, Column, Task } from '../Types'
import Tasks from './Tasks';
import AddNewTaskButton from './AddNewTaskButton';

interface ColumnsForms {
    addTask: (title: string, columnId: string) => void;
    dataTask: Task[];
    dataColumn: Column[];
    board: Board | null;
    darkMode: boolean
}

const Columns = ({addTask , dataTask, dataColumn, board, darkMode}: ColumnsForms) => {
    
    return (
        <>
            {dataColumn.length >= 1 && dataColumn.map((column) => (
                column.boardId === board?.slug && (
                    <div className={` w-[300px] flex-none  content-shadow  ${darkMode ? 'bg-[#0d0d0ed0] ' :
                        'bg-gray-100'}  ml-2 self-baseline p-2 rounded-lg  flex flex-col `} key={column.id}>
                        <h1 className='pt-1 pl-1 font-semibold'>{column.title}</h1>
                        <div className='flex flex-col pl-1 gap-2 mt-2'>
                            <Tasks dataTask={dataTask} darkMode={darkMode}  column={column}/>
                            <AddNewTaskButton column={column} darkMode={darkMode} addTask={addTask}/>
                        </div>
                    </div>
                )
            ))}
        </>
    )
}

export default Columns