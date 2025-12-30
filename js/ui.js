async function fetchMovies(url, containerId) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    const container = document.getElementById(containerId);
    container.innerHTML = "";

    data.results.forEach(movie => {
      if (!movie.poster_path) return;

      const img = document.createElement("img");
      img.classList.add("row_poster");
      img.src = `${IMG_URL}${movie.poster_path}`;
      img.alt = movie.title;

      img.addEventListener("click", () => openMovie(movie));

      container.appendChild(img);
    });

  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}
