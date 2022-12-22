export { API_KEY, BASE_URL, API_URL, getMovies, bannerMovie, showMovies };
import { setModal } from './modalDisplay.js';

const API_KEY ='api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const BACKIMG_URL = 'https://image.tmdb.org/t/p/w1280';

const listViewBtn = document.getElementById('list');
const movieContainer = document.getElementById('movieContainer');
const bannerContainer = document.getElementById('bannerContainer');


async function getMovies(url) {
    try {
        const res = await fetch(url)
        const movie = await res.json()
        const movieData = await movie.results
        return movieData
    }
    catch (e) { console.log(e) }
}


const moviesData = await getMovies(API_URL);

bannerMovie(moviesData[0]);

function bannerMovie(movie) {


    bannerContainer.innerHTML = '';
    var star = rating(Math.round(movie.vote_average) / 2);
    let genres;
    if ("genre_ids" in movie) {
        let genresIds = movie.genre_ids;
        genresIds.forEach(element => {
            let gen = getGenreByid(element)
            if (genres == null) {
                genres = gen;
            } else {
                genres = genres + ", " + gen
            }
        })
    } else if ("genres" in movie) {
        let genresIds = movie.genres;
        genresIds.forEach(element => {
            if (genres == null) {
                genres = element.name;
            } else {
                genres = genres + ", " + element.name
            }
        })
    }
    
    let description = ellipsify(movie.overview,300)
    
    bannerContainer.innerHTML = `
        <div class="bannerImg" id="bannerImg">
            <img src ="${BACKIMG_URL + movie.backdrop_path}" alt ="${movie.title}">
        </div>
        <div class="bannerSubcontainer">
            <div class="bannerGenre">
                <span>${genres}</span>
            </div>
            <div class="bannerRating">
                <span>${star}</span>
            </div>
            <div class="bannerTitle">
            <h1>${movie.title}</h1>
            </div>
            <div class="bannerDescription">
                <p>${description}</p>
            </div>
            <div class="watch-button" id="btn${movie.id}">
                <button>Watch Now</button>
            </div>
        </div>
    `
    let btnid = 'btn' + movie.id
    let wbtn = document.getElementById(btnid)

    wbtn.addEventListener('click', function () {
        setModal(movie.id)
    });

}

const cardsData = moviesData.slice(1, 20)
showMovies(cardsData);

function showMovies(movie) {

    movieContainer.innerHTML = '';

    const listView = listViewBtn.className;

    movie.forEach(movieCard => {
        //select what info we want from the json
        const { title, poster_path, vote_average, overview, backdrop_path, id } = movieCard;
        // create a HTML div 
        const movieEl = document.createElement('div');
        //create a calss for that div
        movieEl.classList.add('movieCard');
        movieEl.classList.add('grid');
        movieEl.setAttribute('id', id);

        movieEl.addEventListener('click', function () {
            setModal(id)
        });
         
    
        var star = rating(Math.round(vote_average) / 2);

        let description = ellipsify(overview,100)

        movieEl.innerHTML = `
        <div class="movieImg">
            <img src ="${IMG_URL + poster_path}" alt ="${title}">
        </div>
        <div class="movieTitle">
            <h3>${title}</h3>
        </div>
        <div class="movieRating">
            <span>${star}<span>
        </div>
        <div class="movieDesc">
            <p>${description}</p>
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

getGenres()

async function getGenres() {
    try {
        const url = 'https://api.themoviedb.org/3/genre/movie/list?'+ API_KEY + '&language=en-US'
        const res = await fetch(url)
        const genres = await res.json();

        const genresString = JSON.stringify(genres);
        sessionStorage.setItem("genres", genresString);
    }
    catch (e) { console.log(e) }
}


function getGenreByid(genreId) {

    const genresString = sessionStorage.getItem("genres");
    const genresArray = JSON.parse(genresString); 
    const genre = genresArray.genres.find(genre => genre.id === genreId)


    return genre.name
}

function ellipsify(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength - 3) + '...';
    }
    return text;
}