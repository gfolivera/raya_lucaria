<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// mostrar erros
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

//  Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
elseif($_SERVER['REQUEST_METHOD'] === 'POST'){
	$userData = json_decode(file_get_contents('php://input'));
	require_once('../database.php');
	$conn = getConnection($local = false);
    $stmt = $conn->prepare("SELECT username, first_name, last_name , password
                            FROM student 
                            WHERE username = ?"
                            );
    $stmt->bind_param("s",$userData->username);
    try{
    $stmt->execute();
    $result = $stmt->get_result();
    if ($user = $result->fetch_assoc()) {
        if (password_verify($userData->password, $user['password'])) {
            // Send back user data 
            echo json_encode([
                "status" => "success",
                "user" => [
                    "username" => $user["username"],
                    "first_name" => $user["first_name"],
                    "last_name" => $user["last_name"],
                ]
            ]);
            exit();
        }
    }
    http_response_code(401);
    echo json_encode([
            "status" => "error",
            "message" => "Usuário e/ou senha incorretos."]);
    }catch(Exception $e){
        http_response_code(401);
    echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()]);
    }
    }

?>