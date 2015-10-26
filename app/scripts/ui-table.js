/* global $*/
window.Table = {
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

            return '<tr id="t_' + elem.id + '">' +
                '<td>' + elem.name + '</td>' +
                '<td>' + dateString + '</td>' +
                //'<td>' + elem.round+'</td>' +
                '<td><img src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaGVpZ2h0PSIxNnB4IiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2cHgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6c2tldGNoPSJodHRwOi8vd3d3LmJvaGVtaWFuY29kaW5nLmNvbS9za2V0Y2gvbnMiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48dGl0bGUvPjxkZWZzLz48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGlkPSJJY29ucyB3aXRoIG51bWJlcnMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIj48ZyBmaWxsPSIjMDAwMDAwIiBpZD0iR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0zMzYuMDAwMDAwLCAtMTkyLjAwMDAwMCkiPjxwYXRoIGQ9Ik0zNDcuOTk5OTU5LDE5NSBMMzUwLDE5NSBMMzUwLDE5NiBMMzQ5LDE5NiBMMzQ5LDIwNy4wMDE0OTggQzM0OSwyMDcuNTUyNTExIDM0OC41NTQyNjUsMjA4IDM0OC4wMDQ0MjMsMjA4IEwzMzguOTk1NTc3LDIwOCBDMzM4LjQ0NDgzNywyMDggMzM4LDIwNy41NTI5NTUgMzM4LDIwNy4wMDE0OTggTDMzOCwxOTYgTDMzNywxOTYgTDMzNywxOTUgTDMzOC45OTU1NzcsMTk1IEwzMzkuMDAwMDQyLDE5NSBMMzM5LDE5NC45OTA2MzEgTDMzOSwxOTMuMDA5MzY5IEMzMzksMTkyLjQ0MzM1MyAzMzkuNDQ2NjE2LDE5MiAzMzkuOTk3NTQ1LDE5MiBMMzQ3LjAwMjQ1NSwxOTIgQzM0Ny41NTM2ODksMTkyIDM0OCwxOTIuNDUxOTEgMzQ4LDE5My4wMDkzNjkgTDM0OCwxOTQuOTkwNjMxIFogTTM0MCwxOTQgTDM0MCwxOTUgTDM0NywxOTUgTDM0NywxOTQgQzM0NywxOTMuNDQ3NzE1IDM0Ni41NTIyODUsMTkzIDM0NiwxOTMgTDM0MSwxOTMgQzM0MC40NDc3MTUsMTkzIDM0MCwxOTMuNDQ3NzE1IDM0MCwxOTQgWiBNMzM5LDE5NiBMMzM5LDIwNyBMMzQ4LDIwNyBMMzQ4LDE5NiBaIE0zNDEsMTk3IEwzNDIsMTk3IEwzNDIsMjA2IEwzNDEsMjA2IFogTTM0MywxOTcgTDM0NCwxOTcgTDM0NCwyMDYgTDM0MywyMDYgWiBNMzQ1LDE5NyBMMzQ1LDIwNiBMMzQ2LDIwNiBMMzQ2LDE5NyBMMzQ1LDE5NyBaIE0zNDUsMTk3IiBpZD0iUmVjdGFuZ2xlIDE1OSIvPjwvZz48L2c+PC9zdmc+"/></td>' +
            '</tr>';
        } ).join('');
    }
};