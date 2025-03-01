import { useState } from "react"
import { Board } from '../Types'
import { Link } from 'react-router-dom'
import  CreateNewTemplateModal from "./CreateNewTemplateModal";


interface BoardsForms {
  addBoard: (title: string, bg:string) => void;
  dataBoard: Board[];
  darkMode: boolean;
  deleteBoard: (id: string) => void
  setDarkMode: (darkmode: boolean) => void
  updateBoard: (id:string, newTitle:string) => void
}

const Boards = ({ addBoard, dataBoard, darkMode, deleteBoard, setDarkMode, updateBoard}: BoardsForms) => {
  const [openCreateBoard, setOpenCreateBoard] = useState<boolean>(false)
  const [boardTitle, setBoardTitle] = useState<string>('')
  const [background, setBackground] = useState('slate')
  const [search, setSearch] = useState('')
  const [updatedBoardTitle, setUpdatedBoardTitle] = useState('')
  const [templateId, setTemplateId] = useState('')
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (boardTitle.length > 0 ) {
      addBoard(boardTitle, background)
      setBoardTitle('')
      setOpenCreateBoard(false)
    }
  }

  const handleChangeTemplateName = (e:React.FormEvent) => {
    e.preventDefault()
    if (updatedBoardTitle.length >= 1) {
      updateBoard(templateId, updatedBoardTitle)
      setTemplateId('')

    }
  }

  return (
    <div className="flex flex-col gap-10 ">
        <div className="flex  sm:gap-0  justify-evenly items-center  mt-10 ">
          <div>
            <h1 className="text-sm sm:text-xl flex-1 justify-center"><i className="fa-solid fa-hippo"></i> PomoTodo</h1>
          </div>
          <div className="hidden sm:block">
            <form className="relative">
                <input placeholder="Search templates" value={search} onChange={(e) => {setSearch(e.target.value)}} className={`placeholder-gray-500  focus:ring-2 focus:ring-blue-500 duration-100 
                  w-[300px] rounded-sm pt-2 pb-2 pl-7 border-1 ${darkMode ? 'border-[#5a626957] bg-[#1d2125] ' : 'border-[#5a626957] bg-white'}  outline-none `}></input>
                <i className="fa-solid fa-magnifying-glass text-[#5a626957]  absolute left-1 top-3 pl-1"></i>
            </form>
          </div>
          <div className='flex gap-2 items-center text-sm sm:text-xl'>
              <button className='cursor-pointer' onClick={() => {setDarkMode(!darkMode)}}>{darkMode ? 'Theme 🌞' : 'Theme 🌙'}</button>
              <span className='ml-1 mr-1'>|</span>
              <h1 className='cursor-pointer'>Login</h1>
          </div>
        </div>
        <div className="flex justify-center sm:hidden">
            <form className="relative">
                <input placeholder="Search templates" value={search} onChange={(e) => {setSearch(e.target.value)}} className={`placeholder-gray-500  focus:ring-2 focus:ring-blue-500 duration-100 
                  w-[300px] rounded-sm pt-2 pb-2 pl-7 border-1 ${darkMode ? 'border-[#5a626957] bg-[#1d2125] ' : 'border-[#5a626957] bg-white'}  outline-none `}></input>
                <i className="fa-solid fa-magnifying-glass text-[#5a626957]  absolute left-1 top-3 pl-1"></i>
            </form>
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

            {dataBoard.filter(val => {return val.title.includes(search)}).map((data) => {
              return (
                <div key={data.id}  className={`bg-${data.bg}-400 group z-0 relative rounded-lg w-[300px] text-sm h-[90px]
                    font-semibold cursor-pointer`}>
                    {templateId !== data.id ? (
                        <Link to={data.id} className={``}>
                          <h1 className="p-2 h-[60px] text-white">{data.title}</h1>
                        </Link>) : ( 
                        <form onSubmit={(e) => {handleChangeTemplateName(e)}} className=" text-white items-center flex gap-2">
                          <input  value={updatedBoardTitle} onChange={(e) => {setUpdatedBoardTitle(e.target.value)}} autoFocus className={` mt-1 ml-1 placeholder-white border-2 border-[#5a626957]
                            focus:ring-2 focus:ring-blue-500  duration-100 
                            rounded-sm pt-2 pb-2 pl-2  outline-none `}/>
                          <div className="flex items-center  gap-2">
                            <button type='submit' className="hover:bg-slate-600 rounded-sm flex items-center duration-200 p-2"><i className="fa-solid fa-check"></i></button>
                            <button className="hover:bg-slate-600 rounded-sm flex items-center duration-200 p-2" onClick={() => {setTemplateId('')}}><i className="fa-solid fa-xmark"></i></button>
                          </div>
                        </form>
                    )}
                    
                    <div className="opacity-0  group-hover:opacity-100 group-hover:right-2 absolute  bottom-1 flex right-0 gap-2 items-center duration-500">
                      <button onClick={() => {deleteBoard(data.id)}} className="hover:scale-90 duration-200 cursor-pointer"><i className="fa-solid fa-trash"></i></button>
                      <button onClick={() => {setUpdatedBoardTitle(data.title),setTemplateId(data.id)}} className="hover:scale-90 duration-200 cursor-pointer"><i className="fa-solid fa-pen-to-square"></i></button>
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