<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

//  Handle preflight (OPTIONS) requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
elseif($_SERVER['REQUEST_METHOD'] === 'POST'){
	$userData = json_decode(file_get_contents('php://input'));
	require_once('../database.php');

	$conn = getConnection($local = false);
		$stmt = $conn->prepare("SELECT username FROM student WHERE username = ?");
		$stmt->bind_param("s",$userData->username);
		$stmt->execute();
		$result = $stmt->get_result();
		if(mysqli_num_rows($result) > 0){
			echo "username already taken.";
		}
		//insert into table
		else{ 
			$hash_password = password_hash($userData->password, PASSWORD_BCRYPT);
			$stmt = $conn->prepare("INSERT INTO student
							(first_name, last_name, username, password, created_at)
						VALUES
							(?,?,?,?, NOW())");
			try{
				$stmt->bind_param("ssss",
					$userData->first_name,
					$userData->last_name,
					$userData->username,
					$hash_password);
				$stmt->execute();
				echo json_encode([
					"status" => "success"
					]
				);
				exit();
			}catch(Exception $e){
				http_response_code(401);
    echo json_encode([
            "status" => "error",
            "message" => $e->getMessage()]);
			}
		}
		mysqli_close($conn);

};

?>