<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
require('db.php');
header('Content-Type: application/json');

// Stellen Sie sicher, dass der Request-Typ POST ist
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    die(json_encode(['success' => false, 'error' => 'Methode nicht erlaubt']));
}

// POST-Daten empfangen und als assoziatives Array dekodieren
$data = json_decode(file_get_contents("php://input"), true);

// Sicherheitsprüfung, ob die benötigten Felder existieren
if (!isset($data['password']) || !isset($data['token'])) {
    http_response_code(400); // Bad Request
    die(json_encode(['success' => false, 'error' => 'Passwort oder Token fehlen im Request-Body.']));
}

$passwortHash = password_hash($data['password'], PASSWORD_DEFAULT);
$token = $data['token']; // Token wird nun separat gespeichert

// KORRIGIERTE SQL-SYNTAX mit ZWEI Platzhaltern (?) für Prepared Statements
$stmt = $conn->prepare("UPDATE users SET password = ? WHERE token = ?");

// Prepare & Bind (Zwei Parameter: 'ss' steht für zwei Strings)
// Die Reihenfolge muss zur Platzhalter-Reihenfolge im Statement passen.
if ($stmt === false) {
    // Fehler bei der Vorbereitung abfangen (z.B. falsche SQL-Syntax)
    http_response_code(500);
    die(json_encode(['success' => false, 'error' => 'Prepare-Fehler: ' . $conn->error]));
}

$stmt->bind_param(
    "ss", 
    $passwortHash, 
    $token 
);

// Execute & Response
if ($stmt->execute()) {
    // Bei UPDATE ist affected_rows der korrekte Wert
    $affected_rows = $stmt->affected_rows;
    
    echo json_encode([
        'success' => true,
        'message' => "Passwort erfolgreich geändert. Betroffene Zeilen: " . $affected_rows,
        'affected_rows' => $affected_rows
    ]);
} else {
    // Datenbankfehler zurückgeben
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Execute-Fehler: ' . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>