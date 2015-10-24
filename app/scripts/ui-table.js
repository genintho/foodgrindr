var Table = {
    refresh: function(restaurants){
        var $list= $('list-container');
        if(restaurants.length === 0 ){
            $list.classList.add('hidden');
            return;
        }

        $list.classList.remove('hidden');

        restaurants.sort(function(a,b){
            return a.visit < b.visit;
        });

        $('list').innerHTML = restaurants.map(function(elem){
            var dateString = '';
            if( elem.visit ){
                var options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
                dateString = new Date(elem.visit).toLocaleDateString(navigator.language, options)
            }

            return '<tr><td>' + elem.name + '</td><td>' + dateString + '</td><td>'+elem.round+'</td></tr>';
        } ).join('');
    }
};