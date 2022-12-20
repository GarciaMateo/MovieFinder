export { API_KEY, BASE_URL,API_URL, getMovies};

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BACKIMG_URL = 'https://image.tmdb.org/t/p/w1280';

const movieContainer = document.getElementById('movieContainer')
const bannerContainer = document.getElementById('bannerContainer')

getMovies(API_URL)

// This funtion gets the array whit 20 movies data from the db
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results.slice(1, 20)) 
        bannerMovie(data.results[0]); 
    })
}

//This function creates the banner movie
function bannerMovie(data) { 
    bannerContainer.innerHTML = '';
    var star = rating(Math.round(data.vote_average) / 2);
    bannerContainer.innerHTML =`
        <div class="bannerImg" id="bannerImg">
            <img src ="${BACKIMG_URL +data.backdrop_path}" alt ="${data.title}">
        </div>
        <div class="bannerSubcontainer">
            <div class="bannerGenere">
                <span>Genere</span>
            </div>
            <div class="bannerRating">
                <span>${star}</span>
            </div>
            <div class="bannerTitle">
            <h1>${data.title}</h1>
            </div>
            <div class="bannerDescription">
                <p>${data.overview}</p>
            </div>
            <div class="watch-button">
                <button>Watch Now</button>
            </div>
        </div>
    `
}

// Create cards from every movie
function showMovies(data) { 
    //Set the inner html as an empy string
    movieContainer.innerHTML = '';

    data.forEach(movieCard => {
        //select what info we want from the json
        const { title, poster_path, vote_average, overview } = movieCard;
        // create a HTML div 
        const movieEl = document.createElement('div');
        //create a calss for that div
        movieEl.classList.add('movieCard');
        movieEl.classList.add('grid');

        var star = rating(Math.round(vote_average) / 2);

        movieEl.innerHTML = `
            <div class="movieImg">
                <img src ="${IMG_URL+poster_path}" alt ="${title}">
            </div>
            <div class="movieTitle">
                <h3>${title}</h3>
            </div>
            <div class="movieRating">
                <span>${star}<span>
            </div>
            <div class="movieDesc">
                <p>${overview}</p>
            </div>
            `
        //append all the elements to the html
        movieContainer.appendChild(movieEl);

    });

}

// calculate the rating of the movie in a scale of one to five stars
function rating(data) {
    var star = '';
    for (let i = 1; i <= (data); i++) {
        star = star + '★';
    }
    /* Half star
    if ((Math.round(vote_average) % 2)) {
    
    star = star + '&#11240';
    }
    */
    return star
}

