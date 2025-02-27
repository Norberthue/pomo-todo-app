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
                    'text-gray-500  hover:bg-gray-200 bg-white'} 
                    pt-2 pb-2  rounded-lg content-shadow`} key={index}>
                        <h1 className='pl-2 '>
                            {task.title}
                        </h1>
                </div>
            )
        ))}
    </>
  )
}

export default Tasks