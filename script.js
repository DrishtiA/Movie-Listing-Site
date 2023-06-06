const API_KEY = 'api_key=f1810bab6f7dd382d507978037bc816d';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

async function fetchMovieData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    displayMovieData(data.results);
  } catch (error) {
    console.error('Error fetching movie data:', error);
  }
}

function displayMovieData(movies) {
  const container = document.querySelector('.container');
  container.innerHTML = '';

  movies.forEach((movie) => {
    const box = document.createElement('div');
    box.classList.add('box');

    const title = document.createElement('h2');
    title.textContent = movie.title;


    const poster = document.createElement('img');
    poster.src = IMG_URL + movie.poster_path;
    poster.alt = movie.title;

    box.appendChild(poster);
    box.appendChild(title);

    container.appendChild(box);
  });
}

// Call the fetchMovieData function to fetch and display movie data
fetchMovieData();
