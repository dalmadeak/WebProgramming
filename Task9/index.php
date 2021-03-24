<?php
    require_once('adatkezeles.php');
    function site($oldalnev){
        require( 'site_' . $oldalnev . '.php');
    }

    session_start();
    $bejelentkezve = isset($_SESSION['email']);
    $nincsFoglalas = isset($_SESSION['email']) && isFoglalt($_SESSION['email']);
    $idopontok = idopontok();
    $felhasznalok = felhasznalok();

?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.79.0">
    <title>NemKoViD</title>

    <link rel="canonical" href="https://getbootstrap.com/docs/5.0/examples/starter-template/">
    <!-- Bootstrap core CSS -->
<link href="bootstrap.min.css" rel="stylesheet">

    <style>
      .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
    </style>

    <link href="starter-template.css" rel="stylesheet">
  </head>
  <body>
    
  <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <div class="container-fluid">
      <a class="navbar-brand" href="index.php">NemKoViD</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav me-auto mb-2 mb-md-0">
          <li class="nav-item active">
            <a class="nav-link" aria-current="page" href="index.php">Főoldal</a>
          </li>
          <?php if(!$bejelentkezve): ?>
            <li class="nav-item">
              <a class="nav-link" href="site_bejelentkezes.php">Bejelentkezés</a>
            </li>
          <?php else: ?>
            <li class="nav-item">
            <form class="menuitem" action="logout.php" method="post">
              <input type="submit" style="background-color: Transparent; outline: none; border: none;" class="nav-link" value="Kijelentkezés" >
            </form>
            </li>

          <?php endif ?>
          <?php if($bejelentkezve && $_SESSION['email'] == "admin@nemkovid.hu"): ?>
            <li class="nav-item">
              <a class="nav-link" href="site_ujidopont.php">Új időpont</a>
            </li>
          <?php endif ?>   
          
        </ul>
        <form class="d-flex">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit">Keresés</button>
        </form>
      </div>
    </div>
  </nav>

  <main class="container">

    <div class="starter-template text-center py-5 px-3">
      <h1>Nemzeti Koronavírus Depó</h1>
      <p class="lead">Csak oltás. Semmi más.</p><br>
    </div>
    
    <div style="margin-left: auto; margin-right: auto; text-align: center; width: 400px;">
    <?php if(isset($_GET['hiba'])): ?>
      <?php $h = $_GET['hiba']; ?>
      <?php if($h == 'rossz'): ?>
          <p>Hibás felhasználónév vagy jelszó!</p>
      <?php elseif($h == 'letezik'): ?>
          <p>Az e-mail cím foglalt.</p>
      <?php elseif($h == 'hossz'): ?>
          <p>A név minimum 5, maximum 30 karakter.</p>
      <?php elseif($h == 'karakter'): ?>
          <p>A név csak betűket és space-eket tartalmazhat.</p>
      <?php elseif($h == 'egyezes'): ?>
          <p>A jelszavak nem egyeznek.</p>
      <?php elseif($h == 'jhossz'): ?>
          <p>A jelszó legalább 8 karakter legyen!</p>
      <?php elseif($h == 'komplex'): ?>
          <p>A jelszó tartalmazzon kisebetűt, nagybetűt, számot és , . - egyikét!</p>
      <?php elseif($h == 'taj'): ?>
          <p>A TAJ szám megadása kötelező, és 9 számjegyet kell tartalmaznia!</p>
      <?php elseif($h == 'add'): ?>
          <p>Az értesítési cím megadása kötelező!</p>
      <?php elseif($h == 'em'): ?>
          <p>Az e-mail cím megadása kötelező, és example@example.ex formátumú kell legyen!</p>
      <?php elseif($h == 'nap'): ?>
          <p>Nem megfelelő dátum formátum!</p>
      <?php elseif($h == 'ora'): ?>
          <p>Nem megfelelő időpont formátum!</p>
      <?php elseif($h == 'hely'): ?>
          <p>A férőhelyek száma csak pozitív egész szám lehet!</p>
      <?php elseif($h == 'korai'): ?>
          <p>A dátum és az időpont nem lehet korábbi, mint a jelenlegi dátum!</p>
      <?php elseif($h == 'khonap'): ?>
          <p>A keresett hónap nem található!</p>
      <?php else: ?>
          <p>Ismeretlen hiba! Hibakód: <?=$_GET['hiba']?></p>
      <?php endif ?>
    <?php endif ?>

    <?php site('lista'); ?>
    <?php site('reszletek'); ?>
    <?php if(!$bejelentkezve || !($_SESSION['search']) || !(isset($_SESSION['search']))): ?>
      <form action="list.php" method="post">
        Adott hónapra keresés: <input type="number" name="honap" min="0" max="12"> 
        <input type="submit" value="OK" ><br><br>
      </form>
      <?php if(!isset($_SESSION['adat'])): ?>
        <?php idopontListaz($idopontok, $bejelentkezve, $nincsFoglalas); ?>
      <?php else: ?>
        <p> Keresett hónap: <?= ($_SESSION['honap'] != 0) ? $_SESSION['honap'] : "mind" ?> </p>
        <?php if(count($_SESSION['adat']) > 0): ?>
          <?php idopontListaz($_SESSION['adat'], $bejelentkezve, $nincsFoglalas); ?>
        <?php else: ?>
          <p>Ebben a hónapban nincsenek elérhető időpontok! </p>
        <?php endif ?>
        <br><br>
        <form action="list.php" method="post">
          <input type="hidden" value="<?= $_SESSION['honap'] - 1 ?>" name="honap">
          <input type="submit" value="Előző" >
        </form>
        <form action="list.php" method="post"> 
          <input type="hidden" value="<?= $_SESSION['honap'] + 1 ?>" name="honap">
          <input type="submit" value="Következő" ><br><br>
        </form>
      <?php endif ?>
    <?php else: ?>
      <?php reszletekListaz($idopontok, $felhasznalok, $_SESSION['lid']); ?>
    <?php endif ?>
    </div>
    
  </main>
  </body>
</html>
