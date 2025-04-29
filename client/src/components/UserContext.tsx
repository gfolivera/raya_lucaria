import { createContext, useState, useContext, useEffect } from "react";

interface User {
  first_name: string;
  last_name: string;
  username: string;
}

const UserContext = createContext<{
  user: User | null;
  setUser: (user: User) => void;
}>({ user: null, setUser: () => {} });

export const useUser = () => useContext(UserContext);

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
