<?php
// PHP-Fehler anzeigen, um das Debuggen zu erleichtern (später in Produktion entfernen!)
ini_set('display_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8"); // Wichtig: Sagt dem Client, dass es JSON ist!

require('db.php'); // Stelle sicher, dass $conn (deine mysqli-Verbindung) hier erstellt wird

// 1. HTTP-Methode prüfen (Der Angular-Client macht einen POST)
$method = $_SERVER['REQUEST_METHOD'];

if ($method === "POST") {

    // 2. Daten sicher empfangen und dekodieren
    $json = file_get_contents('php://input');
    $params = json_decode($json);

    // Sicherheitsprüfung: Prüfen, ob 'email' im Body vorhanden ist
    if (!isset($params->email)) {
        http_response_code(400); // Bad Request
        die(json_encode(["success" => false, "message" => "Fehlender 'email' Parameter."]));
    }
    
    $email = $params->email;

    // 3. Sichere Datenbank-Abfrage mit Prepared Statements
    $stmt = $conn->prepare("SELECT token, first_name, last_name FROM users WHERE email = ?");

    // Falls das Vorbereiten fehlschlägt
    if (!$stmt) {
        http_response_code(500);
        die(json_encode(["success" => false, "message" => "Fehler beim Vorbereiten der Abfrage: " . $conn->error]));
    }

    $stmt->bind_param("s", $email); // "s" für String (die E-Mail-Adresse)
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Token gefunden
        $row = $result->fetch_assoc();
        
        // JSON-Antwort senden
        echo json_encode(["success" => true, "token" => $row['token'], "firstname" => $row['first_name'], "lastname" => $row['last_name']]);
        
    } else {
        // E-Mail in der DB nicht gefunden
        http_response_code(404); // Not Found
        echo json_encode(["success" => false, "message" => "E-Mail nicht gefunden."]);
    }

    $stmt->close();
} else {
    // Wenn eine andere Methode als POST verwendet wird
    http_response_code(405); // Method Not Allowed
    echo json_encode(["success" => false, "message" => "Methode nicht erlaubt."]);
}

$conn->close();

// Wichtig: 'die()' oder 'exit()' am Ende stellen sicher, dass kein zusätzlicher Output gesendet wird, 
// der das JSON ungültig machen könnte.
die();
?>