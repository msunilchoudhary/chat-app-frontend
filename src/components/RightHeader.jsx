import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext'

function RightHeader() {
    const {activeChat } = useContext(AppContext)
  return (
    <div className="px-4 flex items-center bg-white h-16 font-medium border-b border-b-gray-300">
      <div className="userIn flex items-center gap-3">
        <div className="flex w-11 h-11 overflow-hidden rounded-full border border-gray-200 ">
          <img src={activeChat.img} alt="" className="rounded-full" />
        </div>
        <div className="flex flex-col leading-4.5">
            <h3>{activeChat.name}</h3>
            <p className='text-[12px] text-slate-500'>{activeChat?.status}</p>
        </div>        
      </div>
    </div>
  );
}

export default RightHeader