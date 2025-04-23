import { useState } from "react";
import * as S from "./style";
import axios from "axios";

interface UserAuthState {
  username: string;
  password: string;
}

function Login() {
  const [authData, setAuthData] = useState<UserAuthState>({
    username: "",
    password: "",
  });

  const [user, setUser] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthData((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/api/auth.php", //http://localhost:5500/api/register.php
        {
          username: authData.username,
          password: authData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const userData = response.data.user;
      setUser(userData);
      console.log("Logged in:", user);
      // Optionally save to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.Container>
      <S.FormContainer onSubmit={handleSubmit}>
        <S.h2>Login</S.h2>
        <table>
          <tr>
            <th>
              <label htmlFor="">Usuário:</label>
            </th>
            <td>
              <input type="text" name="username" onChange={handleChange} />
            </td>
          </tr>
          <tr>
            <th>
              <label htmlFor="">Senha:</label>
            </th>
            <td>
              <input type="password" name="password" onChange={handleChange} />
            </td>
          </tr>
        </table>
        <S.Button type="submit" name="submit">
          Login
        </S.Button>
      </S.FormContainer>
    </S.Container>
  );
}

export default Login;
