<?php
    session_start();
    require_once('adatkezeles.php');
    require_once('site_lista.php');
    require_once('site_reszletek.php');

    $idopontok =  json_decode(file_get_contents('idopontok.json'));
    $felhasznalok =  json_decode(file_get_contents('felhasznalok.json'));

    $_SESSION['search'] = true;
    $_SESSION['lid'] = $_POST['id'];
    
    reszletekListaz($idopontok, $felhasznalok, $_SESSION['lid']);
    
    header('Location: index.php');

?>