import { useState } from "react"

interface dropAreaColsForms {
    onDropCol: (position:number) => void;
    darkMode: boolean;
}   

const DropAreaCols = ({onDropCol , darkMode}:dropAreaColsForms) => {
    const [showDrop , setShowDrop] = useState(false) 
    return (
        <div onDrop={() => {onDropCol(0) , setShowDrop(false)}} onDragOver={e => e.preventDefault()} onDragEnter={() => setShowDrop(true)} onDragLeave={() => setShowDrop(false)} className={
            `${showDrop ? `opacity-100 ${darkMode ? 'bg-[#1d212598]' : 'bg-[#c3c7ca8a]'} w-[200px] h-[200px] rounded-sm transition-all ` : 'opacity-0 w-[30px] bg-red-300 h-[200px]  rounded-sm transition-all '}`
        }>
            
        </div>
  )
}

export default DropAreaCols