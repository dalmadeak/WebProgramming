let kezdoDiv = document.querySelector('#kezdokepernyo');
let jatekDiv = document.querySelector('#jatekkepernyo');
let seth1 = document.querySelector('#set');
let jatekh1 = document.querySelector('#jatek');
let gomb1 = document.querySelector('#szabaly');
let gomb2 = document.querySelector('#szam');
let gomb3 = document.querySelector('#mod');
let gomb4 = document.querySelector('#egyeb');
let gomb5 = document.querySelector('#start');
let div1 = document.querySelector('#gombok');
let div2 = document.querySelector('#szamBeallit');
let div3 = document.querySelector('#visszaOk');
let div4 = document.querySelector('#modBeallit');
let div5 = document.querySelector('#egyebBeallit');
let szamInput = document.querySelector('#szamInput');
let visszaGomb = document.querySelector('#vissza');
let okGomb = document.querySelector('#ok');
let nevek = document.querySelectorAll('.nevek');
let gyakGomb = document.querySelector('#gyakMod');
let versenyGomb = document.querySelector('#versenyMod');
let subGomb = document.querySelector('#sub');
let egyebek = div5.querySelectorAll('input')

let jobboldal = document.querySelector('#jobboldal');
let baloldal = document.querySelector('#baloldal');
let kepek = document.querySelectorAll('.kartyaKep');


let jatekosok = [];
let checks = [];
let mode = 0;

/*jatekDiv.style.display = 'flex';
kezdoDiv.style.display = 'none';*/
jatekDiv.style.display = 'none';
kezdoDiv.style.display = 'inherit';


window.onresize = function(){
    let img = document.querySelector('body');
    img.style.width = "100%";
};

//Főoldal gombok
gomb1.addEventListener('click', ()=> {
    window.location = 'https://fejlesztojatekvilag.hu/uploaded/set_magyar_szabaly.pdf';
});

gomb2.addEventListener('click', ()=> {
    gombok.style.display = 'none';
    div2.style.display = 'inherit';
    div3.style.display = 'inherit';
});

gomb3.addEventListener('click', ()=>{
    gombok.style.display = 'none';
    div4.style.display = 'inherit';
});

gomb4.addEventListener('click', ()=> {
    gombok.style.display = 'none';
    div5.style.display = 'inherit';
});

//Játékosok megadása oldal
let elfogad = document.createElement('button');
elfogad.innerHTML = 'Ment';
elfogad.classList.toggle('gomb2');
div2.appendChild(elfogad);

const removeElements = (elms) => elms.forEach(el => el.remove());

let br = document.createElement('br');
div2.appendChild(br);
elfogad.addEventListener('click', ()=> {
    removeElements( document.querySelectorAll('.nevInput') );
    removeElements( document.querySelectorAll('.nevLabel') );
    removeElements( document.querySelectorAll('.div2br') );
    for(let i=0;i<szamInput.value;i++){
        let nevLabel = document.createElement('label');
        nevLabel.classList.toggle('nevLabel');
        nevLabel.innerHTML = 'Játékos ' + (i+1) + '&#9;';
        div2.appendChild(nevLabel);

        let nevInput = document.createElement('input');
        nevInput.value = 'Játékos' + (i+1);
        nevInput.classList.toggle('nevInput');
        let element = {};
        element.nev = nevInput.value;
        element.pont = 0;
        jatekosok[i] = element;
        nevInput.addEventListener('input', ()=>{
            element.nev = nevInput.value;
            element.pont = 0;
            jatekosok[i] = element;
        });

            
        div2.appendChild(nevInput);
        br = document.createElement('br');
        br.classList.toggle('div2br');
        div2.appendChild(br);
    }
});

visszaGomb.addEventListener('click', ()=>{
    div1.style.display = 'inherit';
    div2.style.display = "none";
    div3.style.display = "none";
});

okGomb.addEventListener('click', ()=> {
    for(let nev of nevek){
        let element = {};
        element.nev = nev;
        element.pont = 0;
        jatekosok.push(element);
    }
    div1.style.display = 'inherit';
    div2.style.display = "none";
    div3.style.display = "none";
    console.log(jatekosok);
});

//Mód megadása oldal
gyakGomb.addEventListener('click', ()=>{
    mode = 1;
    div1.style.display = 'inherit';
    div2.style.display = "none";
    div3.style.display = "none";
    div4.style.display = 'none';
    gomb4.style.display = 'inline';
});

