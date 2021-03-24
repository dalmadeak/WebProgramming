<?php

    session_start();
    require_once('adatkezeles.php');
    require_once('site_lista.php');

    $idopontok =  json_decode(file_get_contents('idopontok.json'));
    
    if(!$_GET['foglalt']){
        foglal($_GET['id'], $_SESSION['email']);
    }
    header('Location: index.php');

?>