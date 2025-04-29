import * as S from "./style";

import { useUser } from "../components/UserContext";
import { useEffect } from "react";
import axios from "axios";

function Profile() {
  const { user } = useUser();

  useEffect(() => {
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
        console.log(response.data.campi);
      }
    };

    getEnrolledCourses();
  }, []);

  return (
    <>
      <S.Heading2>Perfil</S.Heading2>
      <div>
        <div>
          <p>{user?.first_name}</p>
        </div>
        <div>
          <p>{user?.last_name}</p>
        </div>
      </div>
    </>
  );
}

export default Profile;
