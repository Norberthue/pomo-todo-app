import { useState } from "react"

interface dropAreaForms {
    onDropTask: (status:string, position:number) => void
}

const DropArea = ({onDropTask}:dropAreaForms) => {
    const [showDrop , setShowDrop] = useState(false) 
    return (
        <div onDrop={() => {onDropTask('dropped', 0) , setShowDrop(false)}} onDragOver={e => e.preventDefault()} onDragEnter={() => setShowDrop(true)} onDragLeave={() => setShowDrop(false)} className={
            ` ${showDrop ? 'opacity-100 w-full h-[40px] pl-2 mt-2 mb-2 border-1 border-dashed rounded-sm pt-2 pb-2 transition-all ' : 'opacity-0 '}`
        }>
            Drop here
        </div>
  )
}

export default DropArea