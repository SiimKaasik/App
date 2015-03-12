
     //POPULAARSETE FILMIDE SAAMINE
                
      function popularMovies() {
         var url = 'http://api.themoviedb.org/3/movie/popular?query&api_key=42a8123408c5a55c08ab4a2bb5b4fa76';
                    
         $.getJSON(url, function(data){
            console.log('pealkiri',data);
                for(var i = 0; i < 20; i++){
                       
                $("#matsioon").append('<li><img onclick="makeDetails('+data.results[i].id+');trailer('+data.results[i].id+')" src= "' + 'http://image.tmdb.org/t/p/w92' +
                    data.results[i].poster_path + '"><br>'+data.results[i].title+'<br>'+data.results[i].release_date+' </li>'); 

            
                 }


                    });
}

//FILMIDE LISAMINE WATCHLISTI
function makeArray(nr){
    var url = 'https://api.themoviedb.org/3/movie/'+nr+'?api_key=42a8123408c5a55c08ab4a2bb5b4fa76';
$.getJSON(url, function(data){
var movieName = data.title + '<br>' + data.release_date + '<br>' + '<input type ="button" value="Delete" id="deleteButton" class="ui-btn" onclick="removeArray('+nr+')"><img onclick="makeDetails('+data.id+');trailer('+data.id+')" src= "' + 'http://image.tmdb.org/t/p/w154' + data.poster_path + '"';
    if(typeof(Storage) !== undefined){
        var movies = localStorage['movies'];
        if(movies === undefined){
            movies = "{}";
        }
    var movieObject = JSON.parse(movies);
        movieObject.unshift(movieName);

        //movieObject[data.id] = movieName;
        localStorage['movies'] = JSON.stringify(movieObject);
        loadMovies();
        console.log('number',nr);

        }

    });
}



function loadMovies(){    
    if(typeof(Storage) !== 'undefined' && localStorage['movies'] !== 'undefined'){
        
        var movies = JSON.parse(localStorage['movies']);
        console.log('muuvi', movies);
         for(nr in movies) {
    
        var data = {};

            data.title        = movies[nr].split("<br>")[0];
            data.release_date = movies[nr].split("<br>")[1];
            data.poster_path  = movies[nr].split("<br>")[2];
            console.log('logimine', data.poster_path);
        var movieName = '<div id=' + nr + '>' + data.title + '<br>' + data.release_date + '<br>' + '<input type ="button" value="Delete" id="deleteButton" class="ui-btn" onclick="removeArray('+nr+')"><form><img onclick="makeDetails('+data.id+');trailer('+data.id+')" src= "' + 'http://image.tmdb.org/t/p/w154' + data.poster_path + '></form></div>';
        
        $('#demomine').append(movieName);
         
            }
            
        }
}



function toggle(id) {
    if($("#array"+id.toString()).val() == "Remove") {
        $("#array"+id.toString()).attr('value', 'Add');
        $("#array"+id.toString()).attr('onclick', 'toggle('+id+');makeArray('+id+');');
    } else {
        $("#array"+id.toString()).attr('value', 'Remove');
        $("#array"+id.toString()).attr('onclick', 'toggle('+id+');removeArray('+id+');');
    }
}
//FILMIDE EEMALDAMINE WATCHLISTIST
function removeArray(nr){
    delete localStorage.movies[nr];
    $('#' + nr).remove();
}





//CHANGEVALUE
function changeValue(dem){  
    
        document.getElementById("array").value="Added";

}

