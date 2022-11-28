export { API_KEY, BASE_URL,API_URL, getMovies};

const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const movieContainer = document.getElementById('movieContainer')

getMovies(API_URL)

// This funtion gets the array whit 20 movies data from the db
function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        showMovies(data.results)
    })
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
        // calculate the rating of the movie in a scale of one to five stars
        let star ='' 
        for (let i = 1; i <= (Math.round(vote_average) / 2); i++) {
            star = star + '★';  
        }
        /* Half star
        if ((Math.round(vote_average) % 2)) {
            
            star = star + '&#11240';
        }
        */
        
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


