import { useEffect, useState } from 'react'
import Boards from './components/Boards'
import  { Board, Column, Task } from  './Types'
import { Routes, Route } from 'react-router-dom'
import ShowBoard from './components/ShowBoard'

const App: React.FC = () => {
  const [dataBoard, setDataBoard] = useState<Board[]>([])
  const [dataColumn, setDataColumn] = useState<Column[]>([])
  const [dataTask, setDataTask] = useState<Task[]>([])
  const [darkMode, setDarkMode] = useState(false)

  console.log('board: ' + dataBoard)
  console.log('col: ' + dataColumn)
  console.log('task: ' + dataTask.map((task) => task.title))

  useEffect(() => {
    const getBoard = localStorage.getItem('board') 
    const getCol = localStorage.getItem('col')
    const getTask = localStorage.getItem('task')
    const getDarkMode = localStorage.getItem('mode')
    if (getDarkMode) setDarkMode(JSON.parse(getDarkMode))
    getBoard !== null ? setDataBoard(JSON.parse(getBoard)) : []
    if (getCol) setDataColumn(JSON.parse(getCol))
    if (getTask) setDataTask(JSON.parse(getTask))
  },[])

  useEffect(() => {
      localStorage.setItem('board', JSON.stringify(dataBoard))
  },[dataBoard])

  useEffect(() => {
    localStorage.setItem('col', JSON.stringify(dataColumn))
  },[dataColumn])

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(dataTask))
  },[dataTask])

  useEffect(() => {
    localStorage.setItem('mode', JSON.stringify(darkMode))
  },[darkMode])

  
  const addBoard = (title: string, bg: string) => {
    setDataBoard([...dataBoard , {id: dataBoard.length, title, columns: [], slug: title, bg}])
  } 

  const deleteBoard = (id: number, dataSlug: string) => {
    setDataBoard(dataBoard.filter((board) => board.id !== id))
    setDataColumn(dataColumn.filter((col) => col.boardId !== dataSlug))
    setDataTask(dataTask.filter((task) => task.boardId !== dataSlug))
  }

  const addColumn = (title: string, boardId: string | null) => {
    setDataColumn([...dataColumn, { id: title, title, tasks: [], boardId }])
  }


  const addTask = (title: string, columnId: string, boardId: string | null) => {
    setDataTask([...dataTask, {id: columnId, title, description: '', completed: false, timer: 0 , boardId }])
  }

 
  return (
   <div className={` transition-all duration-200 min-h-screen ${darkMode ? 'text-white bg-[#1d2125]' : 'text-gray-600 bg-[#ffffff85]'}`}>
   <div className='hidden from-red-500 via-red-400 from-green-500 via-green-400 from-blue-500
    via-blue-400 from-orange-500 via-orange-400 from-yellow-500 via-yellow-400 from-purple-500 via-purple-400 from-pink-500 via-pink-400
    from-lime-500 via-lime-400 from-cyan-500 via-cyan-400 from-netural-500 via-netural-400'>

   </div>
    <Routes>
      <Route path='/' element={<Boards setDarkMode={setDarkMode} deleteBoard={deleteBoard} darkMode={darkMode} dataBoard={dataBoard} addBoard={addBoard}></Boards>}></Route>
      <Route path=':slug' element={<ShowBoard setDarkMode={setDarkMode} darkMode={darkMode} dataColumn={dataColumn} addTask={addTask} dataTask={dataTask}  addColumn={addColumn} dataBoard={dataBoard}></ShowBoard>}></Route>
    </Routes>
      
   </div>
  )
}

export default App
