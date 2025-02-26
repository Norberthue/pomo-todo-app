import React from 'react'

interface CreateNewTemplateModalForms {
    setOpenCreateBoard: (open: boolean) => void;
    openCreateBoard: boolean;
    darkMode: boolean;
    handleSubmit: (e: React.FormEvent) => void;
    boardTitle: string;
    setBoardTitle: (open: string) => void
}

const CreateNewTemplateModal = ({setOpenCreateBoard, openCreateBoard, darkMode , handleSubmit, boardTitle ,setBoardTitle}: CreateNewTemplateModalForms) => {
  return (
    <div onClick={() => {setOpenCreateBoard(false)}} className={`${openCreateBoard ? 'fixed': 'hidden'} top-0 left-0 w-screen h-full bg-[#0000000e]`}>
        <div onClick={e => {e.stopPropagation()}} className={`absolute content-shadow  ${darkMode ? 'text-white bg-[#1d2125]  ' : 'text-gray-500 border-gray-200 bg-gray-50'}
            sm:left-100 flex flex-col gap-5 p-2 rounded-lg z-10 max-h-[600px] h-[600px] max-w-[300px] w-full`}>
            <div className=" flex  items-center">
            <div className="flex flex-1 justify-center">
                <h1 className="">Create template </h1>
            </div>
            <div className="">
                <button className="cursor-pointer" onClick={() => {setOpenCreateBoard(false)}}>X</button>
            </div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col">
            <input type='text' value={boardTitle} onChange={(e) => {setBoardTitle(e.target.value)}}  className="border pl-2 border-blue-600" placeholder="Title"></input>
            <button type="submit" >Start template</button>
            </form>  
        </div>
    </div>
  )
}

export default  CreateNewTemplateModal