import * as S from "./style";

import { useUser } from "../components/UserContext";
import { useEffect } from "react";
import TableBody from "../components/TableBody";
import TableHeading from "../components/TableHeading";

function Profile() {
  const { user, enrolled, getEnrolledCourses } = useUser();

  useEffect(() => {}, []);

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
                {enrolled?.map((campus) => (
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
