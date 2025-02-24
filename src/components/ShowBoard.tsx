import React, { SetStateAction, useEffect, useState } from 'react'
import { Board } from '../Types'
import { useParams } from 'react-router-dom'


interface ShowBoardProps  {
    dataBoard: Board[]
}


const ShowBoard = ({dataBoard}: ShowBoardProps) => {
    const {slug} = useParams()
    const [board, setBoard] = useState<Board | null>(null)
    
    useEffect(()=> {
        const findDetail = dataBoard.filter((board) => board.slug === slug)
        if (findDetail.length > 0) {
            setBoard(findDetail[0])
        }
    },[slug])
   


  
    return (
    <div>
        <h1>{board?.title}</h1>
    </div>
  )
}

export default ShowBoard