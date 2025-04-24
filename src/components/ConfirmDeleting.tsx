import {motion} from 'framer-motion'

interface ConfirmDeletingProps {
    setIsDeleteOpen : (open: boolean) => void;
    isDeleteOpen: boolean;
    title:string;
    deleteFunc: (id: string) => void;
    itemsId: string
}

const ConfirmDeleting = ({setIsDeleteOpen, deleteFunc, itemsId, isDeleteOpen, title}: ConfirmDeletingProps) => {
  return (
    <div onClick={() => {setIsDeleteOpen(false)}} className={`${isDeleteOpen ? 'fixed z-20' : 'hidden z-0'} text-white top-0 left-0 w-screen h-screen transition-transform transition-discrete duration-100 bg-blur3`}>
        <motion.div
        initial={{y: -600}}
        animate={{y: 0}}
        exit={{y: -600}}
        onClick={e => e.stopPropagation()} className='absolute flex flex-col gap-5 rounded-2xl p-15 top-1/2 left-1/2 -translate-x-1/2 -translate-y-3/4 bg-black/80'>
            <p className="sm:text-2xl font-semibold">Are you sure you want to delete this {title} ? </p>
            <div className="flex gap-5">
                <button onClick={() => setIsDeleteOpen(false)} className="cursor-pointer pt-2 pb-2 pr-6 pl-6 rounded-lg sm:text-xl bg-blue-600 hover:bg-blue-700 duration-200">Close</button>
                <button onClick={() => {deleteFunc(itemsId), setIsDeleteOpen(false)}} className="cursor-pointer pt-2 pb-2 pr-6 pl-6 rounded-lg sm:text-xl bg-red-500 hover:bg-red-600 duration-200">Delete</button>
            </div>
        </motion.div>
    </div>
  )
}

export default ConfirmDeleting