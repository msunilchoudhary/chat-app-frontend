
import { useAppContext } from "../contexts/AppContext";
import useGetUsers from "../contexts/useGetUsers";
import avtar from '../assets/avtar.webp'
import { useEffect } from "react";

function UserLists() {
  const { activeChat, setActiveChat } = useAppContext();
  const [allUsers, loading] = useGetUsers();

  useEffect(()=>{
    const savedActiveUser = localStorage.getItem("activeUser");
    if (savedActiveUser) {
      setActiveChat(JSON.parse(savedActiveUser));
    }   
  },[setActiveChat])

  const handleActiveUser = (user) => {
    setActiveChat(user)
    localStorage.setItem("activeUser", JSON.stringify(user))
    
  }
  return (
    <div className="overflow-y-auto h-[calc(100vh-120px)] mt-3  ">
      {allUsers?.data?.map((user) => (
        <div
          key={user._id}
          onClick={() => handleActiveUser(user)}
          className={`p-4 flex gap-2 items-center cursor-pointer hover:bg-gray-100 ${
            activeChat?._id === user._id ? "bg-gray-100" : ""
          }`}
        >
          
          <div className="flex w-12 h-12 overflow-hidden rounded-full">
            <img src={avtar} />
          </div>
          <div className="flex flex-col flex-1 justify-center ">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{user?.fullname}</h4>
              <span className="text-xs text-gray-500">{user?.time}</span>
            </div>
            <p className="text-sm text-gray-500 truncate">{user?.lastMsg}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserLists;