versenyGomb.addEventListener('click', ()=>{
    mode = 2;
    div1.style.display = 'inherit';
    div2.style.display = "none";
    div3.style.display = "none";
    div4.style.display = 'none';
    gomb4.style.display = 'none';
});

//Egyéb beállítás oldal
subGomb.addEventListener('click', ()=>{
    checks = [];
    for(let adat of egyebek){
        if(adat.checked == true){
            checks.push(adat.value);
        }
    }
    div1.style.display = 'inherit';
    div5.style.display = "none";
});

//Start gomb
let hibak = [];
gomb5.addEventListener('click', ()=>{
    hibak = ellenorzes();
    if(hibak.length == 0){
        kezdoDiv.style.display = 'none';
        jatekDiv.style.display = 'flex';
        jatekosGombokGeneral();
    } else {
        let hibaDiv = document.createElement('div');
        hibaDiv.id = 'hibaDiv';
        let hibaList = document.createElement('ul');
        for(let i=0;i<hibak.length;i++){
            let hibaElem = document.createElement('li');
            hibaElem.innerHTML = hibak[i];
            hibaList.appendChild(hibaElem);
        }
        hibaDiv.appendChild(hibaList);
        document.body.appendChild(hibaDiv);
    }
});

function ellenorzes(){
    hibak = [];
    removeElements( document.querySelectorAll('#hibaDiv') );
    if(Object.keys(jatekosok).length == 0){
        hibak.push('Kérlek, add meg a játékosok számát!');
    }
    if(mode == 0){
        hibak.push('Kérlek, add meg a játékmódot!');
    }
    return hibak;
}


//Játék baloldala
let clicked = 0;
let warning = document.createElement('label');
warning.id = 'warning';
function jatekosGombokGeneral(){
    let lista = document.createElement('ul');
    for(let jatekos of jatekosok){
        let listaElem = document.createElement('li');
            let jatekosElem = document.createElement('button');
            jatekosElem.innerHTML = jatekos.nev;
            jatekosElem.classList.add('notClickedButton');
            if(jatekosok.length == 1){
                jatekosElem.classList.add('clickedButton');
                jatekosElem.classList.remove('notClickedButton');
            } else {
                jatekosElem.addEventListener('click', ()=>{
                    removeElements(baloldal.querySelectorAll('#warning') );
                        if(jatekosElem.classList.contains('notClickedButton') && clicked == 0){
                            jatekosElem.classList.add('clickedButton');
                            jatekosElem.classList.remove('notClickedButton');
                            clicked++;
                        } else if (jatekosElem.classList.contains('clickedButton') && clicked == 1){
                            jatekosElem.classList.remove('clickedButton');
                            jatekosElem.classList.add('notClickedButton');
                            clicked--;
                        } else {
                            warning.innerHTML = 'Csak egy játékost jelölhetsz ki egyszerre!';
                            baloldal.appendChild(warning);
                        }
                });
            }
            listaElem.appendChild(jatekosElem);
        lista.appendChild(listaElem);
    }
baloldal.appendChild(lista);
}


//Játék jobboldala
let nums = [];
let deck = [];
let kijeloltek = [];
let kijeloltKepek = [];
let toroltKepek = [];
for(let i=0;i<27;i++){
    nums[i] = i;
}

let formak = ['D','P', 'S'];
let szinek = ['g', 'p', 'r'];
let szamok = [1,2,3];

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
}

function generateDeck(deck){
    let k = 0;
    for(let szam of szamok){
        for(let szin of szinek){
            for(let forma of formak){
                deck.push({
                    szam: szam,
                    szin: szin,
                    forma: forma,
                    num: nums[k],
                    src: './cards/' + szam + 'S' + szin + forma + '.png'
                });
                k++;
            }
        }
    }
    return deck;
}

function removeA(arr) {  //Közbeszerezve Stack Overflow-ról
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}

