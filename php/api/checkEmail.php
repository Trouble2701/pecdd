<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require('db.php');

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['email'])) {
    $email = $data['email'];

    // Prepared Statement
    $stmt = $conn->prepare("SELECT id, email FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            echo json_encode([
                'success' => true,
                'message' => 'E-Mail bereits vergeben',
                'ID' => $row['id']
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'E-Mail ist verfügbar'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'error' => $stmt->error
        ]);
    }

    $stmt->close();
}

$conn->close();
?>