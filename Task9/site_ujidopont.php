<?php
    function site($oldalnev){
        require('site_' . $oldalnev . '.php');
    }
    session_start();
    $bejelentkezve = isset($_SESSION['email']);

    if(!$bejelentkezve){
        header('Location: index.php');
        die;
    }
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="">
    <meta name="author" content="Mark Otto, Jacob Thornton, and Bootstrap contributors">
    <meta name="generator" content="Hugo 0.79.0">
    <title>Új időpont hozzáadása</title>

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

    
    <!-- Custom styles for this template -->
    <link href="starter-template.css" rel="stylesheet">
  </head>
  <body>
    
<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">NemKoViD</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
      <ul class="navbar-nav me-auto mb-2 mb-md-0">
        <li class="nav-item active">
          <a class="nav-link" aria-current="page" href="index.php">Főoldal</a>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>

    <form action="keres_ujidopont.php" method="post">
      <p>Oltás napja</p>
      <input name="nap" value="<?= isset($_SESSION['tempnap']) ? $_SESSION['tempnap'] : '' ?>">
            
      <br><br>

      <p>Oltás időpontja</p>
      <input name="ora" value="<?= isset($_SESSION['tempora']) ? $_SESSION['tempora'] : '' ?>">

      <br><br>

      <p>Oltás helyeinek száma</p>
      <input name="hely" value="<?= isset($_SESSION['temphely']) ? $_SESSION['temphely'] : '' ?>">

      <br><br>
      <input type="submit" value="Hozzáad">
    </form>
  </body>
</html>