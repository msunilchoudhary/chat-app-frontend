import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Cookies from 'js-cookie';

export const AppContext = createContext();

const initialUserState = Cookies.get("token") || localStorage.getItem("messanger")

export const AppContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(initialUserState ? JSON.parse(initialUserState) : undefined)
  const [activeChat, setActiveChat] = useState();
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef(null)



  useEffect(()=>{
    const handleDropdownOutSide = (e) => {
        if(dropdownRef.current && !dropdownRef.current.contains(e.target)){
            // setOpen(false)
        }
    };
    document.addEventListener("mousedown", handleDropdownOutSide);

    return ()=> document.removeEventListener("mousedown", handleDropdownOutSide)
  },[])

  const commonHandler = useCallback(() => {
        setOpen((prev) => !prev);
    },[])

  const contextValues = {
    activeChat,
    setActiveChat,
    message,
    setMessage,
    open, 
    setOpen,
    dropdownRef,
    authUser,
    setAuthUser,
    commonHandler
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext)
