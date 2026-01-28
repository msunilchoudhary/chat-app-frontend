import React, { useContext } from 'react'
import { MdLogout, MdOutlineCheckBox, MdOutlineGroupAdd, MdOutlineMarkUnreadChatAlt, MdOutlineStarBorderPurple500 } from 'react-icons/md'
import AppContext from '../contexts/AppContext'

function DropdownMenu() { 
    const {dropdownRef} = useContext(AppContext)   
  return (
    <div ref={dropdownRef} className="flex text-sm flex-col font-medium bg-white border border-gray-400 w-48 rounded-xl p-2 absolute top-full -right-2">
        <DropdownItem label="New Group" icon={<MdOutlineGroupAdd />} />
        <DropdownItem label="Starred Message" icon={<MdOutlineStarBorderPurple500 />} />
        <DropdownItem label="Select chats" icon={<MdOutlineCheckBox />} />
        <DropdownItem label="Mark all as read" icon={<MdOutlineMarkUnreadChatAlt />} />
        <hr className='text-gray-300 my-2 -ml-2 -mr-2' />
        <DropdownItem label="Logout" icon={<MdLogout /> } logout={true} />
    </div>
  )
}

const DropdownItem = ({label, icon, logout}) =>{
    const {open, setOpen} = useContext(AppContext)
    return(
        <>
            <button onClick={()=>setOpen(!open)} className={`${logout? 'hover:text-red-600 hover:bg-red-100 cursor-pointer':'hover:text-slate-800 hover:bg-slate-100 cursor-pointer'} flex gap-2 items-center py-2.5 px-2 text-slate-700 rounded-md`}>
                <span className='text-lg'>{icon}</span>
                {label}
            </button>
        </>
    )
}

export default DropdownMenu