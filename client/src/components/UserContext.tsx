import { createContext, useState, useContext, useEffect } from "react";
//import { Navigate } from "react-router-dom";

interface User {
  first_name: string;
  last_name: string;
  username: string;
}

const UserContext = createContext<{
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
  login: (user: User) => void;
}>({ user: null, setUser: () => {}, logout: () => {}, login: () => {} });

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

  const logout = () => {
    console.log("logout pressed");
    setUser(null);
    localStorage.removeItem("user");
    //return <Navigate to="/login" />;
  };

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, logout, login }}>
      {children}
    </UserContext.Provider>
  );
}
