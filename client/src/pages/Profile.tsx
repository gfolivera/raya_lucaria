import * as S from "./style";

import { useUser } from "../components/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";
import TableBody from "../components/TableBody";
import TableHeading from "../components/TableHeading";

interface Course {
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

interface Campus {
  campus_name: string;
  courses: Course[];
}

function Profile() {
  const { user } = useUser();
  const [campi, setCampi] = useState<Campus[]>([]);

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
      setCampi(response.data.campi);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
  }, []);

  return (
    <>
      <S.Heading2>Perfil</S.Heading2>
      <div>
        <div>
          <S.Heading2>{`${user?.first_name} ${user?.last_name}`}</S.Heading2>
        </div>
        <div>
          <S.ProfileContainer>
            <S.Heading2>Cursos</S.Heading2>
            <S.Table>
              <tbody>
                <TableHeading />
                {campi.map((campus) => (
                  <TableBody
                    courses={campus.courses}
                    campus_name={campus.campus_name}
                    onReload={getEnrolledCourses}
                  ></TableBody>
                ))}
              </tbody>
            </S.Table>
          </S.ProfileContainer>
        </div>
      </div>
    </>
  );
}

export default Profile;
