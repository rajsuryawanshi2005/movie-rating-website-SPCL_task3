const API_KEY = "e96831a2";

const movieContainer = document.getElementById("movieContainer");

async function searchMovies() {

const searchInput = document.getElementById("searchInput").value;

if(searchInput === ""){
alert("Please enter a movie name");
return;
}

const res = await fetch(`https://www.omdbapi.com/?s=${searchInput}&apikey=${API_KEY}`);

const data = await res.json();

if(data.Response === "False"){
movieContainer.innerHTML = "<h2>No Movies Found</h2>";
return;
}

displayMovies(data.Search);

}

function displayMovies(movies){

movieContainer.innerHTML = "";

movies.forEach(movie => {

const card = document.createElement("div");

card.classList.add("movie-card");

card.innerHTML = `

<img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300"}">

<div class="movie-info">

<h3>${movie.Title}</h3>

<p>Year: ${movie.Year}</p>

<div class="rating">

<span class="star" onclick="rateMovie(this)">★</span>
<span class="star" onclick="rateMovie(this)">★</span>
<span class="star" onclick="rateMovie(this)">★</span>
<span class="star" onclick="rateMovie(this)">★</span>
<span class="star" onclick="rateMovie(this)">★</span>

</div>

</div>

`;

card.onclick = () => openMovie(movie.imdbID);

movieContainer.appendChild(card);

});

}

function rateMovie(star){

let stars = star.parentElement.querySelectorAll(".star");

let index = [...stars].indexOf(star);

stars.forEach((s,i)=>{

if(i <= index){
s.style.color="gold";
}else{
s.style.color="gray";
}

});

}

async function openMovie(id){

const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);

const data = await res.json();

const modal = document.getElementById("movieModal");

const details = document.getElementById("modalDetails");

details.innerHTML = `

<h2>${data.Title}</h2>

<img src="${data.Poster}" width="200">

<p><b>Genre:</b> ${data.Genre}</p>
<p><b>Year:</b> ${data.Year}</p>
<p><b>Actors:</b> ${data.Actors}</p>
<p><b>Plot:</b> ${data.Plot}</p>

`;

modal.style.display = "block";

}

document.querySelector(".close").onclick = function(){
document.getElementById("movieModal").style.display="none";
}

window.onclick = function(event){

const modal = document.getElementById("movieModal");

if(event.target == modal){
modal.style.display="none";
}

}
