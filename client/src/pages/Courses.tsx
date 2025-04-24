import * as S from "./style";
import Sidebar from "../components/Sidebar";

function Courses() {
  return (
    <S.Container>
      <Sidebar />
      <S.CourseContainer>
        <S.h2>Cursos</S.h2>
        <S.CourseDescription>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores
            dicta pariatur dolorem consequatur praesentium mollitia, suscipit
            illum, natus sint adipisci facilis recusandae nisi quisquam,
            quibusdam minus deleniti maxime distinctio fugiat.
          </p>
        </S.CourseDescription>
      </S.CourseContainer>
    </S.Container>
  );
}

export default Courses;
