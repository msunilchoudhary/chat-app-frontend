import SearchBar from './SearchBar'
import LeftHeader from './LeftHeader'
import UserLists from './UserLists'
import { useAppContext } from '../contexts/AppContext'

function LeftSidebar() { 
  const { activeChat } = useAppContext()   
  return (
    <div className={`${activeChat? 'w-[30%]' : 'w-full'} border-r border-r-gray-300 bg-white`}>        
        <LeftHeader />        
        <SearchBar />   
        <UserLists />
      </div>
  )
}

export default LeftSidebar