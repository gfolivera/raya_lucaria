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
      <div>
        <div>
          <S.ProfileContainer>
            <div>
              <S.Heading1>{`${
                user?.first_name ? user?.first_name : "Eleonora"
              } ${user?.last_name ? user?.last_name : "Fonseca"}`}</S.Heading1>
            </div>
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
