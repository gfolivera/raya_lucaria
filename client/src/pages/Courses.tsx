import * as S from "./style";
//import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import axios from "axios";
//import SidebarElement from "../components/SidebarElement";
import { useUser } from "../components/UserContext";

interface Course {
  course_id: number;
  course_name: string;
  teacher_name: string;
  category: string;
  description: string;
  spells: string;
  total_hours: number;
}

interface Campus {
  campus_name: string;
  courses: Course[];
}

function Courses() {
  const { user } = useUser();
  const [campi, setCampi] = useState<Campus[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrollButtonState, setEnrollButtonState] = useState(false);

  // API CALL
  useEffect(() => {
    console.log("entered API");
    const fetchCampi = async () => {
      try {
        const response = await axios.get("/api/courses.php");
        if (response.data.success) {
          setCampi(response.data.campi);
        } else {
          console.error(
            "Error fetching courses. response.data doesn't contain success."
          );
        }
      } catch (error) {
        console.error("Error fetching courses", error);
      }
    };

    fetchCampi();

    if (user) {
      setEnrollButtonState(true);
    }
  }, []);

  useEffect(() => {
    user ? setEnrollButtonState(true) : setEnrollButtonState(false);
  }, [user]);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  const handleEnroll = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const response = await axios.post(
      "/api/courses.php",
      {
        username: user?.username,
        course_id: selectedCourse?.course_id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.status);
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar with campuses and courses */}
      <div
        style={{
          width: "300px",
          borderRight: "1px solid gray",
          padding: "1rem",
        }}
      >
        <h2>Campi</h2>
        {campi.map((campus, campusIndex) => (
          <div key={campusIndex}>
            <h3>{campus.campus_name}</h3>
            <ul>
              {campus.courses.map((course, courseIndex) => (
                <li
                  key={courseIndex}
                  style={{ cursor: "pointer", marginBottom: "0.5rem" }}
                  onClick={() => handleCourseClick(course)}
                >
                  {course.course_name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Course Details */}
      <div style={{ flexGrow: 1, padding: "1rem" }}>
        {selectedCourse ? (
          <div>
            <h2>{selectedCourse.course_name}</h2>
            <p>
              <strong>Professor:</strong> {selectedCourse.teacher_name}
            </p>
            <p>
              <strong>Categoria:</strong> {selectedCourse.category}
            </p>
            <p>
              <strong>Descrição:</strong> {selectedCourse.description}
            </p>
            <p>
              <strong>Feitiços:</strong> {selectedCourse.spells}
            </p>
            <p>
              <strong>Carga Horária:</strong> {selectedCourse.total_hours} horas
            </p>
            {enrollButtonState ? (
              <S.StyledButton
                onClick={(event) => {
                  handleEnroll(event);
                }}
              >
                Inscrever-se
              </S.StyledButton>
            ) : null}
          </div>
        ) : (
          <p>Selecione um curso para ver os detalhes.</p>
        )}
      </div>
    </div>
  );
}
export default Courses;

/**
 * 
  <S.Container>
      <S.SidebarContainer>

      {courses.map((course) => (
        <SidebarElement
          key={place.name}
          name={place.name}
          curriculum={place.curriculum}
          onSelectCourse={handleSelectCourse}
        />
      ))}
    </S.SidebarContainer>
      <S.CourseContainer>
        <S.h2>Cursos</S.h2>
        <S.CourseDescription>
          <p>{selectedDescription}</p>
        </S.CourseDescription>
      </S.CourseContainer>
    </S.Container>
 * 
 * 
 */
