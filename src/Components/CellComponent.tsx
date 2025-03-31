import React, { FC } from 'react'
import { Cell } from '../models/Cell'
import { Colors } from '../models/Colors';
interface CellProps {
  cell: Cell,
  isSelectedCell: boolean;
  handleClick: (cell: Cell) => void
}

const CellComponent: FC<CellProps> = ({ cell, isSelectedCell, handleClick }) => {
   //console.log(isSelectedCell,cell.color,'x= '+ cell.x, 'y= '+cell.y,'fugure&color = ' +cell.figure?.name +" "+ cell.figure?.color)
  return (
    <div onClick={() => handleClick(cell)} className={`w-[64px] h-[64px] ${isSelectedCell ? 'bg-blue-400' : cell.available && cell.figure ? 'bg-amber-400' : cell.color} relative `}>
      {!cell.figure && cell.available && <div className={`bg-amber-400 rounded-4xl w-3 h-3 absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2`}></div>}
      {cell.figure?.logo && <img src={cell.figure.logo}></img>}
      {`[${cell.x};${cell.y}]`}
    </div>
  )
}

export default CellComponent
