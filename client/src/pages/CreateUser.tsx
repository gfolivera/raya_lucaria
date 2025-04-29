import axios from "axios";
import { useState } from "react";
import * as S from "./style";

interface UserFormState {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  repeat_password: string;
}

function CreateUser() {
  const [formData, setFormData] = useState<UserFormState>({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    repeat_password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    console.log("handler accessed.");
    e.preventDefault();
    try {
      console.log("Entering AXIOS API call...");
      const response = await axios.post(
        "/api/register.php", //http://localhost:5500/api/register.php
        {
          first_name: formData.first_name,
          last_name: formData.last_name,
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("AXIOS call finished.");
      console.log(response); // PHP api call
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.Container>
      <S.FormContainer onSubmit={handleSubmit}>
        <S.Heading2>Criar usuário</S.Heading2>
        <table cellSpacing={10}>
          <tbody>
            <tr>
              <th>
                <label htmlFor="first_name">Nome:</label>
              </th>
              <td>
                <input
                  type="text"
                  name="first_name"
                  onChange={handleChange}
                  required
                  value={formData.first_name}
                  maxLength={50}
                />
              </td>
            </tr>

            <tr>
              <th>
                {" "}
                <label htmlFor="last_name">Sobrenome:</label>
              </th>
              <td>
                {" "}
                <input
                  type="text"
                  name="last_name"
                  onChange={handleChange}
                  required
                  value={formData.last_name}
                  maxLength={50}
                />
              </td>
            </tr>

            <tr>
              <th>
                {" "}
                <label htmlFor="username">Usuário:</label>
              </th>
              <td>
                {" "}
                <input
                  type="text"
                  name="username"
                  onChange={handleChange}
                  required
                  value={formData.username}
                  maxLength={20}
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="password">Senha:</label>
              </th>
              <td>
                {" "}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={formData.password}
                  maxLength={12}
                />
              </td>
            </tr>

            <tr>
              <th>
                {" "}
                <label htmlFor="repeat_password">Confirmar senha:</label>
              </th>
              <td>
                {" "}
                <input
                  type="password"
                  name="repeat_password"
                  onChange={handleChange}
                  required
                  maxLength={12}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <S.StyledButton type="submit" name="signup_submit">
          Cadastrar
        </S.StyledButton>
      </S.FormContainer>
    </S.Container>
  );
}

export default CreateUser;
