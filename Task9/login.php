<?php
    require_once('adatkezeles.php');
    session_start();

    $_SESSION['search'] = false;
    $_SESSION['honap'] = 0;

    if(emailLetezik($_POST['email'])){
        if(jelszoEgyezik($_POST['email'], $_POST['password'])){
            $_SESSION['username'] = $_POST['username'];
            $_SESSION['email'] = $_POST['email'];
            
            header('Location: index.php');
        }else{
            header('Location: index.php?hiba=rossz');
        }
    }else{
        header('Location: index.php?hiba=rossz');
    }

?>