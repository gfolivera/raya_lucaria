import CreateUser from "./pages/CreateUser";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Courses from "./pages/Courses";

import Profile from "./pages/Profile";
import UserProvider from "./components/UserContext";

function App() {
  return (
    <>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user/create" element={<CreateUser />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </UserProvider>
    </>
  );
}

export default App;
