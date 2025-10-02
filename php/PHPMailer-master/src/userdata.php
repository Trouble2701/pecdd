<?
$mail->isSMTP();
$mail->Host = 'w01f86a5.kasserver.com';           // SMTP-Server (z.B. smtp.gmail.com)
$mail->SMTPAuth = true;                     // SMTP-Authentifizierung aktivieren
$mail->Username = 'm079fc02';  // SMTP-Benutzername
$mail->Password = 'HeavyMetal88!';           // SMTP-Passwort
$mail->SMTPSecure = 'tls';                  // Verschlüsselung: 'ssl' oder 'tls'
$mail->Port = 587;                          // SMTP-Port (587 für TLS oder 465 für SSL)
$mail->CharSet = "UTF-8";
$mail->FromName = mb_convert_encoding($header, "UTF-8", "auto");
?>