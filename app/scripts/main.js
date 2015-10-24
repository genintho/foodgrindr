/*global Data */
var data = Data.load();
//if(!data) {
//    data = {
//        round: 1
//    };
//    data.restaurant = [{
//        id: 1,
//        name: 'Chipotle',
//        visit: ( (+ new Date()) - 300000000 )
//    }, {
//        id: 2,
//        name: 'Super Duper',
//        visit: ( (+ new Date()) - 100000000 )
//    }, {
//        id: 3,
//        name: 'Jules Vernes',
//        visit: ( (+ new Date()) - 3000 )
//    },
//    {
//        id: 4,
//        name: 'Fleur de sel'
//    }];
//}

data.restaurant.sort(function(a,b){
    return a.visit < b.visit;
});

var pickedPlace = pick();
$('selection').innerText = pickedPlace.name;

$('confirm' ).addEventListener('click', function(){
    pickedPlace.round = data.round;
    pickedPlace.visit = + new Date();
    Data.save(data);
    refreshTable();
});

$('add' ).addEventListener('submit', function(){
    event.preventDefault();
    var newPlaceName = this.elements[0].value;
    data.restaurant.push({
        id: + new Date(),
        name: newPlaceName.trim()
    });
    Data.save(data);
    refreshTable();
});

refreshTable();




function pick(){
    var currentRound = data.round;
    var filtered = data.restaurant.filter(function(place){
        if(place.round === undefined || place.round < currentRound){
            return true;
        }
        return place.visit === undefined;
    });

    if( filtered.length === 0 ){
        filtered = data.restaurant;
        data.round++;
        Data.save(data);
    }

    var pickedIndex = getRandomIntInclusive(0, filtered.length );
    return filtered[pickedIndex];
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
});
