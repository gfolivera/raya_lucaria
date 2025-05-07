import axios from "axios";
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  first_name: string;
  last_name: string;
  username: string;
}

interface EnrolledCourse {
  course_id: number;
  course_name: string;
  teacher_name: string;
  category: string;
  description: string;
  spells: string;
  remaining_hours: number;
  total_hours: number;
  concluded: number | boolean;
  enrolled_at: string;
}

interface EnrolledCampus {
  campus_name: string;
  courses: EnrolledCourse[];
}

const UserContext = createContext<{
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  login: (user: User) => void;
  enrolled: EnrolledCampus[] | null;
  setEnrolled: (campi: EnrolledCampus[]) => void;
  getEnrolledCourses: () => void;
}>({
  user: null,
  setUser: () => {},
  logout: () => {},
  login: () => {},
  enrolled: null,
  setEnrolled: () => {},
  getEnrolledCourses: () => {},
});

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("function useUser must be used within UserProvider");
  }
  return context;
}

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [enrolled, setEnrolled] = useState<EnrolledCampus[] | null>(null);
  const navigate = useNavigate();

  const logout = () => {
    console.log("logout pressed");
    setUser(null);
    setEnrolled(null);
    localStorage.removeItem("user");
    localStorage.removeItem("enrolledCourses");
    navigate("/login");
    //return <Navigate to="/login" />;
  };

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/profile");
  };

  const getEnrolledCourses = async () => {
    const response = await axios.post(
      "/api/profile.php",
      {
        username: user?.username,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.status);
    if (response.data.status == "success") {
      const enrolledCoursesData = response.data.campi;
      console.log(enrolledCoursesData);
      setEnrolled(enrolledCoursesData);
      localStorage.setItem(
        "enrolledCourses",
        JSON.stringify(enrolledCoursesData)
      );
      console.log(
        `enrolled CoursesData: ${JSON.stringify(enrolledCoursesData)}`
      );
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const storedEnrolledCourses = localStorage.getItem("enrolledCourses");
    if (storedEnrolledCourses) {
      setEnrolled(JSON.parse(storedEnrolledCourses));
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        login,
        enrolled,
        setEnrolled,
        getEnrolledCourses,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
