function delegal(szulo, gyerek, mikor, mit){
    function esemenyKezelo(esemeny){
        let esemenyCelja    = esemeny.target;
        let esemenyKezeloje = this;
        let legkozelebbiKeresettElem = esemenyCelja.closest(gyerek);

        if(esemenyKezeloje.contains(legkozelebbiKeresettElem)){
            mit(esemeny, legkozelebbiKeresettElem);
        }
    }
    szulo.addEventListener(mikor, esemenyKezelo);
}

let termekek = document.querySelector('#adatok ul');

function zoldHatter(esemeny, elem){
    elem.classList.toggle('termek');
}

function vastagBetu(esemeny, elem){
    let szallitmany = elem.closest('.szallitmany');                              
    if(elem.innerHTML.startsWith('É')) szallitmany.classList.toggle('erkezes');
    if(elem.innerHTML.startsWith('P')) szallitmany.classList.toggle('polc');
}

delegal(termekek, '.szallitmany ul li', 'click', zoldHatter);
delegal(termekek, '.szallitmany div', 'click', vastagBetu);