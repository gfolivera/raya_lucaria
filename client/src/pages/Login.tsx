import { useEffect, useState } from "react";
import * as S from "./style";
import axios from "axios";

interface UserAuthState {
  username: string;
  password: string;
}

interface UserLoggedState {
  logged_username: string;
  first_name: string;
  last_name: string;
}

function Login() {
  const [authData, setAuthData] = useState<UserAuthState>({
    username: "",
    password: "",
  });

  const [user, setUser] = useState<UserLoggedState>({
    logged_username: "",
    first_name: "",
    last_name: "",
  });

  const [showHello, setShowHello] = useState(false);
  const placeholder = "Visitor";
  useEffect(() => {
    setShowHello(!showHello);
  }, [user.first_name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthData((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    console.log(authData);
    event.preventDefault();
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
      console.log("full response: ", response);
      const userData = response.data.user;
      console.log("userData: ", userData);
      setUser({
        logged_username: userData.username,
        first_name: userData.first_name,
        last_name: userData.last_name,
      });
      console.log("Logged in:", userData.first_name);
      // Optionally save to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
    } catch (error: any) {
      console.log(error.response.data);
    }
  };

  return (
    <S.Container>
      <S.FormContainer onSubmit={handleSubmit}>
        <S.Heading2>Login</S.Heading2>
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
        <S.StyledButton type="submit" name="submit">
          Login
        </S.StyledButton>
        {showHello ? (
          <div id="hello">
            <S.Heading2>
              Hello, {user.first_name != "" ? user.first_name : placeholder}!
            </S.Heading2>
          </div>
        ) : (
          <S.Greet id="hello">
            <S.Heading2>Hello, {user.first_name}!</S.Heading2>
          </S.Greet>
        )}
      </S.FormContainer>
    </S.Container>
  );
}

export default Login;
