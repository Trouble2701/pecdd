<?php
require('db.php');

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['nickname'])) {
    $nickname = $data['nickname'];

    // Prepared Statement
    $stmt = $conn->prepare("SELECT id, nickname FROM users WHERE nickname = ?");
    $stmt->bind_param("s", $nickname);
    
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            echo json_encode([
                'success' => true,
                'message' => 'Nickname bereits vergeben',
                'ID' => $row['id']
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Nickname ist verfügbar'
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