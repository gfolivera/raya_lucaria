<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
elseif($_SERVER['REQUEST_METHOD'] === 'GET'){
	require_once('../database.php');
    $conn = getConnection($local = false);
    $conn->set_charset("utf8mb4");
    $stmt = $conn->prepare(
                "SELECT 
                campus.name as campus_name,
                course.name as course_name,
                teacher.name as teacher_name,
                course.category,
                course.description as description,
                course.total_hours,
                course.spells
                FROM course
                INNER JOIN campus ON
                course.campus_id = campus.id
                INNER JOIN teacher ON
                course.teacher_id = teacher.id
                ORDER BY campus.name ASC
                ");
    $stmt->execute();
    $result = $stmt->get_result();
    $row = mysqli_fetch_array($result);
    $campus_name = $row["campus_name"];
    $courses = array();
    $campi = array();
    while (!empty($row)) {
        $course = array();
        //$course["campus_name"] = $row["campus_name"];
        $course["course_name"] = $row["course_name"];
        $course["teacher_name"] = $row["teacher_name"];
        $course["category"] = $row["category"];
        $course["description"] = $row["description"];
        $course["spells"] = $row["spells"];
        $course["total_hours"] = $row["total_hours"];
        $courses[] = $course;
        $row = mysqli_fetch_array($result);
        if(!empty($row)){
            if(strcmp($campus_name, $row["campus_name"]) != 0){
                $campi[] = array(
                    'campus_name'   => $campus_name,
                    'courses' => $courses
                );
                $campus_name = $row["campus_name"];
                $courses = array();
        }
        }else {
            $campi[] = array(
            'campus_name'   => $campus_name,
            'courses' => $courses
            );

        }
    }
    
    $data = array(
        'success'   => 1,
        'campi' => $campi
    );
    
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);  
}

?>
