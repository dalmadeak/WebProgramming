let szamologep = document.querySelector('#szg');

function createTable(){
    let table = document.createElement('table');
    for(let i=0;i<4;i++){
        let row = document.createElement('tr');
        for(let j=0;j<4;j++){
            let data = document.createElement('td');
                let button = document.createElement('button');
                button.innerHTML = '0';
                button.classList.add('buttons');
                data.appendChild(button);
            row.appendChild(data);
        }
        table.appendChild(row);
    }
    szamologep.appendChild(table);
}

function createDisplay(){
    let cbutton = document.createElement('button');
    cbutton.innerHTML = cbutton.id = 'C';
    szamologep.appendChild(cbutton);

    let display = document.createElement('div');
    display.innerHTML = '0';
    display.id = 'display';
    szamologep.appendChild(display);
}

function addButtonName(){
    let gombok = document.querySelectorAll('.buttons');
    let actionButtons = ['/', '*', '-', '\.', '=', '+'];
    let actionIDs = ['per', 'times', 'minus' , 'dot', 'eq' , 'plus'];
    let it = 0;
    let num = 9;
    for(let [index, gomb] of gombok.entries()){
        if((index + 1) % 4 == 0 || index == 13 || index == 14){
            gomb.innerHTML = actionButtons[it];
            gomb.id = actionIDs[it];
            if(it != 3 && it != 4) gomb.classList.add('ops');
            it++;
        } else {
            gomb.classList.add('nums');
            switch(num%3){
                case 0:
                    if(num != 0){ gomb.innerHTML = gomb.id = num-2; num--;} 
                    else gomb.innerHTML = gomb.id = 0;
                    break;
                case 1:
                    gomb.innerHTML = gomb.id = num+2;
                    num--;
                    break;
                default:
                    gomb.innerHTML = gomb.id = num;
                    num--;
                    break;
            }
        }
    }
}

function addEvents(){
    let display = document.querySelector('#display');
    let cbutton = document.querySelector('#C');
    let gombok = document.querySelectorAll('.nums');
    let gombok2 = document.querySelectorAll('.ops');
    let oldNum = 0;
    let newNum = 0;
    let currentOp = '';
    let alreadyDotted = false;

    for(let gomb of gombok){
        gomb.addEventListener('click', ()=>{
            newNum = 0;
            if(display.innerHTML == '0')
                display.innerHTML = gomb.innerHTML;
            else
                display.innerHTML += gomb.innerHTML;

            newNum = parseFloat(display.innerHTML);
        });
    }

    cbutton.addEventListener('click', ()=>{
        display.innerHTML = '0';
        oldNum = newNum = 0;
        currentOp = '';
        alreadyDotted = false;
    });

    gombok2.forEach(element => (element.addEventListener('click', ()=>{
        
        if(currentOp != '')
            newNum = parseFloat(eval(`${parseFloat(oldNum)} ${currentOp} ${parseFloat(newNum)}`).toFixed(10));
        oldNum = newNum;
        display.innerHTML = 0;
        alreadyDotted = false;
    })));

    let dotting = document.querySelector('#dot');
    
    dotting.addEventListener('click', ()=>{if(!alreadyDotted){display.innerHTML += '.';} alreadyDotted = true;});

    let addition = document.querySelector('#plus');
    addition.addEventListener('click', ()=>{currentOp = '+';});

    let substraction = document.querySelector('#minus');
    substraction.addEventListener('click', ()=>{currentOp = '-';});

    let multiplication = document.querySelector('#times');
    multiplication.addEventListener('click', ()=>{ currentOp = '*';});
        
    let division = document.querySelector('#per');
    division.addEventListener('click', ()=>{currentOp = '/';});

    let equals = document.querySelector('#eq');
    equals.addEventListener('click', ()=>{
        if(currentOp != '')
        {
            if(newNum != 0){ display.innerHTML = newNum = parseFloat(eval(`${parseFloat(oldNum)} ${currentOp} ${parseFloat(newNum)}`).toFixed(10));}
            else { display.innerHTML = 'ERROR'}
            currentOp = '';
            alreadyDotted = false;
        }
    });
}

createDisplay();
createTable();
addButtonName();
addEvents();
