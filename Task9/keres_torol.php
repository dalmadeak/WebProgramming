<?php
    session_start();
    if(!isset($_SESSION["email"])){
        header('Location: index.php');
        die;
    }

    require_once('adatkezeles.php');
    if(idopont($_GET['id'])->hozzaadta != $_SESSION['email']){
        header('Location: index.php');
        die;
    }

    torolIdopont($_GET['id']);
    header('Location: index.php');

?>