<?php

function getConnection(bool $local): mysqli
{
    $local ? require_once('local_access.php') : require_once('access.php');
    $conn = new mysqli(hostname:$hostname,username: $username,password: $password,database: $db,port: $port);
    
    if (!$conn)
    {
        throw new Exception("Connection failed: {$e->getMessage()}");
    }
    //echo var_dump($conn);
    return $conn;
}


?>