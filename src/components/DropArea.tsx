import { useState } from "react"

interface dropAreaForms {
    darkMode: boolean;
    showDrop: boolean;
    beforeId: string | null;
    column: string
}   

const DropArea = ({  column, beforeId, darkMode, showDrop}:dropAreaForms) => {
    
    return (
        <div data-before={beforeId || "-1"} data-column={column} className={
            `${darkMode ? 'bg-[#c3c7ca8a]' : 'bg-[#1d212598]'} opacity-0 my-0.5 h-0.5 w-full transition-all`
        }>
            
        </div>
  )
}

export default DropArea
