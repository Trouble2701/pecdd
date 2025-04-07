<?php
require('db.php');
header('Content-Type: application/json');

// Zuerst den POST-Daten empfangen
$data = json_decode(file_get_contents("php://input"), true);

// Versuchen, die Daten in die Datenbank einzufügen
$stmt = $conn->prepare("INSERT INTO users (first_name, last_name, nickname, email, password) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $data['first_name'], $data['last_name'], $data['nickname'], $data['email'], $data['password']);
$stmt->execute();

// Antwort zurück an den Client
if ($stmt->affected_rows > 0) {
    // Erfolgreich gespeichert
    echo json_encode([
        'success' => true, 
        'message' => 'Daten gespeichert',
        'ID' => $stmt->insert_id
    ]);
} else {
    // Fehler beim Speichern
    echo json_encode([
        'success' => false, 
        'error' => 'Fehlermeldung'
    ]);
}

$stmt->close();
?>
