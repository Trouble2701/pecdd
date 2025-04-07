<?php
require('db.php');

if ($method === "GET") {
    $result = $conn->query("SELECT * FROM areas");

    if (!$result) {
        die(json_encode(["error" => "Fehler bei der SQL-Abfrage: " . $conn->error]));
    }

    $areas = $result->fetch_all(MYSQLI_ASSOC);
    if($areas === null){
        die(json_encode(["error" => "fetch_all gab Null zurück"]));
    }

    echo json_encode($areas, JSON_UNESCAPED_UNICODE);
}

$conn->close();
?>