<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
</head>
<body>
    <form action="register.php" method="post">
        <label for="first_name">*First Name:</label>
        <input type="text" name="first_name" id="first_name"><br>
        <label for="last_name">*Last Name:</label>
        <input type="text" name="last_name" id="last_name"><br>
        <label for="username">*Username:</label>
        <input type="text" name="username" id="username"><br>
        <label for="password">*Password:</label>
        <input type="password" name="password" id="password"><br>
        <label for="repeat_password">*Repeat Password:</label>
        <input type="password" name="repeat_password" id="repeat_password"><br>
		  <p style="font-size: .5em"><i>*: Mandatory</i></p>
        <input type="submit" value="Register" name="register">
    </form>
</body>
</html>

<?php

if(isset($_POST["register"]))
{
	require_once 'database.php';
	$first_name = $_POST["first_name"];
	$last_name = $_POST["last_name"];
	$username = $_POST["username"];
	$password = $_POST["password"];
	$repeat_password = $_POST["repeat_password"];

    //check empty fields
    if(empty($first_name) ||
	 	empty($last_name) ||
	 	empty($username) ||
	 	empty($password) ||
	 	empty($repeat_password))
	 {
		echo "You must enter every field of the form." . PHP_EOL;
	 }
    // check password
	 elseif(strcmp($password,$repeat_password)!= 0){
		echo "You must enter every field of the form." . PHP_EOL;
	 }
	 //check username
	 else{
		$conn = getConnection($local = true);
		$query = "SELECT username FROM student WHERE username = '{$username}'";
		$result = mysqli_query($conn, $query);
		if(mysqli_num_rows($result) > 0){
			echo "username already taken.";
		}
		//insert into table
		else{ 
			$query = "INSERT INTO student
							(first_name, last_name, username, password, created_at)
						VALUES
							('{$first_name}','{$last_name}','{$username}','{$password}', NOW())";
			try{
					$result = mysqli_query($conn, $query);
			}catch(Exception $e){
				echo $e->getMessage();
			}
		}
		mysqli_close($conn);

		//INSERT INTO `student`(`first_name`, `last_name`, `username`, `password`, `created_at`) VALUES ([value-1],[value-2],[value-3],[value-4],[value-5])
	 }

}
?>