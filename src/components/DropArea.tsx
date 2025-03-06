import { useState } from "react"

interface dropAreaForms {
    onDropTask: (status:string, position:number) => void;
    darkMode: boolean;
}   

const DropArea = ({onDropTask , darkMode}:dropAreaForms) => {
    const [showDrop , setShowDrop] = useState(false) 
    return (
        <div onDrop={() => {onDropTask('dropped', 0) , setShowDrop(false)}} onDragOver={e => e.preventDefault()} onDragEnter={() => setShowDrop(true)} onDragLeave={() => setShowDrop(false)} className={
            ` ${showDrop ? `opacity-100 ${darkMode ? 'bg-[#1d212598]' : 'bg-[#c3c7ca8a]'} w-full h-[40px] pl-2 mt-2 mb-2 rounded-sm pt-2 pb-2 transition-all ` : 'opacity-0 w-full bg-red-300 h-[20px] pl-2 mt-0.5 mb-0.5 rounded-sm pt-2 pb-2 transition-all '}`
        }>
            
        </div>
  )
}

export default DropArea