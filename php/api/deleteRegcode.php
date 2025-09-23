<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit();
}
require('db.php');

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['regCode'])) {
    $registCode = $data['regCode'];

    // Prepared Statement für die Überprüfung
    $stmt = $conn->prepare("SELECT id, ever FROM regist_code WHERE code = ?");
    $stmt->bind_param("s", $registCode);
    
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            $codeId = $row['id'];
            $ever = $row['ever'];
            
            // Jetzt wird der Code gelöscht
            if($ever == 0){
                $deleteStmt = $conn->prepare("DELETE FROM regist_code WHERE id = ?");
                $deleteStmt->bind_param("i", $codeId);
            
                if ($deleteStmt->execute()) {
                    echo json_encode([
                        'success' => true,
                        'message' => 'Code wurde gefunden und gelöscht'
                    ]);
                } else {
                    echo json_encode([
                        'success' => false,
                        'error' => 'Fehler beim Löschen des Codes',
                        'message' => 'Fehler beim Löschen des Codes',
                    ]);
                }
                $deleteStmt->close();
            }else{
                echo json_encode([
                'success' => false,
                'error' => 'Der Code ist ein Dauercode',
                'message' => 'Der Code ist ein Dauercode'
            ]);
            }
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'Code existiert nicht',
                'message' => 'Code existiert nicht'
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'error' => $stmt->error,
            'message' => $stmt->error
        ]);
    }
    $stmt->close();
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Kein Registrierungscode übergeben',
        'message' => 'Kein Registrierungscode übergeben'
    ]);
}

$conn->close();
?>