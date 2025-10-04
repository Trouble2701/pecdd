<?php
// Setze die notwendigen CORS-Header
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json; charset=UTF-8');

require('db.php'); 

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(["success" => false, "message" => "Methode nicht erlaubt."]));
}

// 1. JSON-Daten empfangen
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// 2. Sicherheitsprüfung
if (!isset($data['username']) || !isset($data['password'])) {
    http_response_code(400); // Bad Request
    die(json_encode(["success" => false, "message" => "Login-Name oder Passwort fehlen."]));
}

$username = $data['username'];
$password = $data['password'];

$response = ["success" => false, "message" => "Ungültiger Login-Name oder falsches Passwort."];
//$http_code = 401; // Standard-Fehlercode

// 3. Datenbankabfrage vorbereiten
// KORREKTUR: Das Datenbankfeld 'token' wird zur Abfrage hinzugefügt.
$stmt = $conn->prepare("SELECT ID, password, token FROM users WHERE nickname = ?");

if ($stmt === false) {
    $http_code = 500;
    $response = ["success" => false, "message" => "Datenbankfehler (Prepare): " . $conn->error];
} else {
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    // 4. Ergebnis prüfen
    if ($stmt->num_rows === 1) {
        
        // KORREKTUR: Ein drittes Ergebnis für den Token binden
        $stmt->bind_result($user_id, $hashed_password, $db_token);
        $stmt->fetch();

        // 5. Passwort verifizieren
        if (password_verify($password, $hashed_password)) {
            
            // LOGIN ERFOLGREICH! Antwort mit dem Token aus der Datenbank setzen
            $http_code = 200;
            $response = [
                "success" => true,
                "message" => "Login erfolgreich!",
                "token" => $db_token 
            ];
            
        } else {
            $response = [
                "success" => false,
                "message" => "Login fehlgeschlagen!"
            ];
        }
    } else {
            $response = [
                "success" => false,
                "message" => "Login fehlgeschlagen!"
            ];
    }
    $stmt->close();
}

$conn->close();

// Setze den ermittelten HTTP-Statuscode und sende die finale JSON-Antwort
http_response_code($http_code);
echo json_encode($response);
?>