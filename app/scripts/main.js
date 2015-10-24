/*global Data, Table */

document.addEventListener("DOMContentLoaded", function(event) {
    bindEvents();

    var data = Data.load();
    Table.refresh(data.restaurants);

    var pickedPlace = pick(data);
    if(pickedPlace){
        $( 'selection-label' ).innerText = pickedPlace.name;
    }
    else{
        $('selection-container' ).classList.add('hidden');
    }

});

function bindEvents(){
    bindConfirm();
    bindAdd();
    bindClear();
}

function bindConfirm(){
    $( 'confirm' ).addEventListener( 'click', function (){
        pickedPlace.round = data.round;
        pickedPlace.visit = +new Date();
        Data.save( data );
        refreshTable();
    } );
}

function bindAdd(){
    $('add').addEventListener('submit', function(){
        event.preventDefault();
        var newPlaceName = this.elements[0].value;
        var data = Data.load();
        data.restaurants.push({
            id: + new Date(),
            name: newPlaceName.trim()
        });
        Data.save(data);
        Table.refresh(data.restaurants);
        this.elements[0].value = '';
    });
}

function bindClear(){
    $( 'clear' ).addEventListener( 'click', function (){
        localStorage.removeItem( 'data' );
        window.location.reload();
    } );
}



function pick(data){
    var currentRound = data.round;
    if(data.restaurants.length === 0 ){
        return null;
    }

    var filtered = data.restaurants.filter(function(place){
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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Utils
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
    return Math.floor( Math.random() * (max - min)) + min;
}


function $(id){
    return document.getElementById(id);
}

