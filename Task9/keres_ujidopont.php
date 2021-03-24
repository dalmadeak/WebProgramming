<?php
    function hiba2($hibakod){
        header('Location: index.php?hiba=' . $hibakod);
        die;
    }

    session_start();
    if(!isset($_SESSION["email"])){
        header('Location: index.php');
        die;
    }

    require_once('adatkezeles.php');

    $nap = trim($_POST['nap']);
    $ora = trim($_POST['ora']);
    $hely = trim($_POST['hely']);

    $_SESSION['tempnap'] = $nap;
    $_SESSION['tempora'] = $ora;
    $_SESSION['temphely'] = $hely;

    if(!preg_match("/^[0-9]{4}.(0[1-9]|1[0-2]).(0[1-9]|[1-2][0-9].|3[0-1].)$/", $nap)) hiba2('nap');

    if(!preg_match("/^([0-9]{1}|[1]{1}[0-9]{1}|[2]{1}[0-3]{1}):[0-5]{1}[0-9]{1}$/", $ora)) hiba2('ora');

    if(!preg_match("/^([1-9]{1}[0-9]*|[1-9])$/", $hely)) hiba2('hely');

    if(($nap < date('Y.m.d.')) || ($nap == date('Y.m.d.') && $ora <= date('H:i'))) hiba2('korai');

    ujIdopont($nap, $ora, $hely, $_SESSION["email"]);

    $_SESSION['tempnap'] = "";
    $_SESSION['tempora'] = "";
    $_SESSION['temphely'] = "";


    header('Location: index.php');

?>