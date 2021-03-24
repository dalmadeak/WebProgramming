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
    jatekosok = [];
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
        if(mode == 1){
            for(let adat of egyebek){
                if(adat.checked == true && adat.value == 'keres'){
                    egyebGombGeneral1();
                } else if (adat.checked == true && adat.value == 'talal'){
                    egyebGombGeneral2();
                }
            }
        }
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
let formak = ['D','P', 'S'];
let szinek = ['g', 'p', 'r'];
let szamok = [1,2,3];
let nums = [];
let deck = [];
let kijeloltek = [];
let kijeloltKepek = [];
let toroltKepek = [];
for(let i=0;i<27;i++){
    nums[i] = i;
}
nums = shuffle(nums);
deck = generateDeck(deck);
console.log(deck);

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
            jatekosElem.classList.add('jatekosButton');
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
                    if(jatekosok.length > 1){
                        let timer = setTimeout(removeClickedPlayer, 10000);
                    }
                });
            }
            listaElem.appendChild(jatekosElem);
        lista.appendChild(listaElem);
    }
baloldal.appendChild(lista);
}

function removeClickedPlayer(){
    let jatekosElem = document.querySelector('.clickedButton');
    jatekosElem.classList.remove('clickedButton');
    jatekosElem.classList.add('notClickedButton');
    clicked--;
}

function egyebGombGeneral1(){
    let lista = document.createElement('ul');
        let listaElem = document.createElement('button');
        listaElem.innerHTML = 'Van-e SET';
        listaElem.classList.add('notClickedButton');
        listaElem.addEventListener('click', ()=>{
            let exist = checkIsSet(deck);
            if (exist == 1){
                window.alert('Van SET a pályán!');
            } else if(exist == 0){
                window.alert('Nincs SET a pályán!');
            }
        });
        lista.appendChild(listaElem);
    baloldal.appendChild(lista);
}

function egyebGombGeneral2(){
    let lista = document.createElement('ul');
        let br = document.createElement('br');
        lista.appendChild(br);
        let listaElem2 = document.createElement('button');
        listaElem2.innerHTML = 'Hol van SET';
        listaElem2.classList.add('notClickedButton');
        listaElem2.addEventListener('click', ()=>{
            showWhereSet(deck);
        });
        lista.appendChild(listaElem2);
    baloldal.appendChild(lista);
}


//Játék jobboldala
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
                    onTable: (nums[k] < 12),
                    src: './cards/' + szam + 'S' + szin + forma + '.png'
                });
                k++;
            }
        }
    }
    return deck;
}

function removeB(arr,num){
    let tomb = [];
    for(const elem of arr){
        if(elem.num != num){
            tomb.push(elem);
        }
    }
    return tomb;
}

