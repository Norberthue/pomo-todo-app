import { useState } from "react"
import { Board } from '../Types'
import { Link } from 'react-router-dom'
import  CreateNewTemplateModal from "./CreateNewTemplateModal";


interface BoardsForms {
  addBoard: (title: string) => void;
  dataBoard: Board[]
  darkMode: boolean
}

const Boards = ({ addBoard, dataBoard, darkMode}: BoardsForms) => {
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
    <div className="flex flex-col gap-10 mt-10">
        <div className="flex gap-10 sm:gap-0 flex-col sm:flex-row justify-evenly items-center mx-24 mt-10 ">
          <div>
            <h1 className="text-2xl ">Templates</h1>
          </div>
          <div className="">
            <form className="relative">
                <h1 className="text-sm absolute -top-5">Search</h1>
                <input placeholder="Search templates" className={`placeholder-gray-500  focus:ring-2 focus:ring-blue-500 duration-100 w-[300px] rounded-sm pt-2 pb-2 pl-7 border-1 ${darkMode ? 'border-[#5a626957] bg-[#1d2125] ' : 'border-[#5a626957] bg-white'}  outline-none `}></input>
                <i className="fa-solid fa-magnifying-glass text-[#5a626957]  absolute left-1 top-3 pl-1"></i>
            </form>
          </div>
        </div>
        <div className="flex justify-center items-center text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 border-t-1  border-[#5a626957] pt-7">
            <div className={`relative rounded-lg w-[300px] text-sm h-[90px] transition-all duration-300 
            ${darkMode ? 'text-white bg-[#292d31] hover:bg-[#2e3336] ' : 'text-gray-500  hover:bg-gray-200 bg-gray-100'} 
            font-semibold cursor-pointer   flex items-center justify-center`}>
                <h1 onClick={() => {setOpenCreateBoard(true)}} className="w-full h-full flex items-center justify-center">Create new Template</h1>
                <CreateNewTemplateModal setOpenCreateBoard={setOpenCreateBoard} openCreateBoard={openCreateBoard} 
                darkMode={darkMode} handleSubmit={handleSubmit} boardTitle={boardTitle} setBoardTitle={setBoardTitle}/>
            </div>

            {dataBoard.map((data) => {
              return (
                <Link key={data.id} to={data.slug}>
                <div className="bg-red-400 rounded-lg w-[300px] text-sm h-[90px]
                    font-semibold cursor-pointer">
                    <h1 className="p-2">{data.title}</h1>
                </div>
                </Link>
                
              )
            })}
          </div>
      </div>
    </div>
    
  )
    
}

export default Boards