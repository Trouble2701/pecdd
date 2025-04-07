<?php
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