import SearchBar from './SearchBar'
import LeftHeader from './LeftHeader'
import UserLists from './UserLists'

function LeftSidebar() {    
  return (
    <div className="w-[30%] border-r border-r-gray-300 bg-white">        
        <LeftHeader />        
        <SearchBar />   
        <UserLists />
      </div>
  )
}

export default LeftSidebar