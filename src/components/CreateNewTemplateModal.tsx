import React from 'react'

interface CreateNewTemplateModalForms {
    setOpenCreateBoard: (open: boolean) => void;
    openCreateBoard: boolean;
    darkMode: boolean;
    handleSubmit: (e: React.FormEvent) => void;
    boardTitle: string;
    setBoardTitle: (open: string) => void;
    setBackground: (color: string) => void;
    background: string;
}

const CreateNewTemplateModal = ({setOpenCreateBoard, setBackground, background, openCreateBoard, darkMode , handleSubmit, boardTitle ,setBoardTitle}: CreateNewTemplateModalForms) => {
  return (
    <div onClick={() => {setOpenCreateBoard(false)}} className={`${openCreateBoard ? 'fixed': 'hidden'} z-10 top-0 left-0 w-screen h-full bg-[#0000000e]`}>
        <div onClick={e => {e.stopPropagation()}} className={`absolute content-shadow  ${darkMode ? 'text-white bg-[#1d2125]  ' : 'text-gray-500 border-gray-200 bg-gray-50'}
             left-1/2 xl:left-[550px] 2xl:left-[800px] -translate-x-1/2  flex flex-col gap-10 p-4 rounded-lg top-30  max-h-[600px] h-[400px] max-w-[300px] w-full`}>
            <div className=" flex  items-center ">
                <div className="flex flex-1 justify-center">
                    <h1 className="text-lg">Create template</h1>
                </div>
                <div className="flex justify-end">
                    <i onClick={() => {setOpenCreateBoard(false)}} className={`fa-solid fa-xmark ${darkMode ? 'hover:bg-gray-500' : 'hover:bg-gray-200'}  p-3 rounded-sm duration-150`}></i>
                </div>
            </div>
            <div>
                <h1 className='mb-1'>Background</h1>
                <div className='flex justify-stretch gap-4'>
                    <div onClick={() => {setBackground('red')}} className={`bg-red-400 ${background === 'red' ? 'border-2 border-red-700' : ''} w-10 h-10 place-self-start rounded-lg hover:scale-90 duration-200 `}></div>
                    <div onClick={() => {setBackground('orange')}} className={`bg-orange-400 ${background === 'orange' ? 'border-2 border-orange-700': ''} w-10 h-10 rounded-lg hover:scale-90 duration-200`}></div>
                    <div onClick={() => {setBackground('yellow')}} className={`bg-yellow-400  ${background === 'yellow' ? 'border-2 border-yellow-700': ''} w-10 h-10 rounded-lg hover:scale-90 duration-200`}></div>
                    <div onClick={() => {setBackground('green')}} className={` bg-green-400 ${background ==='green' ? 'border-2 border-green-700': ''} w-10 h-10 place-self-end rounded-lg hover:scale-90 duration-200`}></div>
                    <div onClick={() => {setBackground('blue')}} className={`bg-blue-400 ${background === 'blue' ? 'border-2 border-blue-700': ''} w-10 h-10 place-self-end rounded-lg hover:scale-90 duration-200`}></div>
                </div>
                <div className='flex justify-stretch gap-4 mt-2'>
                    <div  onClick={() => {setBackground('purple')}} className={` ${background === 'purple' ? 'border-2 border-purple-700': ''} bg-purple-400 w-10 h-10 place-self-start rounded-lg hover:scale-90 duration-200`}></div>
                    <div  onClick={() => {setBackground('pink')}} className={`bg-pink-400 ${background === 'pink' ? 'border-2 border-pink-700': ''} w-10 h-10 rounded-lg hover:scale-90 duration-200`}></div>
                    <div  onClick={() => {setBackground('lime')}} className={` ${background === 'lime' ? 'border-2 border-lime-700': ''} bg-lime-400  w-10 h-10 place-self-end rounded-lg hover:scale-90 duration-200`}></div>
                    <div onClick={() => {setBackground('cyan')}} className={`bg-cyan-400 ${background === 'cyan' ? 'border-2 border-cyan-700': ''} w-10 h-10 place-self-end rounded-lg hover:scale-90 duration-200`}></div>
                    <div onClick={() => {setBackground('neutral')}} className={`bg-neutral-300 ${background === 'neutral' ? 'border-2 border-neutral-700': ''} w-10 h-10 place-self-end rounded-lg hover:scale-90 duration-200`}></div>
                </div>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col relative gap-2">
                <input type='text' value={boardTitle} onChange={(e) => {setBoardTitle(e.target.value)}}  className={`border pl-2 pt-2 pb-2
                outline-none  focus:ring-2 focus:ring-blue-500 duration-100 ${darkMode ? 'border-[#5a626957] bg-[#1d2125] ' : 'border-[#5a626957] bg-white'} `} placeholder="Title"></input>
                <p className='absolute text-sm -top-6'>Name of template</p>
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