//TRAILER
function trailer(trail){
var url = 'https://api.themoviedb.org/3/movie/'+trail+'?api_key=42a8123408c5a55c08ab4a2bb5b4fa76&append_to_response=releases,trailers';
var trailers = [""];
$.getJSON(url, function(data){
    console.log('Trailerid',data);

    trailers.push($('#trailer').append('<form>' + '<iframe width="300" height="200" class="youtube-player" type="text/html" src="https://www.youtube.com/v/'+data.trailers.youtube[0].source+ '" frameborder="0"></iframe></form>'));
});
    document.getElementById("trailer").innerHTML = trailers;
}


    //DETAILVAADE
    function makeDetails(uno){
        //NIMI, KUUPÄEV, POSTER
        var url = 'https://api.themoviedb.org/3/movie/'+uno+'?api_key=42a8123408c5a55c08ab4a2bb5b4fa76';
        var theURL = 'http://api.themoviedb.org/3/movie/'+uno+'/credits?api_key=42a8123408c5a55c08ab4a2bb5b4fa76';
        var details = [""];

        if(typeof(Storage) !== 'undefined')
                        var movies123 = localStorage['movies'];
                        if(movies123 === undefined){
                            movies123 = "{}";   
                        }
                    var localMovies = JSON.parse(movies123);
        var value = "Add";
        var buttonFunction = "makeArray";
        if(localMovies.hasOwnProperty(uno)) {
            value = "Remove";
            buttonFunction = "removeArray";
        }
             $.getJSON(url, function(data){
                console.log('Detailid',data);
                details.unshift($('#specs').append('<form><b><br> Movie name: </b><br>' + data.title +'</form>') + $('#specs').append('<br><form><b> Overview: </b><br>' + data.overview +'</form>') + $('#specs').append('<br><form>' + '<b>Release Date: </b><br>' + data.release_date+'<br><br></form>') + $('#specs').append('<form>' + '<img src= "' + 'http://image.tmdb.org/t/p/w185' + data.poster_path + '" alt="Submit"></form><form><input type="button" value="'+value+'" id="array'+data.id+'" class="ui-butn" onclick="toggle('+data.id+');'+buttonFunction+'('
                        +data.id+');"></form>'));
                });
         //NÄITLEJAD JA TEGELASED
             $.getJSON(theURL, function(data){
                console.log('Actors', data);
              
                for(var i = 0; i < 10; i++){

                $('#specs').append('<form> <b>' + data.cast[i].name + ' </b>as ' + data.cast[i].character + '</form>');

                }
            });
                document.getElementById("specs").innerHTML = details;
                $.mobile.navigate( "#pagefour", { transition : "pop"});
        }


//FILMIDE OTSING

$('#searchValue').on('input', function(){
    searching($('#searchValue').val());
    console.log("hola")

});


            function searching(){
               
                    $('#info').empty();
                   var search = $('#searchValue').val();
                   var url = 'http://api.themoviedb.org/3/search/movie?query='+search+'&api_key=42a8123408c5a55c08ab4a2bb5b4fa76';
                    $.getJSON(url, function(data){
                        console.log('otsing',data);
                        console.log(search);
                         saveSearch(search);
                         for(var i = 0; i < 20; i++){
                           $("#info").append('<li><img onclick="makeDetails('+data.results[i].id+');trailer('+data.results[i].id+')" src= "' + 'http://image.tmdb.org/t/p/w92' +
                             data.results[i].poster_path + '"><br>'+data.results[i].title+'<br>'+data.results[i].release_date+'</li>');
                         }                      
                       
                    });
              

        }
            function saveSearch(search){
                
                    if(typeof(Storage) !== 'undefined'){
                        var searches = localStorage['searches'];
                        if(searches === undefined){
                            searches = "[]";   
                        }
                    //String to JSON    
                    var searchObject = JSON.parse(searches);
                    //Add new
                    searchObject.push(search);    
                    // Save
                    localStorage['searches'] = JSON.stringify(searchObject);
                        loadSearches();
                    }
                }

                                  
            function loadSearches(){
                           if(typeof(Storage) !== 'undefined' && localStorage['searches'] !== 'undefined'){
                                var searches = JSON.parse(localStorage['searches']);          
                               $('#searches').empty();
                                for(var i = 0; i < searches.length; i++){
                                    $('#searches').append('<option value="' + searches[i] + '"' );   
                                                          
                                }
                           }
                    }
                loadSearches();

            
   // });

