<?php
  $adatok = [];
  $hibak = [];

  if(count($_GET) > 0){
    if(isset($_GET['goblins']) && is_numeric($_GET['goblins']) && $_GET['goblins'] > 0){
      $adatok['goblins'] = $_GET['goblins'];
    } else {
      $hibak[] = 'Érvénytelen goblin mennyiség!';
    }

    $szo = trim($_GET['chief']);
    if(isset($_GET['chief']) && preg_match("/\\s/", $szo)){
      if(preg_match("/a*\b(goblinka)\b/", $szo) || preg_match("/a*\b(kisfőnök)\b/", $szo) || preg_match("/a*\b(nagyfőnök)\b/", $szo) || preg_match("/a*\b(főfőnök)\b/", $szo) || preg_match("/a*\b(törzsfő)\b/", $szo)){
        if(preg_match("/a*\b(nagyfőnök)\b/", $szo)){
          $adatok['chief'] = $_GET['chief'];
        }else{
          $hibak[] = 'Túl alacsony rang!';
        }
      } else {
        $hibak[] = 'Érvénytelen rang!';
      }
    } else {
      $hibak[] = 'Érvénytelen vezető!';
    }

    if(isset($_GET['shovels']) && is_numeric($_GET['shovels']) && $_GET['shovels'] > 0){
      if($_GET['shovels'] > $_GET['goblins']){
        $adatok['shovels'] = $_GET['shovels'];
      }else {
        $hibak[] = 'Túl kevés ásó!';
      }
    } else {
      $hibak[] = 'Érvénytelen ásó mennyiség!';
    }

    if(empty($hibak) && $_GET['shovels'] == ($_GET['goblins']*2)){
      $hibak[] = 'Gyorsan megszerezzük a kincset!';
    } else if(empty($hibak)){
      $hibak[] = 'Indulhat az akció!';
    }
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>2. feladat</title>
</head>
<body>
  <h1>2. feladat</h1>

  <h2>Üzenetek</h2>
  <form>
        <h4>Goblin</h4>
        <input name="goblin"> <br>

        <h4>Főnök</h4>
        <input name="chief"> <br>

        <h4>Ásók száma</h4>
        <input name="shovels"> <br><br>

        <input type="submit" value="Küldés">
  </form>

  <?php if(count($hibak) > 0): ?>
        <ul>
            <?php foreach($hibak as $hiba): ?>
                <li><?=$hiba?></li>
            <?php endforeach ?>
        </ul>
    <?php endif ?>

  <h2>Próbalinkek</h2>
  <a href="index.php?goblins=5&chief=Snuch Nawdow nagyfőnök&shovels=7"><pre>index.php?goblins=5&chief=Snuch Nawdow nagyfőnök&shovels=7</pre></a>
  <a href="index.php?goblins=5&chief=Snuch Nawdow nagyfőnök&shovels=10"><pre>index.php?goblins=5&chief=Snuch Nawdow nagyfőnök&shovels=10</pre></a>
  <a href="index.php"><pre>index.php</pre></a>
  <a href="index.php?goblins=nemszám&chief=nincsszóköz&shovels=nemszám"><pre>index.php?goblins=nemszám&chief=nincsszóköz&shovels=nemszám</pre></a>
  <a href="index.php?goblins=-5&chief=Snuch Nawdow nagyfőnök&shovels=10"><pre>index.php?goblins=-5&chief=Snuch Nawdow nagyfőnök&shovels=10</pre></a>
  <a href="index.php?goblins=16.2&chief=Snuch Nawdow nagyfőnök&shovels=10"><pre>index.php?goblins=16.2&chief=Snuch Nawdow nagyfőnök&shovels=10</pre></a>
  <a href="index.php?goblins=16&chief=Snuch Nawdow nagyfőnök&shovels=10"><pre>index.php?goblins=16&chief=Snuch Nawdow nagyfőnök&shovels=10</pre></a>
  <a href="index.php?goblins=5&chief=Snuch Nawdow párttitkár&shovels=10"><pre>index.php?goblins=5&chief=Snuch Nawdow párttitkár&shovels=10</pre></a>
  <a href="index.php?goblins=5&chief=Snuch Nawdow kisfőnök&shovels=10"><pre>index.php?goblins=5&chief=Snuch Nawdow kisfőnök&shovels=10</pre></a>
</body>
</html>