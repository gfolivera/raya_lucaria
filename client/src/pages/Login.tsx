import { useEffect, useState } from "react";
import * as S from "./style";
import axios from "axios";
import { useUser } from "../components/UserContext";

interface UserAuthState {
  username: string;
  password: string;
}

function Login() {
  const [authData, setAuthData] = useState<UserAuthState>({
    username: "",
    password: "",
  });

  const { user, login, getEnrolledCourses } = useUser();

  const [showHello, setShowHello] = useState(true);
  const [showError, setShowError] = useState(false);
  const placeholder = "Visitor";

  useEffect(() => {
    setShowHello(!showHello);
    getEnrolledCourses();
  }, [user?.first_name]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAuthData((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
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
      if (response.data.status == "success") {
        const userData = response.data.user;
        console.log("Logged in:", userData.first_name);
        login(userData);
      } else {
        setShowError(true);
      }

      // Optionally save to localStorage - moved to UserContext
      //      localStorage.setItem("user", JSON.stringify(userData));
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
              Hello, {user?.first_name != "" ? user?.first_name : placeholder}!
            </S.Heading2>
          </div>
        ) : null}
        {showError ? <p>Usuário ou Senha incorretos.</p> : null}
      </S.FormContainer>
    </S.Container>
  );
}

export default Login;
