  <?php function idopontListaz($idopontok, $bejelentkezve, $nincsFoglalas){ ?>
  <?php $_SESSION['search'] = false ?>
    <table style="text-align: center; border: 1px solid black;" >
        <tr style="text-align: center; border: 1px solid black;">
            <th>#</th>
            <th>Dátum</th>
            <th>Időpont</th>
            <th>Szabad hely</th>
            <th></th>
            <th></th>
        </tr>
        <?php foreach($idopontok as $i => $ido): ?>
            <tr style="background-color: <?= (count($ido->foglalta) == $ido->hely) ? "#ffcccb" : "#9ccc65" ?>">
                <td><?=$i+1?>.</td>
                <td><?=$ido->nap?></td>
                <td><?=$ido->ora?></td>
                <td>
                    <?=count($ido->foglalta)?>
                    /
                    <?=$ido->hely?>
                       
                </td>
                <td>
                    <?php if($bejelentkezve && !$nincsFoglalas && (count($ido->foglalta) != $ido->hely)): ?>
                        <form action="keres_foglalt.php" style="display: inline-block; ">
                            <input type="hidden" value="<?=$ido->id?>" name="id">
                            <input type="submit" value="Jelentkezés">
                        </form>
                    <?php elseif($bejelentkezve && $nincsFoglalas && ($_SESSION["email"] != "admin@nemkovid.hu")): ?>
                        <?php if(in_array($_SESSION['email'], $ido->foglalta)): ?>
                            <form action="keres_foglalt.php" style="display: inline-block; ">
                                <input type="hidden" value="<?=$ido->id?>" name="id">
                                <input type="submit" value="Lemondás">
                            </form>
                        <?php endif ?>
                    <?php elseif($bejelentkezve && ($_SESSION["email"] == "admin@nemkovid.hu")): ?>
                        <form method="post" action="keres_reszletek.php" style="display: inline-block;" >
                            <?php $_SESSION['lid'] = $i ?>
                            <input type="hidden" value="<?=$ido->id?>" name="id">
                            <input type="submit" value="Részletek">
                        </form>
                    <?php endif ?>

                    <?php if(!$bejelentkezve && (count($ido->foglalta) != $ido->hely)): ?>
                        <form action="site_bejelentkezes.php" style="display: inline-block; ">
                            <input type="submit" value="Jelentkezés">
                        </form>
                    <?php endif ?> 
                </td>
                <?php if($bejelentkezve && $ido->hozzaadta == $_SESSION["email"]): ?>
                    <td><a href="keres_torol.php?id=<?=$ido->id?>">❌</a></td>
                <?php endif ?>
            </tr>
        <?php endforeach ?>
    </table>
<?php } ?>