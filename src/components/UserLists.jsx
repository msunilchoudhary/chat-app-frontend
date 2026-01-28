import { useContext } from "react";
import AppContext from "../contexts/AppContext";

function UserLists() {
  const { chats, activeChat, setActiveChat } = useContext(AppContext);
  return (
    <div className="overflow-y-auto h-[calc(100vh-120px)] mt-3  ">
      {chats.map((chat) => (
        <div
          key={chat.id}
          onClick={() => setActiveChat(chat)}
          className={`p-4 flex gap-2 items-center cursor-pointer hover:bg-gray-100 ${
            activeChat.id === chat.id ? "bg-gray-100" : ""
          }`}
        >
          <div className="flex w-12 h-12 overflow-hidden rounded-full">
            <img src={chat.img} />
          </div>
          <div className="flex flex-col flex-1 justify-center ">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">{chat.name}</h4>
              <span className="text-xs text-gray-500">{chat.time}</span>
            </div>
            <p className="text-sm text-gray-500 truncate">{chat.lastMsg}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserLists;
