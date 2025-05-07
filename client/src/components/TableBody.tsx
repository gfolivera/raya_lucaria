import { useEffect, useState } from "react";
import StudySelect from "./StudySelect";
import axios from "axios";
import { useUser } from "./UserContext";

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

interface studyTime {
  course: Course;
  study_time: string;
}

interface Props {
  courses: Course[];
  campus_name: string;
  onReload: () => void;
}

function TableBody({ courses, campus_name, onReload }: Props) {
  const { user } = useUser();
  console.log("TableBody rendered!");
  const [selectedStudyTime, setSelectedStudyTime] = useState<studyTime[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<number>(0);

  useEffect(() => {
    const values = courses.map((thisCourse) => ({
      course: thisCourse,
      study_time: "0",
    }));
    setSelectedStudyTime(values);
  }, [courses]);

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const select = e.target;
    const id = Number(select.id); //select.children[select.selectedIndex].id;
    setSelectedCourse(id);
    e.preventDefault();
    setSelectedStudyTime((previousData) =>
      previousData.map((item) =>
        item.course.course_id == id
          ? {
              ...item,
              study_time: select.value,
            }
          : item
      )
    );

    console.log("value changed. id: ", id);
  }

  async function handleStudy(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const courseId = Number(event.currentTarget.name);
    const elapsedHours = selectedStudyTime.find(
      (t) => t.course.course_id === courseId
    )?.study_time;
    console.log(`elapsed_hours:${elapsedHours},\n
                 username: ${user?.username},\n
                 course_id: ${courseId}`);
    try {
      const result = await axios.post(
        "/api/study.php",
        {
          username: user?.username,
          course_id: courseId,
          elapsed_hours: Number(elapsedHours),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(`response: ${JSON.stringify(result)}`);
      if (result.data.status === "success") {
        console.log(result.data.message);
        onReload();
      } else {
        console.error(result.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const settedTime = selectedStudyTime.find(
      (t) => t.course.course_id == selectedCourse
    );
    console.log(settedTime?.study_time);
  }, [selectedStudyTime]);

  return (
    <>
      {selectedStudyTime.map((thisCourse) => (
        <tr>
          <td>{campus_name}</td>
          <td>{thisCourse.course.course_name}</td>
          <td>{thisCourse.course.category}</td>
          <td>{thisCourse.course.teacher_name}</td>
          <td>{thisCourse.course.remaining_hours}</td>
          <td>{thisCourse.course.total_hours}</td>
          <td>{thisCourse.course.concluded}</td>
          <td>{thisCourse.course.enrolled_at}</td>
          <StudySelect
            study_hours={thisCourse.study_time}
            id={String(thisCourse.course.course_id)}
            handleChange={handleChange}
            handleStudySubmit={handleStudy}
          ></StudySelect>
        </tr>
      ))}
    </>
  );
}

export default TableBody;
