import { useEffect } from "react";
import {
  MdOutlineGroupAdd,
  MdStarBorder,
  MdChecklist,
  MdMarkChatRead,
  MdLogout,
  MdMoreVert,
} from "react-icons/md";
import { useAppContext } from "../contexts/AppContext";

export default function ChatMenuDropdown() {
  const [open, dropdownRef, commonHandler] = useAppContext();

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger */}
      <button
        onClick={commonHandler}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        <MdMoreVert />
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border z-50">
          <DropdownItem icon={<MdOutlineGroupAdd />} label="New group" />
          <DropdownItem icon={<MdStarBorder />} label="Starred messages" />
          <DropdownItem icon={<MdChecklist />} label="Select chat" />
          <DropdownItem icon={<MdMarkChatRead />} label="Mark all as read" />

          <div className="border-t my-1" />

          <DropdownItem
            icon={<MdLogout />}
            label="Logout"
            danger
          />
        </div>
      )}
    </div>
  );
}

function DropdownItem({ icon, label, danger }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-2 text-sm text-left transition
        ${danger
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-700 hover:bg-gray-100"}`}
    >
      <span className="text-lg">{icon}</span>
      {label}
    </button>
  );
}