function removeC(arr,kepsrc){
    let tomb = [];
    for(const elem of arr){
        if(elem.src != kepsrc){
            tomb.push(elem);
        }
    }
    return tomb;
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

function addThreeCards(deck, kijeloltek, kijeloltKepek, f){
    let replacables = document.querySelectorAll('.clickedImage');

    if(f <= 24){
        for(let i=0;i<3;i++){
            let p=0;
            while(deck[p].num != f){
                p++;
            }
            f++;
            let x=0;
            while(deck[x].num != kijeloltek[i].num){
                x++;
            }
            
            deck[x].onTable = false;
            deck[p].onTable = true;
    
            let m = 0;
            while(m < 3){
                if(kijeloltKepek[i].src == replacables[m].src){
                    replacables[m].src = deck[p].src;
                    replacables[m].dataset.index = p;
                    replacables[m].classList.remove('clickedImage');
                }
                m++;
            }
        }
    }else if (f == 25){
        for(let i=0;i<2;i++){
            let p=0;
            while(deck[p].num != f){
                p++;
            }
            f++;
            let x=0;
            while(deck[x].num != kijeloltek[i].num){
                x++;
            }
            
            deck[x].onTable = false;
            deck[p].onTable = true;
    
            let m = 0;
            while(m < 2){
                if(kijeloltKepek[i].src == replacables[m].src){
                    replacables[m].src = deck[p].src;
                    replacables[m].dataset.index = p;
                    replacables[m].classList.remove('clickedImage');
                }
                m++;
            }
        }
        for(let i=0;i<1;i++){
            f++;
            let x=0;
            while(deck[x].num != kijeloltek[i].num){
                x++;
            }
            
            deck[x].onTable = true;
            deck[x].src = './cards/off.png';
    
            let m = 0;
            while(m < 1){
                if(kijeloltKepek[i].src == replacables[m].src){
                    replacables[m].src = './cards/off.png';
                    //replacables[m].dataset.index = x;
                    replacables[m].classList.remove('clickedImage');
                }
                m++;
            }
        }
    } else if (f == 26){
        for(let i=0;i<1;i++){
            let p=0;
            while(deck[p].num != f){
                p++;
            }
            f++;
            let x=0;
            while(deck[x].num != kijeloltek[i].num){
                x++;
            }
            
            deck[x].onTable = false;
            deck[p].onTable = true;
    
            let m = 0;
            while(m < 1){
                if(kijeloltKepek[i].src == replacables[m].src){
                    replacables[m].src = deck[p].src;
                    replacables[m].dataset.index = p;
                    replacables[m].classList.remove('clickedImage');
                }
                m++;
            }
        }
        for(let i=0;i<2;i++){
            f++;
            let x=0;
            while(deck[x].num != kijeloltek[i].num){
                x++;
            }
            
            deck[x].onTable = true;
            deck[x].src = './cards/off.png';
    
            let m = 0;
            while(m < 2){
                if(kijeloltKepek[i].src == replacables[m].src){
                    replacables[m].src = './cards/off.png';
                    //replacables[m].dataset.index = x;
                    replacables[m].classList.remove('clickedImage');
                }
                m++;
            }
        }
    } else {
        for(let i=0;i<3;i++){
            f++;
             let x=0;
             while(deck[x].num != kijeloltek[i].num){
                 x++;
             }
             
             deck[x].onTable = true;
             deck[x].src = './cards/off.png';
     
             let m = 0;
             while(m < 3){
                 if(kijeloltKepek[i].src == replacables[m].src){
                     replacables[m].src = './cards/off.png';
                     //sreplacables[m].dataset.index = x;
                     replacables[m].classList.remove('clickedImage');
                 }
                 m++;
             }
         }
    }
    return f;
}

function checkGameEnd(deck){
    let empty = 0;
    for(let card of deck){
        if(card.onTable == true && card.src != './cards/off.png')
        {
            empty++;
        };
    }
    if(empty == 0){
        return 'Nyertél';
    } else {
        return 'Vesztettél';
    }
}

function checkIsSet(deck){
    let exist = 0;
    for(let cards1 of deck){
        for(let cards2 of deck){
            for(let cards3 of deck){
                if(cards1.onTable == true && cards2.onTable == true && cards3.onTable == true && cards1.src != './cards/off.png' && cards2.src != './cards/off.png' && cards3.src != './cards/off.png' && cards1 != cards2 && cards2 != cards3 && cards1 != cards3){
                    if(((cards1.forma == cards2.forma &&  cards2.forma == cards3.forma) || (cards1.forma != cards2.forma &&  cards2.forma != cards3.forma && cards1.forma != cards3.forma)) &&
                    ((cards1.szin == cards2.szin && cards2.szin == cards3.szin) || (cards1.szin != cards2.szin &&  cards2.szin != cards3.szin && cards1.szin != cards3.szin)) &&
                    ((cards1.szam == cards2.szam && cards2.szam == cards3.szam) || (cards1.szam != cards2.szam &&  cards2.szam != cards3.szam && cards1.szam != cards3.szam))) {
                        exist = 1;
                    }
                }
                
            }
        }
    }

    let empty = checkGameEnd(deck);
    if(empty == 'Nyertél'){
        exist = 2;
    }

    return exist;
}

function showWhereSet(deck){
    let kepek1 = document.querySelectorAll('.kartyaKep');
    let exist = 0;
    let i = 0;
    let j = 1;
    let k = 2;
    while(i < deck.length && exist == 0){
        while(j < deck.length && exist == 0){
            while(k < deck.length && exist == 0){
                if(deck[i].onTable == true && deck[j].onTable == true && deck[k].onTable == true && deck[i].src != './cards/off.png' && deck[j].src != './cards/off.png' && deck[k].src != './cards/off.png' && deck[i] != deck[j] && deck[j] != deck[k] && deck[i] != deck[k]){
                    if(((deck[i].forma == deck[j].forma && deck[j].forma == deck[k].forma) || (deck[i].forma != deck[j].forma &&  deck[j].forma != deck[k].forma && deck[i].forma != deck[k].forma)) &&
                    ((deck[i].szin == deck[j].szin && deck[j].szin == deck[k].szin) || (deck[i].szin != deck[j].szin &&  deck[j].szin != deck[k].szin && deck[i].szin != deck[k].szin)) &&
                    ((deck[i].szam == deck[j].szam && deck[j].szam == deck[k].szam) || (deck[i].szam != deck[j].szam &&  deck[j].szam != deck[k].szam && deck[i].szam != deck[k].szam))) {
                        exist = 1;
                        for(let kep of kepek1){
                            if(kep.src == deck[i].src || kep.src == deck[j].src || kep.src == deck[k].src){
                                kep.style.border = '2px solid blue';
                            }
                        }
                    }
                }
                k++;
            }
            j++;
        }
        i++;
    }
    //let timer2 = setTimeout(removeBorder, 3000);    
}

function removeBorder(){
    let kepek = document.querySelectorAll('.foundSet');
    for(let kep of kepek){
        kep.classList.remove('foundSet');
    }
}

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
            while(deck[k].num != l){
                k++;
            }
            l++;
            kep.src = './cards/' + deck[k].szam + 'S' + deck[k].szin + deck[k].forma + '.png';
            kep.dataset.index = k;
            kep.addEventListener('click', ()=>{
                let aktualis = kep.dataset.index;
                if(deck[aktualis].src != './cards/off.png') {
                    let jatekosGombok = baloldal.querySelectorAll('.jatekosButton');
                    if(document.querySelector('.clickedButton') != null){
                        if(kijeloltek.includes(deck[aktualis])){
                            kijeloltek = removeB(kijeloltek, deck[aktualis].num);
                            kep.style.border = 'none';
                            kep.classList.remove('clickedImage');
                            kijeloltKepek = removeC(kijeloltKepek, kep);
                        } else {
                            if(kijeloltek.length < 3){
                                kijeloltek.push(deck[aktualis]);
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
                                    l = addThreeCards(deck, kijeloltek, kijeloltKepek,l);
                                    let exist = checkIsSet(deck);
                                    if(exist == 0){
                                        window.alert('A játék véget ért! Nincs több SET a pályán!');
                                    } else if( exist == 2){
                                        window.alert('Nyertél!');
                                    }
                                } else {
                                    let h = 0;
                                    for(let jatekosGomb of jatekosGombok){
                                        if(jatekosGomb.classList.contains('clickedButton')){
                                            jatekosok[h].pont--;
                                        }
                                        h++;
                                    }
                                }
                                if(l > 26){
                                   checkGameEnd(deck);
                                }
                                kijeloltek = [];
                                kijeloltKepek = [];
                            }
                        } 
                    } else {
                        warning.innerHTML = 'Jelölj ki először egy játékost!';
                        baloldal.appendChild(warning);
                    }
                }
                
            });
            
            elem.appendChild(kep);
        sor.appendChild(elem);
    }
    tabla.appendChild(sor);
}
jobboldal.appendChild(tabla);
