import {
    BASE_URL,
    API_KEY,
    getMovies,
    bannerMovie,
    showMovies
} from "./movieCard.js";

import {
    searchMovieByid
} from "./modalDisplay.js";

const SERACH_URL = BASE_URL + '/search/movie?' + API_KEY;
const form = document.getElementById('searchForm');
const search = document.getElementById('search');
const Container = document.getElementById('mostWatched');
const preSearchContainer = document.getElementById('preSearchContainer');
const IMG_URL = 'https://image.tmdb.org/t/p/w500'; 


form.addEventListener('submit', (e) => {
    // prevent default submition
    e.preventDefault();
    const searchTerm = search.value;

    // if serachTerm exists execute the serach
    if (searchTerm) {
        Container.innerHTML = '';
        searchMovie(searchTerm);
    }
})

//Search function 

async function searchMovie(searchTerm) {
    const movieData = await getMovies(SERACH_URL + '&query=' + searchTerm);
    const cardsData = movieData.slice(1, 20);
    bannerMovie(movieData[0]);
    showMovies(cardsData);

    Container.innerHTML=''
    const yourSearch = document.createElement('div');
    //create a calss for that div
    yourSearch.classList.add('mostWatched1');

    yourSearch.innerHTML = `
                <span>Results for "${searchTerm}"</span>
            `
    //append all the elements to the html
    Container.appendChild(yourSearch);

    search.value = ' '
    document.getElementById('preSearchContainer').innerHTML = ''
    document.getElementById('preSearchContainer').className = 'preSearchContainer hidden';
}


// execute the function preSearch when the user is typing 
search.onkeyup = function() {preSearch()};

function preSearch() {
    const searchTerm = (search.value).trim();
    if(searchTerm.length > 2){
        document.getElementById('preSearchContainer').className = 'preSearchContainer visible';
        preSearchResults();
    }
    else{
        document.getElementById('preSearchContainer').className = 'preSearchContainer hidden';
    }
}

// Function that shows the pre search results

async function preSearchResults() {

    const searchTerm = search.value;
    const data = await getMovies((SERACH_URL + '&query=' + searchTerm));
    const movie = data.slice(0,5);

    preSearchContainer.innerHTML='';
    
    movie.forEach(movieCard => {
        const { title, poster_path, id} = movieCard;
        const movieEl = document.createElement('div');

        movieEl.classList.add('preSearch');
        movieEl.setAttribute('id', id);
        movieEl.addEventListener('click', async function () {
            const banner = await searchMovieByid(id);
            bannerMovie(banner);
            const cards = await similarMovies(id);
            showMovies(cards);

            Container.innerHTML = ''

            const yourSearch = document.createElement('div');
            //create a calss for that div
            yourSearch.classList.add('mostWatched1');
            yourSearch.innerHTML = `
                <span>Similar to "${banner.title}"</span>
            `
            //append all the elements to the html
            Container.appendChild(yourSearch);
            search.value = ''
            document.getElementById('preSearchContainer').innerHTML=''
            document.getElementById('preSearchContainer').className = 'preSearchContainer hidden';
        });

        movieEl.innerHTML = 
        `
            <img src ="${IMG_URL+poster_path}" alt ="${title}">
            <h3>${title}</h3>
        `
        preSearchContainer.appendChild(movieEl);
        
    })

}


async function similarMovies(movieId) {
    try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=1cf50e6248dc270629e802686245c2c8&language=en-US&page=1`;
        const res = await fetch(url);
        const movie = await res.json();
        const movieData = await movie.results
        return movieData
    }
    catch (e) { console.log(e) }
}
