<?php
    function hiba($hibakod){
        header('Location: index.php?hiba=' . $hibakod);
        die;
    }

    function isValidEmail($email){ 
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }

    session_start();
    require_once('adatkezeles.php');

    $un = trim($_POST['username']);
    $taj = trim($_POST['taj']);
    $ad = trim($_POST['address']);
    $em = trim($_POST['email']);
    $p1 = trim($_POST['password1']);
    $p2 = trim($_POST['password2']);

    $_SESSION['tempusername'] = $_POST['username'];
    $_SESSION['temptaj'] = $_POST['taj'];
    $_SESSION['tempaddress'] = $_POST['address'];
    $_SESSION['tempemail'] = $_POST['email'];

    if(emailLetezik($em)) hiba('letezik');

    if(strlen($un) < 5 || strlen($un) > 30) hiba('hossz');

    if(!preg_match("/^[a-zöüóőúéáűíA-ZÖÜÓŐÚÉÁŰÍ ]*$/", $un)) hiba('karakter');

    if(!preg_match("/^[0-9]{9}$/", $taj) || !isset($_POST['taj'])) hiba('taj');

    if($ad == '') hiba('add');

    if(!isValidEmail($em) || !isset($_POST['email'])) hiba('em');

    if($p1 != $p2) hiba('egyezes');

    if(strlen($p1) < 8) hiba('jhossz');

    if(
        !preg_match("/[a-z]/", $p1) ||
        !preg_match("/[A-Z]/", $p1) ||
        !preg_match("/[0-9]/", $p1) ||
        !preg_match("/[\-\,\.]/", $p1)
    ) hiba('komplex');

    regisztral($un, $p1, $taj, $ad, $em);
    $_SESSION['username'] = $un;
    $_SESSION['email'] = $em;

    $_SESSION['tempusername'] = '';
    $_SESSION['temptaj'] = '';
    $_SESSION['tempaddress'] = '';
    $_SESSION['tempemail'] = '';

    header('Location: index.php');

?>