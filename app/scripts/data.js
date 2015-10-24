window.Data = {
    /**
     * @return {AppData}
     */
    load: function(){
        var data = localStorage.getItem('data');
        if(data !== null ){
            try{
                return JSON.parse( data );
            }catch(e ){
                console.alert(e); // eslint-disable-line no-console
            }
        }
        return {
            round: 1,
            restaurants: []
        };
    },

    save: function(data){
        try{
            localStorage.setItem( 'data', JSON.stringify( data ) );
        }catch(e){
            console.alert(e); // eslint-disable-line no-console
        }
    },

    pick: function(data){
        if(data.restaurants.length === 0 ){
            return null;
        }

        var filtered = this.getPickable(data);

        if( filtered.length === 0 ){
            filtered = data.restaurants;
            data.round++;
            this.save(data);
        }

        var pickedIndex = Math.floor( Math.random() * filtered.length );
        return filtered[pickedIndex];
    },

    getPickable: function(data){
        var currentRound = data.round;
        return data.restaurants.filter(function(place){
            if(place.round === undefined || place.round < currentRound){
                return true;
            }
            return place.visit === undefined;
        });
    }
};
