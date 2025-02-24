import { useState } from 'react'
import Boards from './components/Boards'
import  { Board } from  './Types'
import { Routes, Route } from 'react-router-dom'
import ShowBoard from './components/ShowBoard'

function App() {
  const [dataBoard, setDataBoard] = useState<Board[]>([])

  console.log(dataBoard)
  const addBoard = (title: string) => {
    setDataBoard([...dataBoard , {id: dataBoard.length, title, columns: [], slug: title}])
  } 

  return (
   <div className='flex justify-center items-center h-screen'>
    <Routes>
      <Route path='/' element={<Boards dataBoard={dataBoard} addBoard={addBoard}></Boards>}></Route>
      <Route path=':slug' element={<ShowBoard dataBoard={dataBoard}></ShowBoard>}></Route>
    </Routes>
      
   </div>
  )
}

export default App
