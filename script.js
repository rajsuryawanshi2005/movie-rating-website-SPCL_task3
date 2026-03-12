const API_KEY="e96831a2";

const container=document.getElementById("movieContainer");

let currentPage=1;
let totalPages=1;
let currentQuery="";

/* MOVIE LISTS */

const bollywood = [
"Tanhaji",
"Chhapaak",
"Love Aaj Kal",
"Baaghi 3",
"Angrezi Medium",
"Shakuntala Devi",
"Gulabo Sitabo",
"Gunjan Saxena: The Kargil Girl",
"Dil Bechara",
"Laxmii",
"Coolie No. 1",
"Durgamati",
"Lootcase",
"Sadak 2",

"Sooryavanshi",
"83",
"Radhe",
"Bell Bottom",
"Mimi",
"Shershaah",
"Sardar Ka Grandson",
"Roohi",
"Hungama 2",
"Antim: The Final Truth",
"Tadap",
"Chehre",

"Gangubai Kathiawadi",
"The Kashmir Files",
"Bhool Bhulaiyaa 2",
"Drishyam 2",
"Brahmāstra: Part One – Shiva",
"Laal Singh Chaddha",
"Samrat Prithviraj",
"Jugjugg Jeeyo",
"Jersey",
"Vikram Vedha",
"Thank God",
"An Action Hero",

"Pathaan",
"Jawan",
"Animal",
"Tiger 3",
"Rocky Aur Rani Kii Prem Kahaani",
"Tu Jhoothi Main Makkaar",
"Bholaa",
"Adipurush",
"OMG 2",
"Dream Girl 2",
"Sam Bahadur",
"The Archies",

"Fighter",
"Crew",
"Bade Miyan Chote Miyan",
"Chandu Champion",
"Munjya",
"Mr. & Mrs. Mahi",
"Article 370",
"Yodha",
"Kill",
"Madgaon Express",
"Amar Singh Chamkila",
"Stree 2",

"Sky Force",
"Kesari Chapter 2",
"Chhaava",
"Housefull 5",
"War 2",
"Alpha",
"The Delhi Files",
"Singham Again",
"Metro... In Dino",
"Welcome to the Jungle",

"Mardaani 3",
"Animal Park",
"Pathaan 2",
"Ramayana",
"Don 3",
"The King",
"Krishh 4",
"Cocktail 2",

"Sandeep Aur Pinky Faraar",
"Badhaai Do",
"Raksha Bandhan",
"Govinda Naam Mera",
"Kathal",
"Qala",
"Chor Nikal Ke Bhaga",
"Jaadugar",
"Anek",
"Runway 34",
"Phone Bhoot",
"Uunchai",
"Selfiee",
"Cirkus",
"Bheed",
"Mission Majnu",
"Good Luck Jerry",
"Haseen Dillruba",
"Darlings",
"Ludo"
];


