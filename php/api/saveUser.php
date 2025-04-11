<?php
require('db.php');
header('Content-Type: application/json');

// POST-Daten empfangen
$data = json_decode(file_get_contents("php://input"), true);

// Feste Werte in Variablen speichern
$status = '1';
$crew_status = '1';
$activate = '0';
$block = '0';

$passwortHash = password_hash($data['password'], PASSWORD_DEFAULT);
// Prepare & Bind
$stmt = $conn->prepare("INSERT INTO users (first_name, last_name, nickname, email, birthday, gender, password, regist_date, status, crew_status, activate, block) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
$stmt->bind_param(
    "ssssssssssss", 
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
    $block
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