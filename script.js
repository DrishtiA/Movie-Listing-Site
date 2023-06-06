// Function to fetch movie data from the API
async function fetchMovieData() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      return data.results;
    } catch (error) {
      console.log('Error fetching movie data:', error);
      return [];
    }
  }
  
  // Function to create a movie card element
  function createMovieCard(movie) {
    const movieCard = document.createElement('div');
    movieCard.classList.add('movie-card');
  
    const image = document.createElement('img');
    image.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
    image.alt = movie.title;
    movieCard.appendChild(image);
  
    const title = document.createElement('h3');
    title.textContent = movie.title;
    movieCard.appendChild(title);
  
    const releaseDate = document.createElement('p');
    releaseDate.textContent = `Release Date: ${movie.release_date}`;
    movieCard.appendChild(releaseDate);
  
    const overview = document.createElement('p');
    overview.textContent = movie.overview;
    movieCard.appendChild(overview);
  
    return movieCard;
  }
  
  // Function to display movie data on the website
  function displayMovieData(movies) {
    const movieContainer = document.getElementById('movie-container');
    movieContainer.innerHTML = '';
  
    movies.forEach((movie) => {
      const movieCard = createMovieCard(movie);
      movieContainer.appendChild(movieCard);
    });
  }
  
  // Function to handle search button click
  async function handleSearch() {
    const searchInput = document.getElementById('search-input');
    const searchQuery = searchInput.value.trim();
  
    if (searchQuery === '') {
      // If the search query is empty, fetch all movies
      const movies = await fetchMovieData();
      displayMovieData(movies);
    } else {
      // If there is a search query, fetch movies based on the query
      const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
      const searchUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`;
  
      try {
        const response = await fetch(searchUrl);
        const data = await response.json();
  
        displayMovieData(data.results);
      } catch (error) {
        console.log('Error fetching search results:', error);
      }
    }
  }
  
  // Attach event listener to the search button
  const searchButton = document.getElementById('search-button');
  searchButton.addEventListener('click', handleSearch);
  
  // Fetch all movies on page load
  window.addEventListener('load', async () => {
    const movies = await fetchMovieData();
    displayMovieData(movies);
  });
  
