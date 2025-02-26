import { Column, Task } from '../Types'

interface TasksForms {
    dataTask: Task[];
    darkMode: boolean;
    column: Column;
}

const Tasks = ({darkMode , dataTask, column}: TasksForms) => {
  return (
    <>
        {dataTask.length >= 1 && dataTask.map((task, index) => (
            task.id === column.title && (
                <div className={`${darkMode ? 'text-white bg-[#1d2125] hover:bg-[#2e3336] ' : 
                    'text-gray-500  hover:bg-gray-300 bg-gray-200'} 
                    pt-2 pb-2  rounded-lg `} key={index}>
                        <h1 className='pl-2'>
                            {task.title}
                        </h1>
                </div>
            )
        ))}
    </>
  )
}

export default Tasks