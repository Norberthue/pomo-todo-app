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
             left-1/2 xl:left-[550px] 2xl:left-[800px] -translate-x-1/2 flex flex-col gap-10 p-4 rounded-lg top-20  max-h-[600px] h-[600px] max-w-[300px] w-full`}>
            <div className=" flex  items-center mt-5">
                <div className="flex flex-1 justify-center">
                    <h1 className="text-lg">Create template</h1>
                </div>
                <div className="flex justify-end">
                    <i onClick={() => {setOpenCreateBoard(false)}} className={`fa-solid fa-xmark ${darkMode ? 'hover:bg-gray-500' : 'hover:bg-gray-200'}  p-3 rounded-sm duration-150`}></i>
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col relative gap-2">
                <input type='text' value={boardTitle} onChange={(e) => {setBoardTitle(e.target.value)}}  className={`border pl-2 pt-2 pb-2
                outline-none  focus:ring-2 focus:ring-blue-500 duration-100 ${darkMode ? 'border-[#5a626957] bg-[#1d2125] ' : 'border-[#5a626957] bg-white'} `} placeholder="Title"></input>
                <p className='absolute text-sm -top-5'>Name of template</p>
                <button type="submit"className={`p-2 rounded-sm 
                    ${darkMode === false ? 'bg-gray-200 text-black  hover:bg-[#c9cbcc] ' 
                    : 'bg-[#34383b] text-white hover:bg-[#434647] '} duration-200`}>
                        Start template
                </button>
            </form>  
        </div>
    </div>
  )
}

export default  CreateNewTemplateModal