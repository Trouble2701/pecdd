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
            $token = $params->token;

            $name = $firstname . " " . $lastname;

            $message = 'Du möchtest dein Passwort zurücksetzen?<br><br>
                        Hier ist dein Link zum zurücksetzen<br>
                        http://vorlage.paintball-evolution-crew.de/changepw/'.$token.'
                        <br><br>
                        Du hast das nicht angefordert, dann ignoriere diese E-Mail und gibt dem Website-Admin bescheid!<br><br>
                        Mit freundlichen Grüßen<br>Die Paintball Evolution Crew';
    
            $mail = new PHPMailer(true);

            // SMTP-Konfiguration
            require 'PHPMailer-master/src/userdata.php';

            // Absender und Empfänger
            $mail->setFrom('contact@paintball-evolution-crew.de', "Passwort zurücksetzen");
            $mail->addAddress($email, $name); // Empfänger hinzufügen

            // E-Mail-Inhalt
            $mail->isHTML(true);                        // E-Mail im HTML-Format
            $mail->Subject = "Dein Passwort zurücksetzen";
            $mail->Body    = "Hallo " . $name . ",<br><br>" . $message ;
            $mail->AltBody = "Hallo " . $name . ",<br><br>" . $message ;

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