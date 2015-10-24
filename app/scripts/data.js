var Data = {
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
    }
};