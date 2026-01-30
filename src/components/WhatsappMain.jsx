import { useAppContext } from "../contexts/AppContext";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";


export default function WhatsappMain() {
  const { activeChat } = useAppContext()
  return (
    <div className="h-screen bg-gray-100 flex">
      <LeftSidebar />
      {activeChat && <RightSidebar  />}      
    </div>
  );
}
