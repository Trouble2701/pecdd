<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require('db.php');

if ($method === "GET") {
    $result = $conn->query("SELECT text FROM datenschutz WHERE ID = 1");

    if (!$result) {
        die(json_encode(["error" => "Fehler bei der SQL-Abfrage: " . $conn->error]));
    }

    $dstext = $result->fetch_all(MYSQLI_ASSOC);
    if($dstext === null){
        die(json_encode(["error" => "fetch_all gab Null zurück"]));
    }

    echo json_encode($dstext, JSON_UNESCAPED_UNICODE);
}

$conn->close();
?>