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
    $elapsed_hours = $userData['elapsed_hours'];
    $username = $userData['username'];
    $course_id = $userData['course_id'];
    try{
        $stmt = $conn->prepare("UPDATE
                enroll e
                SET e.remaining_hours = 
                CASE
                    WHEN e.remaining_hours > ? THEN
                        e.remaining_hours - ?
                    WHEN e.remaining_hours <= ? THEN
                        0
                END,
                e.concluded = 
                    CASE
                    WHEN e.remaining_hours > 0 THEN
                        false
                    ELSE true
                    END
                WHERE
                    e.course_id = ? AND e.student_username = ?
        ");
        $stmt->bind_param('iiiis',  $elapsed_hours,
                                    $elapsed_hours,
                                    $elapsed_hours,
                                    $course_id,
                                    $username);
        $result = $stmt->execute();
        if($result){

            echo json_encode([
                "status" => "success",
                "message" => `{$elapsed_hours} hours elapsed.`
            ]);
            $conn->close();
            exit();
        }
    }catch(Exception $e){
        echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()
        ]);
        $conn->close();
        exit();
    }
}

?>