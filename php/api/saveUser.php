<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require('db.php');
header('Content-Type: application/json');

// POST-Daten empfangen
$data = json_decode(file_get_contents("php://input"), true);

// Feste Werte in Variablen speichern
$status = '1';
$crew_status = '1';
$activate = '1';
$block = '0';

$passwortHash = password_hash($data['password'], PASSWORD_DEFAULT);
// Prepare & Bind
$stmt = $conn->prepare("INSERT INTO users (first_name, last_name, nickname, email, birthday, gender, password, regist_date, status, crew_status, activate, block, token) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param(
    "sssssssssssss", 
    $data['first_name'], 
    $data['last_name'], 
    $data['nickname'], 
    $data['email'], 
    $data['birthday'], 
    $data['gender'], 
    $passwortHash, 
    $data['regdate'],
    $status, 
    $crew_status, 
    $activate, 
    $block,
    $data['token']
);

// Execute & Response
if ($stmt->execute()) {
    echo json_encode([
        'success' => true,
        'message' => 'Daten gespeichert',
        'ID' => $stmt->insert_id
    ]);
} else {
    echo json_encode([
        'success' => false,
        'error' => $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>