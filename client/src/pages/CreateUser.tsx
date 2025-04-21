import axios from "axios";
import { useState } from "react";

interface UserFormState {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

function CreateUser() {
  const [formData, setFormData] = useState<UserFormState>({
    first_name: "",
    last_name: "",
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((previousData) => ({ ...previousData, [name]: value }));
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://rayalucaria.free.nf/register.php"
      );
      console.log(response); // PHP api call
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="CreateUser">
      <h2>Create User</h2>
      <form onSubmit={handleSubmit}>
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
            <tr>
              <td>
                <input type="submit" name="submit" />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
}

export default CreateUser;