const tollywood = [
"Ala Vaikunthapurramuloo",
"Sarileru Neekevvaru",
"Bheeshma",
"Jaanu",
"HIT: The First Case",
"Solo Brathuke So Better",
"World Famous Lover",
"Disco Raja",
"V",
"Nishabdham",

"Pushpa: The Rise",
"Akhanda",
"Love Story",
"Vakeel Saab",
"Uppena",
"Most Eligible Bachelor",
"Republic",
"Tuck Jagadish",
"Krack",
"Raja Raja Chora",
"Narappa",
"Paagal",

"RRR",
"Major",
"Sita Ramam",
"Bimbisara",
"Karthikeya 2",
"DJ Tillu",
"Godfather",
"Acharya",
"Thank You",
"The Warrior",
"Ori Devuda",
"Macherla Niyojakavargam",

"Waltair Veerayya",
"Veera Simha Reddy",
"Dasara",
"Baby",
"Bhagavanth Kesari",
"Hi Nanna",
"Bro",
"Miss Shetty Mr Polishetty",
"Skanda",
"Agent",
"Custody",
"Spy",

"Kalki 2898 AD",
"HanuMan",
"Tillu Square",
"Guntur Kaaram",
"Eagle",
"Gaami",
"Family Star",
"Ooru Peru Bhairavakona",
"Operation Valentine",
"Razakar",
"Om Bheem Bush",
"Committee Kurrollu",

"Pushpa 2: The Rule",
"Game Changer",
"OG",
"Salaar Part 2",
"Devara Part 1",
"Hari Hara Veera Mallu",
"Ustaad Bhagat Singh",
"The Raja Saab",
"VD 12",
"RC 16",

"Kalki 2898 AD Part 2",
"Pushpa 3",
"Salaar Part 3",
"Spirit",
"NTR 31",

"Colour Photo",
"Cinema Bandi",
"Middle Class Melodies",
"Writer Padmabhushan",
"Samajavaragamana",
"Mangalavaaram",
"Virata Parvam",
"Ashoka Vanamlo Arjuna Kalyanam",
"Kushi",
"Malli Pelli",
"Amigos",
"Meter",
"Bholaa Shankar",
"Ravanasura",
"Rangabali",
"Tiger Nageswara Rao",
"Saindhav",
"Bhimaa",
"Devil",
"Rules Ranjann",
"Extra Ordinary Man",
"Zombie Reddy",
"Arjuna Phalguna",
"Chor Bazaar",
"Shyam Singha Roy",
"Jathi Ratnalu",
"Konda Polam"
];

const series = [
"Sacred Games",
"Mirzapur",
"Paatal Lok",
"The Family Man",
"Delhi Crime",
"Asur",
"Farzi",
"Scam 1992: The Harshad Mehta Story",
"Scam 2003: The Telgi Story",
"Special OPS",
"Rana Naidu",
"Criminal Justice",
"Breathe",
"Breathe: Into the Shadows",
"Hostages",

"Made in Heaven",
"Gullak",
"Panchayat",
"Aspirants",
"Kota Factory",
"Flames",
"Little Things",
"Permanent Roommates",
"College Romance",
"Hostel Daze",
"TVF Pitchers",
"Rocket Boys",
"Human",
"The Broken News",
"The Railway Men",

"LOL: Hasse Toh Phasse",
"Pushpavalli",
"Bang Baaja Baaraat",
"Tripling",
"What The Folks",
"Operation MBBS",
"Engineering Girls",
"Cubicles",
"Please Find Attached",
"Home Shanti",

"Arya",
"Rudra: The Edge of Darkness",
"Kaala Paani",
"Jubilee",
"IC 814: The Kandahar Hijack",
"Bambai Meri Jaan",
"Avrodh",
"State of Siege: 26/11",
"Undekhi",
"JL50",

"The Night Manager",
"Taaza Khabar",
"Class",
"Saas Bahu Aur Flamingo",
"Trial by Fire",
"Mai: A Mother's Rage",
"She",
"Jamtara: Sabka Number Ayega",
"Betaal",
"Leila",

"Inside Edge",
"Four More Shots Please!",
"The Fame Game",
"Decoupled",
"Masaba Masaba",
"Ray",
"Feels Like Ishq",
"Aranyak",
"Duranga",
"Campus Diaries",

"Code M",
"Broken But Beautiful",
"Bekaaboo",
"Karenjit Kaur: The Untold Story of Sunny Leone",
"The Chargesheet",
"Sunflower",
"Mithya",
"Apharan",
"Bhaukaal",

"Taj: Divided by Blood",
"The Freelancer",
"Guns & Gulaabs",
"Inspector Avinash",
"Raktanchal",
"Cat",
"Bicchoo Ka Khel",
"Illegal",
"Naxalbari",
"Abhay",
"The Test Case",

"Pitchers Season 2",
"Farzi Season 2",
"Panchayat Season 3",
"Mirzapur Season 3",
"Aarya Season 3",
"Asur Season 2",
"Delhi Crime Season 2",
"The Family Man Season 3",
"Scam 2010"
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
