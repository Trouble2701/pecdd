<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require('db.php');

if ($method === "GET") {
    $result = $conn->query("SELECT * FROM users");

    if (!$result) {
        die(json_encode(["error" => "Fehler bei der SQL-Abfrage: " . $conn->error]));
    }

    $users = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($users);
}

$conn->close();
?>