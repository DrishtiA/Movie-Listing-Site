const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const searchURL = BASE_URL + '/search/movie?' + API_KEY;

// Function to fetch popular movies
const fetchMovies = async () => {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    const movies = data.results;
    displayMovies(movies);
  } catch (error) {
    console.log('Error:', error);
  }
};

// Function to display movies
const displayMovies = (movies) => {
  const movieContainer = document.getElementById('movie-container');
  movieContainer.innerHTML = '';

  movies.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');

    const movieImage = document.createElement('img');
    movieImage.src = IMG_URL + movie.poster_path;
    movieImage.alt = movie.title + ' Poster';

    const movieTitle = document.createElement('h3');
    movieTitle.textContent = movie.title;

    const movieRating = document.createElement('p');
    movieRating.textContent = 'Rating: ' + movie.vote_average;

    movieCard.appendChild(movieImage);
    movieCard.appendChild(movieTitle);
    movieCard.appendChild(movieRating);

    movieContainer.appendChild(movieCard);
  });
};

// Function to search movies
const searchMovies = async (query) => {
  try {
    const response = await fetch(searchURL + '&query=' + query);
    const data = await response.json();
    const movies = data.results;
    displayMovies(movies);
  } catch (error) {
    console.log('Error:', error);
  }
};

// Event listener for the search button
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', () => {
  const searchInput = document.getElementById('search-input');
  const searchTerm = searchInput.value.trim();

  if (searchTerm !== '') {
    searchMovies(searchTerm);
  } else {
    fetchMovies();
  }
});

// Fetch popular movies when the page loads
fetchMovies();
