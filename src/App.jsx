import { Routes, Route, Navigate } from "react-router-dom";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import WhatsappMain from "./components/WhatsappMain";

import  { useAppContext } from "./contexts/AppContext";

function App() {
  const {authUser} = useAppContext()
  return (
    <>
      <Routes>
        <Route path="/" element={authUser ? <WhatsappMain /> : <Navigate to="/signin" />} />
        <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
        <Route path="/signin" element={authUser ? <Navigate to="/" /> : <Signin />} />
      </Routes>
    </>
  );
}

export default App;
