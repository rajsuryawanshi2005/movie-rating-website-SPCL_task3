const API_KEY="e96831a2";

const container=document.getElementById("movieContainer");

let currentPage=1;
let totalPages=1;
let currentQuery="";

/* MOVIE LISTS */

const bollywood=[
"Pathaan","Jawan","Animal","Tiger 3","Brahmastra",
"Drishyam 2","Gangubai Kathiawadi","Bhool Bhulaiyaa 2",
"Shershaah","Laal Singh Chaddha","War","Andhadhun",
"Dangal","PK","3 Idiots","Bajrangi Bhaijaan"
];

const tollywood=[
"Ala Vaikunthapurramuloo","Sarileru Neekevvaru","Pushpa",
"RRR","Major","Sita Ramam","Bimbisara",
"Karthikeya 2","DJ Tillu","Dasara","Baby",
"Hi Nanna","Skanda","Agent","Custody","Spy",
"Kalki 2898 AD","HanuMan","Tillu Square","Guntur Kaaram"
];

const series=[
"Sacred Games","Mirzapur","Paatal Lok",
"The Family Man","Delhi Crime","Asur",
"Farzi","Scam 1992","Special OPS",
"Criminal Justice","Breathe","Hostages",
"Made in Heaven","Panchayat","Aspirants",
"Kota Factory","Flames","Little Things"
];

/* CREATE CARD */

function createCard(movie){

const card=document.createElement("div");
card.classList.add("movie-card");

card.innerHTML=`

<img src="${movie.Poster}">

<div class="movie-info">

<h3>${movie.Title}</h3>
<p>${movie.Year}</p>

<div class="rating">
<span onclick="rate(this)">★</span>
<span onclick="rate(this)">★</span>
<span onclick="rate(this)">★</span>
<span onclick="rate(this)">★</span>
<span onclick="rate(this)">★</span>
</div>

<button class="trailer-btn" onclick="watchTrailer('${movie.Title}')">Trailer</button>

</div>

`;

card.onclick=()=>openMovie(movie.imdbID);

container.appendChild(card);

}

/* FETCH MOVIE */

async function fetchMovie(title){

const res=await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${API_KEY}`);
const data=await res.json();

if(data.Response==="True") createCard(data);

}

/* SECTIONS */

function loadBollywood(){
container.innerHTML="";
bollywood.forEach(fetchMovie);
}

function loadTollywood(){
container.innerHTML="";
tollywood.forEach(fetchMovie);
}

function loadSeries(){
container.innerHTML="";
series.forEach(fetchMovie);
}

function loadRandom(){

container.innerHTML="";

let mix=[...bollywood,...tollywood,...series];

mix.sort(()=>0.5-Math.random());

mix.slice(0,20).forEach(fetchMovie);

}

/* SEARCH */

async function searchMovies(){

currentPage=1;
currentQuery=document.getElementById("searchInput").value;
loadSearchResults();

}

async function loadSearchResults(){

container.innerHTML="";

const res=await fetch(`https://www.omdbapi.com/?s=${currentQuery}&page=${currentPage}&apikey=${API_KEY}`);

const data=await res.json();

if(data.Search){

data.Search.forEach(createCard);

totalPages=Math.ceil(data.totalResults/10);

showPages();

}

}

/* PAGINATION */

function showPages(){

let pages=document.getElementById("pageNumbers");

pages.innerHTML="";

for(let i=1;i<=totalPages;i++){

let span=document.createElement("span");

span.innerText=i;

span.classList.add("page-number");

if(i===currentPage) span.classList.add("active");

span.onclick=function(){

currentPage=i;
loadSearchResults();

};

pages.appendChild(span);

}

}

function nextPage(){

if(currentPage<totalPages){

currentPage++;
loadSearchResults();

}

}

function prevPage(){

if(currentPage>1){

currentPage--;
loadSearchResults();

}

}

/* SUGGESTIONS */

async function showSuggestions(){

let query=document.getElementById("searchInput").value;

let suggestions=document.getElementById("suggestions");

if(query.length<2){

suggestions.innerHTML="";
return;

}

const res=await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);

const data=await res.json();

suggestions.innerHTML="";

if(data.Search){

data.Search.slice(0,5).forEach(movie=>{

let div=document.createElement("div");

div.classList.add("suggestion-item");

div.innerText=movie.Title;

div.onclick=function(){

document.getElementById("searchInput").value=movie.Title;

suggestions.innerHTML="";

currentQuery=movie.Title;

searchMovies();

};

suggestions.appendChild(div);

});

}

}

/* TRAILER */

function watchTrailer(title){

window.open(`https://www.youtube.com/results?search_query=${title} trailer`);

}

/* RATING */

function rate(star){

let stars=star.parentElement.children;

let index=[...stars].indexOf(star);

for(let i=0;i<stars.length;i++){

stars[i].style.color=i<=index?"gold":"gray";

}

}

/* MOVIE DETAILS */

async function openMovie(id){

const res=await fetch(`https://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);

const data=await res.json();

document.getElementById("modalDetails").innerHTML=`

<h2>${data.Title}</h2>
<img src="${data.Poster}" width="200">
<p><b>Genre:</b> ${data.Genre}</p>
<p><b>Actors:</b> ${data.Actors}</p>
<p><b>Plot:</b> ${data.Plot}</p>

`;

document.getElementById("movieModal").style.display="block";

}

/* CLOSE MODAL */

document.querySelector(".close").onclick=function(){

document.getElementById("movieModal").style.display="none";

}

window.onclick=function(e){

let modal=document.getElementById("movieModal");

if(e.target==modal) modal.style.display="none";

}

/* HIDE SUGGESTIONS */

document.addEventListener("click",function(e){

if(!e.target.closest(".search-box")){

document.getElementById("suggestions").innerHTML="";

}

});

/* DEFAULT LOAD */

loadRandom();
