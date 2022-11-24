import { BASE_URL, API_KEY, API_URL, getMovies } from "./movieCard.js";
const SERACH_URL = BASE_URL + '/search/movie?' + API_KEY;
const form = document.getElementById('search-form');
const search = document.getElementById('search');
const Container = document.getElementById('mostWatched')

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
                <span>Your search</span>
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