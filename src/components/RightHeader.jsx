
import { useAppContext } from '../contexts/AppContext'
import avtar from '../assets/avtar.webp'

function RightHeader() {
    const { activeChat } = useAppContext()    
  return (
    <div className="px-4 flex items-center bg-white h-16 font-medium border-b border-b-gray-300">
      <div className="userIn flex items-center gap-3">
        <div className="flex w-11 h-11 overflow-hidden rounded-full border border-gray-200 ">
          <img src={avtar} alt="" className="rounded-full" />
        </div>
        <div className="flex flex-col leading-4.5">
            <h3>{activeChat?.fullname}</h3>
            <p className='text-[12px] text-slate-500'>{activeChat?.status}</p>
        </div>        
      </div>
    </div>
  );
}

export default RightHeader