<?php
    function hiba($hibakod){
        header('Location: index.php?hiba=' . $hibakod);
        die;
    }

    session_start();
    require_once('adatkezeles.php');
    require_once('site_lista.php');

    $honap = trim($_POST['honap']);

    $_SESSION['temphonap'] = trim($_POST['honap']);

    if(!isset($_POST['honap'])) hiba('khonap');

    if($honap > 12) $honap = 1;
    if($honap < 0) $honap = 12;

    $adat = kereshonap(intval($honap));

    $_SESSION['honap'] = $honap;
    $_SESSION['adat'] = $adat;

    idopontListaz($adat,true,true);

    header('Location: index.php');

?>