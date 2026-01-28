import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";


export default function WhatsappMain() {

  return (
    <div className="h-screen bg-gray-100 flex">
      <LeftSidebar />
      <RightSidebar  />
      
    </div>
  );
}
