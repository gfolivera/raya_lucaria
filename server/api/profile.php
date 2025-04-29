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
elseif($_SERVER['REQUEST_METHOD'] === 'POST'){
    $userData = json_decode(file_get_contents('php://input'));
	require_once('../database.php');
    $conn = getConnection($local = false);
    $conn->set_charset("utf8mb4");
    $stmt = $conn->prepare(
        "SELECT 
        c.id AS course_id,
        ca.name AS campus_name,
        c.name AS course_name,
        t.name AS teacher_name,
        c.category,
        c.description,
        c.spells,
        e.remaining_hours,
        c.total_hours,
        e.concluded,
        e.enrolled_at
        FROM enroll AS e
        INNER JOIN course AS c ON e.course_id = c.id
        INNER JOIN student AS s ON s.username = e.student_username
        INNER JOIN campus AS ca ON ca.id = c.campus_id
        INNER JOIN teacher AS t ON c.id = t.id
        WHERE s.username = ?"
        );
    $stmt->bind_param("s",$userData->username);
    try{
        $stmt->execute();
        $result = $stmt->get_result();
        $row = mysqli_fetch_array($result);
    $campus_name = $row["campus_name"];
    $courses = array();
    $campi = array();
    while (!empty($row)) {
        $course = array();
        //$course["campus_name"] = $row["campus_name"];
        $course["course_id"] = $row["course_id"];
        $course["course_name"] = $row["course_name"];
        $course["teacher_name"] = $row["teacher_name"];
        $course["category"] = $row["category"];
        $course["description"] = $row["description"];
        $course["spells"] = $row["spells"];
        $course["remaining_hours"] = $row["remaining_hours"];
        $course["total_hours"] = $row["total_hours"];
        $course["concluded"] = $row["concluded"];
        $course["enrolled_at"] = $row["enrolled_at"];
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
        'status'   => "success",
        'campi' => $campi
    );
    
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }catch(Exception $e){
        http_response_code(401);
        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()
        ]);
    }
}

?>