import { Search } from "lucide-react";
import React from "react";

function SearchBar() {
  return (
    <div className="p-3">
      <div className="flex items-center bg-gray-100 rounded-md px-3">
        <Search size={16} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search chats"
          className="w-full h-11 bg-transparent p-2 outline-none text-sm"
        />
      </div>
    </div>
  );
}

export default SearchBar;
