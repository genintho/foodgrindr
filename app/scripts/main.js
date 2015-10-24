/*global Data, Table */

document.addEventListener("DOMContentLoaded", function() {
    var data = Data.load();
    Table.refresh(data.restaurants);

    var pickedPlace = Data.pick(data);
    if(pickedPlace){
        $( 'selection-label' ).innerText = pickedPlace.name;
    }
    else{
        $('selection-container' ).classList.add('hidden');
    }

    bindConfirm(pickedPlace);
    bindAdd();
    bindClear();
});

function bindConfirm(pickedPlace){
    $( 'confirm' ).addEventListener( 'click', function (){
        var data = Data.load();
        pickedPlace.round = data.round;
        pickedPlace.visit = +new Date();
        Data.save( data );
    } );
}

function bindAdd(){
    $('add').addEventListener('submit', function(event){
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

// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Utils
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

function $(id){
    return document.getElementById(id);
}

