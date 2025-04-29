import CreateUser from "./pages/CreateUser";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import { useEffect, useState } from "react";
import Profile from "./pages/Profile";

interface UserLoggedState {
  logged_username: string;
  first_name: string;
  last_name: string;
}

function App() {
  const [user, setUser] = useState<UserLoggedState>();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    console.log("current user:", user);
  }, [user]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="user/create" element={<CreateUser />} />
        {user ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Route path="/login" element={<Login />} />
        )}

        <Route path="/courses" element={<Courses />} />
      </Routes>
    </>
  );
}

export default App;
