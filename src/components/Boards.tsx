import { useState } from "react"
import { Board } from '../Types'
import { Link } from 'react-router-dom'
import  CreateNewTemplateModal from "./CreateNewTemplateModal";


interface BoardsForms {
  addBoard: (title: string, bg:string) => void;
  dataBoard: Board[];
  darkMode: boolean;
  deleteBoard: (id:number, dataSlug: string) => void
  setDarkMode: (darkmode: boolean) => void
}

const Boards = ({ addBoard, dataBoard, darkMode, deleteBoard, setDarkMode}: BoardsForms) => {
  const [openCreateBoard, setOpenCreateBoard] = useState<boolean>(false)
  const [boardTitle, setBoardTitle] = useState<string>('')
  const [background, setBackground] = useState('')
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (boardTitle.length > 0 ) {
      addBoard(boardTitle, background)
      setBoardTitle('')
      setOpenCreateBoard(false)
    }
  }

  return (
    <div className="flex flex-col gap-10 ">
        <div className="flex gap-10 sm:gap-0 flex-col sm:flex-row justify-between items-center mx-24 mt-10 ">
        <div className="">
            <form className="relative">
               
                <input placeholder="Search templates" className={`placeholder-gray-500  focus:ring-2 focus:ring-blue-500 duration-100 
                  w-[300px] rounded-sm pt-2 pb-2 pl-7 border-1 ${darkMode ? 'border-[#5a626957] bg-[#1d2125] ' : 'border-[#5a626957] bg-white'}  outline-none `}></input>
                <i className="fa-solid fa-magnifying-glass text-[#5a626957]  absolute left-1 top-3 pl-1"></i>
            </form>
          </div>
          <div>
            <h1 className="text-2xl flex-1 justify-center">PomoTodo</h1>
          </div>
          <div className='flex gap-2 text-2xl'>
            <button onClick={() => {setDarkMode(!darkMode)}}>{darkMode ? 'Theme 🌞' : 'Theme 🌙'}</button>
            <h1>| Login</h1>
          </div>
        </div>
        <div className="flex justify-center items-center ">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 border-t-1  border-[#5a626957] pt-7">
            <div className={`relative rounded-lg w-[300px] text-sm h-[90px] transition-all duration-300 
            ${darkMode ? 'text-white bg-[#292d31] hover:bg-[#2e3336] ' : 'text-gray-500  hover:bg-gray-200 bg-gray-100'} 
            font-semibold cursor-pointer   flex items-center justify-center`}>
                <h1 onClick={() => {setOpenCreateBoard(true)}} className="w-full h-full flex items-center justify-center">Create new Template</h1>
                <CreateNewTemplateModal background={background} setBackground={setBackground} setOpenCreateBoard={setOpenCreateBoard} openCreateBoard={openCreateBoard} 
                darkMode={darkMode} handleSubmit={handleSubmit} boardTitle={boardTitle} setBoardTitle={setBoardTitle}/>
            </div>

            {dataBoard.map((data) => {
              return (
                
                <div key={data.id}  className={`bg-${data.bg}-400 group z-0 relative rounded-lg w-[300px] text-sm h-[90px]
                    font-semibold cursor-pointer`}>
                    <Link to={data.slug}>
                    <h1 className="p-2 h-[60px] text-white">{data.title}</h1>
                    </Link>
                    <div className="opacity-0  group-hover:opacity-100 absolute  bottom-1 flex right-0.5 gap-2 items-center duration-200">
                      <button onClick={() => {deleteBoard(data.id, data.slug)}} className="">🗑</button>
                      <button className="">✏️</button>
                    </div>
                    
                </div>
               
                
              )
            })}
          </div>
      </div>
    </div>
    
  )
    
}

export default Boards