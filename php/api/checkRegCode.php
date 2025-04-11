<?php
require('db.php');

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['regCode'])) {
    $registCode = $data['regCode'];

    // Prepared Statement
    $stmt = $conn->prepare("SELECT id, code FROM regist_code WHERE code = ?");
    $stmt->bind_param("s", $registCode);
    
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            echo json_encode([
                'success' => true,
                'message' => 'Code Existiert',
                'ID' => $row['id']
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Code Existiert nicht'
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