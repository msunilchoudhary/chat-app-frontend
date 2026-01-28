import RightHeader from "./RightHeader";
import MessageInput from "./MessageInput";
import MessageLists from "./MessageLists";

function RightSidebar() {
  return (
    <div className="flex-1 flex flex-col">
      <RightHeader />
      <MessageLists />
      <MessageInput />
    </div>
  );
}

export default RightSidebar;
