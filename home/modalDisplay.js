export { setModal, searchMovieByid };

const modalMovieContainer = document.getElementById('modalMovieContainer');
const BACKIMG_URL = 'https://image.tmdb.org/t/p/w1280';

async function setModal(id) {
    const movie = await searchMovieByid(id);

    modalMovieContainer.innerHTML = '';
    modalMovieContainer.innerHTML = `
        <div class="modalMovieSubContainer">
        <div class="modalBanner"> 
            <img src ="${BACKIMG_URL + movie.backdrop_path}" alt ="${movie.title}">              
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
                        <p>15-10-1999</p>
                    </div>
                    <div class="infoAtt">
                        <h4>Genre:</h4>
                        <p>Horror</p>
                    </div>
                </div>
                <div class="infoSubContainer">
                    <div class="infoAtt">
                        <h4>Original Language:</h4>
                        <p>spanish</p>
                    </div>
                    <div class="infoAtt">
                        <h4>Popularity:</h4>
                        <p>4/5</p>
                    </div>
                </div>
            </div>
            <div class="similarMovies">
                <div class="similarTitle">
                    <h4>Similar Movies:</h4>
                </div>
            </div>
        </div>
    `
    modalMovieContainer.style.visibility='visible'
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
