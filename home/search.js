import { BASE_URL, API_KEY, API_URL, getMovies } from "./movieCard.js";

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

    Container.innerHTML = '';
    // if serachTerm exists execute the serach
    if (searchTerm) {
        getMovies(SERACH_URL + '&query=' + searchTerm)

        const yourSearch = document.createElement('div');
        //create a calss for that div
        yourSearch.classList.add('mostWatched1');

        yourSearch.innerHTML = `
                <span>Results for "${searchTerm}"</span>
            `
        //append all the elements to the html
        Container.appendChild(yourSearch);
    }
    // if sumbit without text returns to the most watched movies
    else {
        
        getMovies(API_URL)
        const yourSearch = document.createElement('div');
        //create a calss for that div
        yourSearch.classList.add('mostWatched1');

        yourSearch.innerHTML = `
                <span>Most Watched Movies</span>
            `
        //append all the elements to the html
        Container.appendChild(yourSearch);
        
    }
})

// execute the function preSearch when the user is typing 
search.onkeyup = function() {preSearch()};

function preSearch() {
    const searchTerm = (search.value).trim();
    if(searchTerm.length > 2){
        document.getElementById('preSearchContainer').className = 'preSearchContainer visible';  
    }
    else{
        document.getElementById('preSearchContainer').className = 'preSearchContainer hidden';
    }
}

search.addEventListener('onkeyup', (e) => {
    const searchTerm = search.value;
    fetch(SERACH_URL + '&query=' + searchTerm).then(res => res.json()).then(data => {
        preSearchResults(data.results.slice(0, 4));
        console.log(data.results.slice(0,4));
})
})

function preSearchResults() {
    const searchTerm = search.value;
    fetch(SERACH_URL + '&query=' + searchTerm).then(res => res.json()).then(data => {
        const results = (data.results.slice(0, 4));
        console.log(data.results.slice(0,4));
    })
    preSearchContainer.innerHTML='';
    results.forEach( movie => {
        const { title, poster_path} = movie;
        const movieEl = document.createElement('div');
        movieEl.classList.add('preSearch');
        movieEl.innerHTML = `
            <img src ="${IMG_URL+poster_path}" alt ="${title}">
            <h3>${title}</h3>
        `
        preSearchContainer.appendChild(movieEl);
    })
}

