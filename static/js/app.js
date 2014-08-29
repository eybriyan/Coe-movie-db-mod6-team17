    var config;
    var baseUrl = 'http://api.themoviedb.org/3/';
    var api_key = 'c1709b6f3d9d558eb9a39ec2584bb9c7';


    function initialize(callback) {
        $.get(baseUrl + 'configuration', {
            api_key: 'c1709b6f3d9d558eb9a39ec2584bb9c7'
        },function(res) {
            config = res;
            callback(config);
        });
    }

    function setEventHandlers(config) {
        $('#form-search').submit(function() {
            var query = $('.input-query').val();
            searchMovie(query);
            return  false;
        });

        $('.nowshow').click(function() {
            loadNowShowing();
            return  false;
        });
        $('.upcoming').click(function() {
            upcoming();
            return  false;
        });

        $('.popular').click(function() {
            popular();
            return  false;
        });
        $('.toprate').click(function() {
            toprated();
            return  false;
        });
        loadNowShowing();
    }
    function searchMovie(query) {
        var searchUrl = baseUrl + 'search/movie';
        $('.movies-list').html('');
        $.get(searchUrl, {
            query: query,
            api_key: api_key
        }, function(response) {
            displayMovies(response);
        });
    }
    function displayMovies(data) {
        data.results.forEach(function(movie) {
            var imageSrc = config.images.base_url + config.images.poster_sizes[3] + movie.poster_path;
            var htmlStr = [
                            '<div class="col-md-4 portfolio-item">',
                                '<a href="/view/'+movie.id+'">',
                                    '<img class="img-responsive" style="border-style:solid;border-width:5px;border-color:black;height:500px;width:350px"src="' + imageSrc + '" alt="">',
                                '</a>',
                                '<h3><center><font face="Maiandra GD">',
                                    '<a href="/view/'+movie.id+'" style="color:black">' + movie.title +'</a>',
                                '</font></center></h3>',
                            '</div>'
                            ];
            $('.movies-list').append($(htmlStr.join('')));
        });
    }

    function loadNowShowing() {
        var nowShowingUrl = baseUrl + 'movie/now_playing';
        $('.movies-list').html('');
        $.get(nowShowingUrl, {
            api_key: api_key
        }, function(response) {
            displayMovies(response);
        });
    }
    

    function upcoming() {
        var upcomingUrl = baseUrl + 'movie/upcoming';
        $('.movies-list').html('');
        $.get(upcomingUrl, {
            api_key: api_key
        }, function(response) {
            displayMovies(response);
        });
    }
    

    function popular() {
        var popularUrl = baseUrl + 'movie/popular';
        $('.movies-list').html('');
        $.get(popularUrl, {
            api_key: api_key
        }, function(response) {
            displayMovies(response);
        });
    }

    function toprated() {
        var topratedUrl = baseUrl + 'movie/top-rated';
        $('.movies-list').html('');
        $.get(topratedUrl, {
            api_key: api_key
        }, function(response) {
            displayMovies(response);
        });
    }
    
    

    function movieView(id){
    $("movie-list").hide();
    console.log(id);
    url = baseUrl + "movie/"+id;
    reqParam = {api_key:api_key};
    $.get(url,reqParam,function(response){
        $("#title").html(response.original_title);
        $("#overview").html(response.overview);

        url = baseUrl + "movie/"+id+"/videos";
        $.get(url,reqParam,function(response){
            var html = '<embed width="750" height="500" src="https://www.youtube.com/v/'+response.results[0].key+'" type="application/x-shockwave-flash">'
            $("#trailer").html(html);
        });

        url = baseUrl + "movie/"+id+"/credits";
        $.get(url,reqParam,function(response){
            var casts = "";
            for(var i=0;i<response.cast.length;i++){
                casts+="<li style = 'display:inline-block;padding:20px;float:left;font-family:Impact;font-size:16px;'>"+response.cast[i].name+"</li>"
            }
            $("#casts").html(casts);
        });

        url = baseUrl + "movie/"+id+"/similar";
        $.get(url,reqParam,function(response){
            var movies = response.results;
            var allMovies = "";
            var poster = config.images.base_url + config.images.poster_sizes[1];
            for(var i=0;i<movies.length;i++){
                allMovies += '<div class="col-sm-3 col-xs-6">'+
                                '<a href="/movie/'+movies[i].id+'">'+
                                    '<img class="img-responsive portfolio-item" src="'+poster+movies[i].poster_path+'" alt="">'+
                                '</a>'+
                                '<h5>'+
                                    '<a href="/movie/'+movies[i].id+'">'+movies[i].title+'</a>'+
                                '</h5>'+
                              '</div>';
            }
            $("#similar").html(allMovies);
        });

    });
}
$(document).ready(function(){

    $(".toprate, .popular, .upcoming, .nowshow").click(function(){
        $(".movie-view").hide();
        $(".movies-list").show();
    });
    initialize(setEventHandlers);
});