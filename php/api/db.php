<?php
header("Content-Type: application/json");
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once('config.php');

// Verbindung zur Datenbank

$conn = new mysqli(MYSQL_HOST, MYSQL_BENUTZER, MYSQL_KENNWORT, MYSQL_DATENBANK);

if ($conn->connect_error) {
    die(json_encode(["error" => "Verbindung fehlgeschlagen"]));
}

$conn->set_charset("utf8mb4");
$method = $_SERVER['REQUEST_METHOD'];
?>