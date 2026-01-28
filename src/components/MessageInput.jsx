import { useContext } from 'react'
import AppContext from '../contexts/AppContext'
import { Send } from 'lucide-react'

function MessageInput() {
    const {setMessage, message} = useContext(AppContext)
  return (
    <div className="p-3 bg-[#efeae2]">
        <div className="p-2 bg-white flex items-center gap-2 border border-gray-300 rounded-4xl">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message"
            className="flex-1 border-none rounded-full px-4 py-2 outline-none"
          />
          <button className="flex items-center justify-center hover:bg-green-500 p-2 rounded-full hover:text-white text-slate-500 transition-all duration-500 cursor-pointer">
            <Send size={24} />
          </button>
        </div>
    </div>
  )
}

export default MessageInput