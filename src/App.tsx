import { useState } from 'react'
import Boards from './components/Boards'
import  { Board, Column, Task } from  './Types'
import { Routes, Route } from 'react-router-dom'
import ShowBoard from './components/ShowBoard'

function App() {
  const [dataBoard, setDataBoard] = useState<Board[]>([])
  const [dataColumn, setDataColumn] = useState<Column[]>([])
  const [dataTask, setDataTask] = useState<Task[]>([])
  
 

  
  const addBoard = (title: string) => {
    setDataBoard([...dataBoard , {id: dataBoard.length, title, columns: [], slug: title}])
  } 

  const addColumn = (title: string, boardId: string | null) => {
    setDataColumn([...dataColumn, { id: title, title, tasks: dataTask, boardId }])
  }

  const addTask = (title: string, columnId: string) => {
    setDataTask([...dataTask, {id: columnId, title, description: '', completed: false, timer: 0 }])
  }

 
  return (
   <div className=''>
    <Routes>
      <Route path='/' element={<Boards dataBoard={dataBoard} addBoard={addBoard}></Boards>}></Route>
      <Route path=':slug' element={<ShowBoard dataColumn={dataColumn} addTask={addTask} dataTask={dataTask}  addColumn={addColumn} dataBoard={dataBoard}></ShowBoard>}></Route>
    </Routes>
      
   </div>
  )
}

export default App
