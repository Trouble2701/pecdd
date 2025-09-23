<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
error_reporting(E_ALL);
define ( 'MYSQL_HOST',      'localhost' );
define ( 'MYSQL_BENUTZER',  'benutzer' );
define ( 'MYSQL_KENNWORT',  'passwort' );
define ( 'MYSQL_DATENBANK', 'datenbankname' );
?>