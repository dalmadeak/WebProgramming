<?php
    session_start();
    require_once('adatkezeles.php');
    require_once('site_lista.php');
    require_once('site_reszletek.php');

    $idopontok =  json_decode(file_get_contents('idopontok.json'));

    $_SESSION['search'] = false;
    
    header('Location: index.php');

?>