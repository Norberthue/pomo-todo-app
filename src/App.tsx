import { useEffect, useState } from 'react'
import Boards from './components/Boards'
import  { Board, Column, Task } from  './Types'
import { Routes, Route } from 'react-router-dom'
import ShowBoard from './components/ShowBoard'
import Header from './components/Header'




const App: React.FC = () => {
  const [dataBoard, setDataBoard] = useState<Board[]>([])
  const [dataColumn, setDataColumn] = useState<Column[]>([])
  const [dataTask, setDataTask] = useState<Task[]>([])
  const [darkMode, setDarkMode] = useState(false)


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

  useEffect(() =>{
      localStorage.setItem('board', JSON.stringify(dataBoard))
  },[dataBoard])

  useEffect(() =>{
    localStorage.setItem('col', JSON.stringify(dataColumn))
  },[dataColumn])

  useEffect(() =>{
    localStorage.setItem('task', JSON.stringify(dataTask))
  },[dataTask])

  useEffect(() =>{
    localStorage.setItem('mode', JSON.stringify(darkMode))
},[darkMode])

  
  const addBoard = (title: string) => {
    setDataBoard([...dataBoard , {id: dataBoard.length, title, columns: [], slug: title}])
  } 

  const addColumn = (title: string, boardId: string | null) => {
    setDataColumn([...dataColumn, { id: title, title, tasks: [], boardId }])
  }

  const addTask = (title: string, columnId: string) => {
    setDataTask([...dataTask, {id: columnId, title, description: '', completed: false, timer: 0 }])
  }

 
  return (
   <div className={` transition-all duration-300 ${darkMode ? 'text-white bg-[#1d2125]' : 'text-gray-600 bg-[#ffffff85]'}`}>
    <Header darkMode={darkMode}  setDarkMode={setDarkMode}></Header>
    <Routes>
      <Route path='/' element={<Boards darkMode={darkMode} dataBoard={dataBoard} addBoard={addBoard}></Boards>}></Route>
      <Route path=':slug' element={<ShowBoard darkMode={darkMode} dataColumn={dataColumn} addTask={addTask} dataTask={dataTask}  addColumn={addColumn} dataBoard={dataBoard}></ShowBoard>}></Route>
    </Routes>
      
   </div>
  )
}

export default App
