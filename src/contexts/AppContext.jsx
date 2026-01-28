import { createContext, useEffect, useRef, useState } from "react";
import { chats } from "../data";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [activeChat, setActiveChat] = useState(chats[0]);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(()=>{
    const handleDropdownOutSide = (e) => {
        if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
            setOpen(false)
        }
    };
    document.addEventListener("mousedown", handleDropdownOutSide);

    return ()=> document.removeEventListener("mousedown", handleDropdownOutSide)
  },[])


  const contextValues = {
    activeChat,
    setActiveChat,
    message,
    setMessage,
    chats,
    open, 
    setOpen,
    dropdownRef
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export default AppContext;
