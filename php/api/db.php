<?php
require_once('config.php');

header("Content-Type: application/json");

// Verbindung zur Datenbank

$conn = new mysqli(MYSQL_HOST, MYSQL_BENUTZER, MYSQL_KENNWORT, MYSQL_DATENBANK);

if ($conn->connect_error) {
    die(json_encode(["error" => "Verbindung fehlgeschlagen"]));
}

$method = $_SERVER['REQUEST_METHOD'];
?>