export {
    setModal,
    searchMovieByid,
    similarMovies
};


const modalMovieContainer = document.getElementById('modalMovieContainer');
const BACKIMG_URL = 'https://image.tmdb.org/t/p/w1280';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const wbtn = document.getElementsByClassName('watchbutton')


async function setModal(id) {
    const movie = await searchMovieByid(id);

    const rating = Math.round(movie.vote_average) / 2
    
    let genres;
    let genresIds = movie.genres;
    genresIds.forEach(element => {
        if (genres == null) {
            genres = element.name;
        } else {
            genres = genres + ", " + element.name
        }
    })

    modalMovieContainer.innerHTML = '';
    modalMovieContainer.innerHTML = `
        <div class="modalMovieSubContainer">
        <div class="modalBanner"> 
            <img src ="${BACKIMG_URL + movie.backdrop_path}" alt ="${movie.title}">              
        </div>
        <div class="xbtn" id="xbtn">
            <img src="home/img/xicon.svg" alt="close modal button">
        </div>
        <div class="modalBtn">
            <button>Play Trailer</button>
        </div>
        <div class="modalTitle">
            <h2>${movie.title}</h2>
        </div>
        <div class="modalDescription">
            <p>${movie.overview}</p>
        </div>
        <div class="infoContainer">
            <div class="info">
                <div class="infoSubContainer">
                    <div class="infoAtt">
                        <h4>Release Date:</h4>
                        <p>${movie.release_date}</p>
                    </div>
                    <div class="infoAtt">
                        <h4>Genre:</h4>
                        <p class="genres">${genres}</p>
                    </div>
                </div>
                <div class="infoSubContainer">
                    <div class="infoAtt">
                        <h4>Original Language:</h4>
                        <p>${movie.original_language}</p>
                    </div>
                    <div class="infoAtt">
                        <h4>Popularity:</h4>
                        <p>${rating}/5</p>
                    </div>
                </div>
            </div>
            <div class="similarMovies">
                <div class="similarTitle">
                    <h4>Similar Movies:</h4>
                </div>
                <div class="similarPosters" id="similarPosters">
                </div>
            </div>
        </div>
    `
    modalMovieContainer.style.visibility = 'visible'
    const closeModal = document.getElementById('xbtn');

    closeModal.addEventListener('click', (e) => {
        e.preventDefault();
        modalMovieContainer.style.visibility = "hidden";
    })

    const otherMoviesContainer = document.getElementById('similarPosters');
    let otherMovies = await similarMovies(movie.id)
    for (let i = 0; i <= 2; i++) {

        const movieEl = document.createElement('div');
        movieEl.classList.add('similarMovie');
        movieEl.setAttribute('id', otherMovies[i].id);
        movieEl.addEventListener('click', function () {
            setModal(otherMovies[i].id)
        });

        movieEl.innerHTML = `
            <img src ="${IMG_URL + otherMovies[i].poster_path}" alt ="${otherMovies[i].title}" id="${otherMovies[i].id}" class="poster">
        `
        otherMoviesContainer.appendChild(movieEl);
    }


}

async function searchMovieByid(movieId) { 
    try { 
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=1cf50e6248dc270629e802686245c2c8&language=en-US`;
        const res = await fetch(url);
        const movie = await res.json();
        return movie
    }
    catch (e) { console.log(e) }
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
