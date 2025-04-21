// import { useState } from "react";
import CreateUser from "./pages/CreateUser";
import { Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
function App() {
  //  const [count, setCount] = useState(10);

  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="user/create" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