function checkSet(kijeloltek, kepek){
    let eredmeny;
     if(((kijeloltek[0].forma == kijeloltek[1].forma &&  kijeloltek[1].forma == kijeloltek[2].forma) || (kijeloltek[0].forma != kijeloltek[1].forma &&  kijeloltek[0].forma != kijeloltek[2].forma && kijeloltek[0].forma != kijeloltek[2].forma)) &&
        ((kijeloltek[0].szin == kijeloltek[1].szin &&  kijeloltek[1].szin == kijeloltek[2].szin) || (kijeloltek[0].szin != kijeloltek[1].szin &&  kijeloltek[0].szin != kijeloltek[2].szin && kijeloltek[0].szin != kijeloltek[2].szin)) &&
        ((kijeloltek[0].szam == kijeloltek[1].szam &&  kijeloltek[1].szam == kijeloltek[2].szam) || (kijeloltek[0].szam != kijeloltek[1].szam &&  kijeloltek[0].szam != kijeloltek[2].szam && kijeloltek[0].szam != kijeloltek[2].szam))){
                    eredmeny = 'SET';
                    console.log(eredmeny);
                } else {
                    eredmeny = 'Nem SET';
                    console.log(eredmeny);
                }

    for(let k of kepek){
        k.style.border = 'none';
    }

    return eredmeny;
}

function addThreeCards(deck, kijeloltek, l){
    let replacables = document.querySelectorAll('.clickedImage');

    for(let rep of replacables){
        rep.classList.remove('clickedImage');
    }
        let k=0;
        while(deck[k].num != l){
            k++;
            
        }
        for(let i=0;i<3;i++){
            let f = 0;
            while(deck[f].num != kijeloltek[i].num){
                f++;
                
            }
            k=0;
            while(deck[k].num != l){
                k++;
                
            }
            l++;
                deck[f].forma = deck[k].forma;
                deck[f].szin = deck[k].szin;
                deck[f].szam= deck[k].szam;
                deck[f].num= deck[k].num;
                deck[f].src = deck[k].src;
        }

        return deck;
}

nums = shuffle(nums);
deck = generateDeck(deck);
console.log(deck);
base(nums,deck);

function refreshTable(deck){
    let k = 0;
    let newDeck = [];
    for(let card of deck){
        newDeck.push(card);
    }
    return newDeck;
}

function base(nums,deck){
let l = 0;
let tabla = document.createElement('table');
tabla.id = 'kartyaTabla';
for(let i=0;i<3;i++){
    let sor = document.createElement('tr');
    for(let j=0;j<4;j++){
        let elem = document.createElement('td');
            let kep = document.createElement('img');
            kep.classList.add('kartyaKep');
            let k = 0;
            console.log(deck);
            while(deck[k].num != l){
                k++;
            }
            l++;
            kep.src = deck[k].src;
            kep.addEventListener('click', ()=>{
                console.log(deck[k]);
                let jatekosGombok = baloldal.querySelectorAll('button');
                    if(document.querySelector('.clickedButton') != null){
                        if(kijeloltek.includes(deck[k])){
                            removeA(kijeloltek, deck[k]);
                            kep.style.border = 'none';
                            kep.classList.remove('clickedImage');
                            removeA(kijeloltKepek, kep);
                        } else {
                            if(kijeloltek.length < 3){
                                kijeloltek.push(deck[k]);
                                kep.classList.add('clickedImage');
                                kep.style.border = '2px solid blue';
                                kijeloltKepek.push(kep);
                            }
                            if(kijeloltek.length == 3){
                                let eredmeny = checkSet(kijeloltek, kijeloltKepek);
                                
                                if(eredmeny == 'SET'){
                                    let h=0;
                                    for(let jatekosGomb of jatekosGombok){
                                        if(jatekosGomb.classList.contains('clickedButton')){
                                            jatekosok[h].pont++;
                                        }
                                        h++;
                                    }
                                    console.log(jatekosok);
                                    deck = addThreeCards(deck, kijeloltek, l);
                                    deck = refreshTable(deck);
                                    base(nums,deck);
                                } else {
                                    let h = 0;
                                    for(let jatekosGomb of jatekosGombok){
                                        if(jatekosGomb.classList.contains('clickedButton')){
                                            jatekosok[h].pont--;
                                        }
                                        h++;
                                    }
                                }
                                kijeloltek = [];
                                kijeloltKepek = [];
                                console.log(kijeloltek);
                                console.log(kijeloltKepek);
                            }
                        } 
                    } else {
                        warning.innerHTML = 'Jelölj ki először egy játékost!';
                        baloldal.appendChild(warning);
                    }
            });
            elem.appendChild(kep);
        sor.appendChild(elem);
    }
    tabla.appendChild(sor);
}
jobboldal.appendChild(tabla);
}

