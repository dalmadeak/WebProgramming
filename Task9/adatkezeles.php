<?php
    function emailLetezik($email){
        $adat = json_decode(file_get_contents('felhasznalok.json'));
        return isset($adat->$email);
    }

    function jelszoEgyezik($email, $password){
        $adat = json_decode(file_get_contents('felhasznalok.json'))->$email;
        return password_verify($password, $adat->password);
    }

    function regisztral($username, $pass, $taj, $address, $email){
        $adat = json_decode(file_get_contents('felhasznalok.json'));
        $adat->$email = (object)[
            "username" => $username,
            "taj" => $taj,
            "address" => $address,
            "email" => $email,
            "password" => password_hash($pass, PASSWORD_DEFAULT),
            "foglalt" => false
        ];
        file_put_contents('felhasznalok.json', json_encode($adat, JSON_PRETTY_PRINT));
    }

    function idopontok(){
        $idopontok = json_decode(file_get_contents('idopontok.json'));
        return $idopontok;
    }

    function felhasznalok(){
        $felhasznalok = json_decode(file_get_contents('felhasznalok.json'));
        return $felhasznalok;
    }

    function idopont($id){
        $idopontok = idopontok();
        if(isset($idopontok->$id)){
            return $idopontok->$id;
        }else{
            return (object)[];
        }
    }

    function isFoglalt($email){
        $felhasznalok = json_decode(file_get_contents('felhasznalok.json'));
        return isset($felhasznalok->$email) && $felhasznalok->$email->foglalt;
    }

    function foglal($id, $email){
        $idopontok = json_decode(file_get_contents('idopontok.json'));
        $felhasznalok = json_decode(file_get_contents('felhasznalok.json'));
        if(!isset($idopontok->$id)) return;

        if(in_array($email, $idopontok->$id->foglalta)){
            $ujfoglalok = [];
            foreach($idopontok->$id->foglalta as $fog){
                if($fog != $email) $ujfoglalok[] = $fog;
            }
            $idopontok->$id->foglalta = $ujfoglalok;
        }else {
            $idopontok->$id->foglalta[] = $email;
        }
        $felhasznalok->$email->foglalt = !$felhasznalok->$email->foglalt;
        file_put_contents('idopontok.json', json_encode($idopontok, JSON_PRETTY_PRINT));
        file_put_contents('felhasznalok.json', json_encode($felhasznalok, JSON_PRETTY_PRINT));
    }

    function ujIdopont($nap, $ora, $hely, $email){
        $idopontok = json_decode(file_get_contents('idopontok.json'));
        $max;
        $volt = false;
        foreach($idopontok as $ido){
            if(!$volt){
                $volt = true;
                $max = $ido->id;
            }else if($max < $ido->id){
                $max = $ido->id;
            }
        }
        $max++;
        $idopontok->$max = (object)[
            "id" => $max,
            "nap" => $nap,
            "ora" => $ora,
            "hely" => $hely,
            "foglalta" => [],
            "hozzaadta" => $email
        ];
        file_put_contents('idopontok.json', json_encode($idopontok, JSON_PRETTY_PRINT));
    }

    function torolIdopont($id){
        $idopontok = json_decode(file_get_contents('idopontok.json'));
        $ujIdopontok = (object)[];
        foreach($idopontok as $i => $ido){
            if($i != $id){
                $ujIdopontok->$i = $ido;
            }
        }
        file_put_contents('idopontok.json', json_encode($ujIdopontok, JSON_PRETTY_PRINT));
    }

    function kereshonap($honap){
        $idopontok = json_decode(file_get_contents('idopontok.json'));
        if($honap > 0){
            $d = 0;
            $ujIdopontok = (object)[];
            foreach($idopontok as $i => $ido){
                $h = explode(".",$ido->nap);
                if($h[1] == $honap){
                    $ujIdopontok->$d = $ido;
                    $d++;
                }
            }
            return $ujIdopontok;
        } else {
            return $idopontok;
        }
       
    }

?>