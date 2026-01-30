import {
  MdLogout,
  MdOutlineCheckBox,
  MdOutlineGroupAdd,
  MdOutlineMarkUnreadChatAlt,
  MdOutlineStarBorderPurple500,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import axios from "axios";
import Cookies from "js-cookie";

function DropdownMenu() {
  const {
    dropdownRef,
    setOpen,
    commonHandler,
    setAuthUser,
    setActiveChat,
  } = useAppContext();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post("/api/user/logout");

      // clear storage
      localStorage.removeItem("messanger");
      localStorage.removeItem("activeUser");
      Cookies.remove("token");

      // reset context
      setAuthUser(null);
      setActiveChat(null);

      // close dropdown
      setOpen(false);

      // redirect
      navigate("/signin");

      alert("Logout successfully");
    } catch (error) {
      console.log(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div
      ref={dropdownRef}
      className="flex text-sm flex-col font-medium bg-white border border-gray-300 w-48 rounded-xl p-2 absolute top-full -right-2 shadow-md"
    >
      <DropdownItem
        label="New Group"
        icon={<MdOutlineGroupAdd />}
        btnaction={commonHandler}
      />
      <DropdownItem
        label="Starred Message"
        icon={<MdOutlineStarBorderPurple500 />}
        btnaction={commonHandler}
      />
      <DropdownItem
        label="Select chats"
        icon={<MdOutlineCheckBox />}
        btnaction={commonHandler}
      />
      <DropdownItem
        label="Mark all as read"
        icon={<MdOutlineMarkUnreadChatAlt />}
        btnaction={commonHandler}
      />

      <hr className="my-2" />

      <DropdownItem
        label="Logout"
        icon={<MdLogout />}
        logout
        btnaction={handleLogout}
      />
    </div>
  );
}

const DropdownItem = ({ label, icon, logout, btnaction }) => {
  return (
    <button
      onClick={btnaction}
      className={`flex gap-2 items-center py-2.5 px-2 rounded-md cursor-pointer
        ${
          logout
            ? "text-red-600 hover:bg-red-100"
            : "text-slate-700 hover:bg-slate-100"
        }`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
};

export default DropdownMenu;
