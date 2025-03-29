<?php
require('db.php');

if($method === "GET"){
    $result = $conn->query("SELECT * FROM users");
    $users = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($users);
}
?>