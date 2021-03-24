let base = document.querySelector('body');

let szoveg = document.createElement('label');
szoveg.innerHTML = 'Letöltési sebesség: ';
base.appendChild(szoveg);

let input = document.createElement('input');
base.appendChild(input);

let gomb = document.createElement('button');
gomb.innerHTML = 'Letölt';
base.appendChild(gomb);

let nevek = document.querySelectorAll('.nev');
let meretek = document.querySelectorAll('.meret');
let szazalekok = document.querySelectorAll('.szazalek');

let data = document.querySelector('tbody');
let adatok = data.querySelectorAll('tr');

gomb.addEventListener('click', ()=> {
    for(let i=0;i<adatok.length;i++) {
        console.log(nevek[i].innerHTML);
        console.log(meretek[i].innerHTML);
        let szam = parseInt(meretek[i].innerHTML);
        let szazalek = parseInt(szazalekok[i].innerHTML);
        console.log((szam * (szazalek / 100)) + 'NkB');
    }

    if(!isNaN(input.value)){
        for(let i=0;i<adatok.length;i++) {
            let szam = parseInt(meretek[i].innerHTML);
            let szazalek = parseInt(szazalekok[i].innerHTML);
            if((((szam * (szazalek / 100)) + parseInt(input.value)) / szam * 100) < 100) {
                szazalekok[i].innerHTML = ((szam * (szazalek / 100)) + parseInt(input.value)) / szam * 100 + '%';
            } else {
                szazalekok[i].innerHTML = '100%';
            }
            
        }
    }
});