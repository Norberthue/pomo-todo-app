import { useState } from "react"
import { Board } from '../Types'
import { Link } from 'react-router-dom'


interface BoardsForms {
  addBoard: (title: string) => void;
  dataBoard: Board[]
}

const Boards = ({ addBoard, dataBoard}: BoardsForms) => {
  const [openCreateBoard, setOpenCreateBoard] = useState<boolean>(false)
  const [boardTitle, setBoardTitle] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (boardTitle.length > 0 ) {
      addBoard(boardTitle)
      setBoardTitle('')
      setOpenCreateBoard(false)
    }
    
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 ">
        <div className="relative rounded-lg w-[300px] text-sm h-[90px] text-gray-500
        font-semibold cursor-pointer bg-gray-100  hover:bg-gray-200 flex items-center justify-center">
            <h1 onClick={() => {setOpenCreateBoard(true)}} className="w-full h-full flex items-center justify-center">Create new Template</h1>
            <div className={`${openCreateBoard ? 'absolute': 'hidden'} sm:-right-80 flex flex-col gap-5 p-2 rounded-lg bg-gray-800 max-w-[400px] w-full`}>
                <div className="flex justify-evenly">
                  <div className="">
                    <h1 className="place-items-center">Create template </h1>
                  </div>
                  <div className="">
                    <button className="bg-black cursor-pointer" onClick={() => {setOpenCreateBoard(false)}}>X</button>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="flex flex-col">
                  <input type='text' value={boardTitle} onChange={(e) => {setBoardTitle(e.target.value)}}  className="border pl-2 border-blue-600" placeholder="Title"></input>
                  <button type="submit" >Start template</button>
                </form>  
            </div>
        </div>

        {dataBoard.map((data) => {
          return (
            <Link key={data.id} to={data.slug}>
            <div className="bg-red-400 rounded-lg  w-[300px] text-sm h-[90px] text-gray-500
                font-semibold cursor-pointer">
                <h1 className="p-2">{data.title}</h1>
            </div>
            </Link>
            
          )
        })}
      </div>
    </div>
  )
    
}

export default Boards