<?php

// Pfad zur PHPMailer-Bibliothek anpassen (an den richtigen Speicherort auf Ihrem Webspace anpassen)
require 'PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/src/SMTP.php';
require 'PHPMailer-master/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        exit;
        case("POST"): //Send the email;
            try {
            header("Access-Control-Allow-Origin: *");
            // Payload is not send to $_POST Variable,
            // is send to php:input as a text
            $json = file_get_contents('php://input');
            //parse the Payload from text format to Object
            $params = json_decode($json);
    
            $email = $params->email;
            $firstname = $params->firstname;
            $lastname = $params->lastname;
            $user = $params->user;
            $contact = $params->contact;
            $start = $params->start;
            $allEmails = $params->allEmails;

            $name = $firstname . " " . $lastname;
    
            $mail = new PHPMailer(true);

            // SMTP-Konfiguration
            require 'PHPMailer-master/src/userdata.php';

            // Absender und Empfänger
            $mail->setFrom('contact@paintball-evolution-crew.de', "$name über die $contact Seite");
 
            // Führe die Schleife für alle Adressen in $allMails aus
            foreach ($allEmails as $emailString) {
    
                // 1. Trenne den String am Komma: "email, Name" -> [0] = "email", [1] = " Name"
                // Begrenze auf 2 Teile, falls im Namen ein Komma vorkommt.
                $parts = explode(',', $emailString, 2); 
    
                // 2. Prüfe, ob das Array valide ist (muss mindestens 1 Teil haben)
                if (count($parts) < 1) {
                    continue; // Überspringe diesen fehlerhaften Eintrag
                }
    
                // 3. E-Mail-Adresse und Name extrahieren und unnötige Leerzeichen entfernen (trim)
                $emailAddress = trim($parts[0]);
    
                // Wenn ein Name vorhanden ist, diesen auch trimmen, sonst leer lassen
                $recipientName = (isset($parts[1])) ? trim($parts[1]) : ''; 
    
                // 4. Füge die Adresse zu PHPMailer hinzu
                $mail->addAddress($emailAddress, $recipientName);
            }

            // E-Mail-Inhalt
            $mail->isHTML(true);
            $mail->Subject = "$name möchte $start $contact";
            // Der korrigierte Body-String:
            $mail->Body    = "Name: " . $firstname . " " . $lastname . "<br>Email: " . $email . "<br>Mitglied: " . $user . "<br><br>fordert einen RegCode an";
            $mail->AltBody = "Name: " . $firstname . " " . $lastname . "<br>Email: " . $email . "<br>Mitglied: " . $user . "<br><br>fordert einen RegCode an";

            // E-Mail senden
            $mail->send();
            } catch (Exception $e) {
                echo '<div>Nachricht konnte nicht gesendet werden. Fehler: '+$mail->ErrorInfo+'</div>';
            }
            break;
            default: //Reject any non POST or OPTIONS requests.
            header("Allow: POST", true, 405);
            exit;
    }
?>