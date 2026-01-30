import React, { useContext } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import DropdownMenu from './DropdownMenu'
import  { useAppContext } from '../contexts/AppContext'

function LeftHeader() {
    const {open, setOpen} = useAppContext()
  return (
    <div  className="px-4 py-2 flex relative items-center justify-between bg-white text-green-600 text-xl font-bold">
          WhatsApp
          <button onClick={()=> setOpen(!open)} className='w-10 h-10 text-2xl flex justify-center items-center rounded-full hover:bg-gray-100 text-gray-800 transition-all duration-200 cursor-pointer'>
            <BsThreeDotsVertical />
          </button>
          {open && <DropdownMenu />}
        </div>
  )
}

export default LeftHeader