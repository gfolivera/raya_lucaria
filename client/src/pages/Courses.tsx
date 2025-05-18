import * as S from "./style";
//import Sidebar from "../components/Sidebar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
//import SidebarElement from "../components/SidebarElement";
import { useUser } from "../components/UserContext";
import MessageScreen from "../components/MessageScreen";

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

interface showMsg {
  message: string;
  type: "success" | "error" | "inform";
}

function Courses() {
  const { user, enrolled, getEnrolledCourses } = useUser();
  const [campi, setCampi] = useState<Campus[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [enrollButtonState, setEnrollButtonState] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [showMsg, setShowMsg] = useState<showMsg>({
    message: "theEndlessSporadicLifeCycle",
    type: "inform",
  });

  const successMsg: showMsg = {
    message: "Matriculado com sucesso.",
    type: "success",
  };

  const errorMsg: showMsg = {
    message: "error fetching request",
    type: "error",
  };

  const informMsg: showMsg = {
    message: "Já matriculado no curso",
    type: "inform",
  };

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

  function toggleDialog() {
    if (!dialogRef) {
      return;
    }
    dialogRef.current?.hasAttribute("open")
      ? dialogRef.current.close()
      : dialogRef.current?.showModal();
    console.log(JSON.stringify(showMsg));
  }

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  useEffect(() => {
    toggleDialog();
  }, [showMsg]);

  const handleEnroll = async (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const check = enrolled?.find((campi) =>
      campi.courses.find(
        (enrolledCourse) =>
          enrolledCourse.course_id === selectedCourse?.course_id
      )
    );
    if (check) {
      setShowMsg(informMsg);
    } else {
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
      const status = response.data.status;
      switch (status) {
        case "success":
          setShowMsg(successMsg);
          getEnrolledCourses();
          break;
        case "error":
          setShowMsg(errorMsg);
          console.log(response.data.message);
          break;
      }
    }
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
            <MessageScreen
              message={showMsg.message}
              type={showMsg.type}
              ref={dialogRef}
              toglleDialog={toggleDialog}
            />
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
