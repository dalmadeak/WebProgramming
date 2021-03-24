let adatok = [
    {
        felev: '14/15/1',
        atlag: 2.13
    },
    {
        felev: '14/15/2',
        atlag: 2.21
    },
    {
        felev: '15/16/1',
        atlag: 2.19
    },
    {
        felev: '15/16/2',
        atlag: 2.13
    },
    {
        felev: '16/17/1',
        atlag: 3.05
    },
    {
        felev: '16/17/2',
        atlag: 3.54
    },
    {
        felev: '17/18/1',
        atlag: 3.91
    },
    {
        felev: '17/18/2',
        atlag: 4.23
    },
    {
        felev: '18/19/1',
        atlag: 4.94
    },
    {
        felev: '18/19/2',
        atlag: 5.17
    },
    {
        felev: '19/20/1',
        atlag: 5.80
    },
    {
        felev: '19/20/2',
        atlag: 6.45
    }
];

let vaszon = document.querySelector('canvas');
let ecset  = vaszon.getContext('2d');

let i = 1;
for(let adat of adatok) {
    ecset.fillRect(i*20, 400, 60, -(adat.atlag * 50));
    ecset.font = '15px Arial';
    ecset.fillText(adat.felev, i*20, 400 - (adat.atlag * 50) - 35);
    ecset.fillText(adat.atlag, i*20, 400 - (adat.atlag * 50) - 15);
    i += 4;
}