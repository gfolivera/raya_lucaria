import CreateUser from "./pages/CreateUser";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
function App() {
  //  const [count, setCount] = useState(10);

  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<Home />} />
        <Route path="user/create" element={<CreateUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/courses" element={<Courses />} />
      </Routes>
    </>
  );
}

export default App;
