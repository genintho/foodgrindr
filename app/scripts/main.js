console.log('\'Allo \'Allo!'); // eslint-disable-line no-console


var data = localStorage.getItem('data');
if(data !== null ){
    try{
        data = JSON.parse( data );
        console.log('success')
    }catch(e ){

    }
}
if (data === null ) {
    data = {
        round: 1
    };
    data.restaurant = [{
            id: 1,
            name: 'Chipotle',
            visit: ( (+ new Date()) - 300000000 )
        }, {
            id: 2,
            name: 'Super Duper',
            visit: ( (+ new Date()) - 100000000 )
        },
        {
            id: 3,
            name: 'Jules Vernes',
            visit: ( (+ new Date()) - 3000 )
        },
        {
            id: 4,
            name: 'Fleur de sel'
        }
    ];
}

data.restaurant.sort(function(a,b){
    return a.visit < b.visit;
});

var pickedPlace = pick();
$('selection').innerText = pickedPlace.name;

$('confirm' ).addEventListener('click', function(){
    pickedPlace.round = data.round;
    pickedPlace.visit = + new Date();
    saveData();
    refreshTable();
});

$('add' ).addEventListener('submit', function(e){
    event.preventDefault();
    var newPlaceName = this.elements[0].value;
    data.restaurant.push({
        id: + new Date(),
        name: newPlaceName.trim()
    });
    saveData();
    refreshTable();
});

refreshTable();




function pick(){
    var currentRound = data.round;
    var filtered = data.restaurant.filter(function(place){
        if(place.round === undefined || place.round < currentRound){
            return true;
        }
        if(place.visit === undefined ){
            return true;
        }
        return false;
    });

    if( filtered.length === 0 ){
        console.log('nothing to pick, reset round!')
        filtered = data.restaurant;
        data.round++;
        saveData();
    }

    var pickedIndex = getRandomIntInclusive(0, filtered.length );
    console.log(filtered.length, pickedIndex);
    return filtered[pickedIndex];
}


function saveData(){
    try{
        localStorage.setItem( 'data', JSON.stringify( data ) );
        console.log( 'save data', JSON.stringify( data ) );
        localStorage.setItem( 'data', JSON.stringify( data ) );
    }catch(e){
        console.log(e);
    }
}

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
    return Math.floor( Math.random() * (max - min)) + min;
}
function refreshTable(){
    document.getElementById('list').innerHTML = data.restaurant.map(function(elem){
        var dateString = '';
        if( elem.visit ){
            var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            dateString = new Date(elem.visit).toLocaleDateString(navigator.language, options)
        }

        return '<tr><td>' + elem.name + '</td><td>' + dateString + '</td><td>'+elem.round+'</td></tr>';
    } ).join('');
}
function $(id){
    return document.getElementById(id);
}

$('clear').addEventListener('click', function(){
    localStorage.removeItem('data');
    window.location.reload();
})