<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require('db.php');

$data = json_decode(file_get_contents("php://input"), true);
$token_to_check = $data['checkToken'];

$sql = "SELECT COUNT(*) AS count FROM users WHERE token = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $token_to_check);
$stmt->execute();
$result = $stmt->get_result();
$row = $result->fetch_assoc();

if ($row['count'] > 0) {
    echo json_encode(["exists" => true, "message" => 'Token existiert: '.$token_to_check]);
} else {
    echo json_encode(["exists" => false, "message" => 'Token existiert Nicht: '.$token_to_check]);
}

$stmt->close();
$conn->close();
?>