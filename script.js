// // DOM manipulation


// Get films from json server
function fetchMovies(){
    fetch('http://localhost:3000/films')
    .then(res => res.json())
    .then(data => {
    movieNames(data)
    })
}

document.addEventListener('DOMContentLoaded',(e) => {
    fetchMovies()
    e.preventDefault()
})

// DOM manipulation
function movieNames(movies){
    let max = document.getElementById("films")

    movies.forEach(movie => {
        let movielist = document.createElement("li")
        movielist.classList = "theater"
        movielist.innerHTML = movie.title
        max.appendChild(movielist)

// Event listener
        movielist.addEventListener("click", function(){
            displayMovieDetails(movie)
        })
    })
}
  
//  Displaying movies to website
function displayMovieDetails(movie) {
    fetch(`http://localhost:3000/films/${movie.id}`)
    .then(res => res.json())
    .then(data => {
        cinemaInfo(data)
    })
}

// Dom manipulation
function cinemaInfo(movie){
    let ace = document.querySelector("#movie-details")
    ace.innerHTML = `
    <img src="${movie.poster}" alt="movie poster" />
    <p>${movie.description}</p>
    <ul class="inline">
    <li>Runtime:&nbsp${movie.runtime}</li>
    <li>Capacity:&nbsp${movie.capacity}</li>
    <li>Showtime:&nbsp${movie.showtime}</li>
    <li id="sold">Tickets sold:&nbsp${movie.tickets_sold}</li>
  </ul>
  <button type="button" id="button">Buy ticket</button>
  `
// Event listener
  ace.querySelector('#button').addEventListener('click', (e) => {
    movie.tickets_sold+= 1 
    ace.querySelector('#sold').textContent = movie.tickets_sold
    updateTickets(movie)
    e.preventDefault()
  })
}


function updateTickets(movie){
    fetch(`http://localhost:3000/films/${movie.id}`,{
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(movie)
    })
    .then(res => res.json())
    .then(movie => console.log(movie))
}
