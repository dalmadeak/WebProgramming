<?php function reszletekListaz($idopontok, $felhasznalok, $id){ ?>
    <table style="text-align: center; border: 1px solid black;">
        <tr style="text-align: center; border: 1px solid black;">
            <th>#</th>
            <th>Dátum</th>
            <th>Időpont</th>
            <th>Szabad hely</th>
            <th></th>
        </tr>
            <tr style="background-color: <?= (count($idopontok->$id->foglalta) == $idopontok->$id->hely) ? "#ffcccb" : "#9ccc65" ?>">
                <td><?=$id+1?>.</td>
                <td><?=$idopontok->$id->nap?></td>
                <td><?=$idopontok->$id->ora?></td>
                <td>
                    <?=count($idopontok->$id->foglalta)?>
                    /
                    <?=$idopontok->$id->hely?>
                       
                </td>
                <td>
                    <form action="keres_vissza.php" style="display: inline-block; ">
                        <input type="hidden" value="<?=$idopontok->$id->id?>" name="id">
                        <input type="submit" value="Vissza">
                    </form>
                </td>
            </tr>
    </table>
    <br><br>
    <table style="text-align: center; border: 1px solid black; width: 400px;">
        <tr style="text-align: center; border: 1px solid black;">
            <th>Név</th>
            <th>TAJ</th>
            <th>E-mail</th>
        </tr>
        <?php foreach($felhasznalok as $fh): ?>
            <?php if(in_array($fh->email, $idopontok->$id->foglalta)): ?>
                <tr style="background-color: lightblue;">
                    <td><?= $fh->username ?></td>
                    <td><?= $fh->taj ?></td>
                    <td><?= $fh->email ?></td>
                </tr>
            <?php endif ?>
        <?php endforeach ?>
    </table>
<?php } ?>

