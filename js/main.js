const nav = document.getElementById("nav");

window.addEventListener("scroll", () => {
  nav.classList.toggle("nav__black", window.scrollY > 100);
});

fetchMovies(requests.trending, "trendingRow");
fetchMovies(requests.popular, "popularRow");
fetchMovies(requests.topRated, "topRatedRow");
fetchMovies(requests.action, "actionRow");
fetchMovies(requests.comedy, "comedyRow");
fetchMovies(requests.horror, "horrorRow");
fetchMovies(requests.romance, "romanceRow");
fetchMovies(requests.documentary, "documentaryRow");

// ===== Trailer Popup Logic =====
const overlay = document.getElementById("overlay");
const closeBtn = document.getElementById("closeBtn");
const ytvideo = document.getElementById("ytvideo");

closeBtn.onclick = () => closePopup();
overlay.onclick = (e) => { if (e.target === overlay) closePopup(); };

function closePopup() {
  overlay.style.display = "none";
  ytvideo.src = "";
}

async function openMovie(movie) {
  overlay.style.display = "flex";

  document.getElementById("movieTitle").innerText = movie.title;
  document.getElementById("rating").innerText = movie.vote_average;
  document.getElementById("release").innerText = movie.release_date;
  document.getElementById("synopsis").innerText = movie.overview || "No description.";
  document.getElementById("lang").innerText = movie.original_language;
  document.getElementById("votes").innerText = movie.vote_count;
  document.getElementById("popularity").innerText = movie.popularity;

  const videoURL = `${BASE_URL}/movie/${movie.id}/videos?api_key=${API_KEY}`;
  const res = await fetch(videoURL);
  const data = await res.json();

  const trailer = data.results.find(v => v.type === "Trailer") || data.results[0];

  if (trailer) {
    ytvideo.src = `https://www.youtube.com/embed/${trailer.key}?autoplay=1`;
  } else {
    ytvideo.src = "";
  }
}
