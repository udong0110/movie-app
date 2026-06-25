import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const API_KEY = "13b46bc2";

  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    loadMovies("marvel");
  }, []);

  const loadMovies = async (keyword) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${keyword}`
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = () => {
    if (!searchValue.trim()) return;
    loadMovies(searchValue);
  };

  const toggleFavorite = (movie) => {
    const exists = favorites.some(
      (fav) => fav.imdbID === movie.imdbID
    );

    if (exists) {
      setFavorites(
        favorites.filter(
          (fav) => fav.imdbID !== movie.imdbID
        )
      );
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const isFavorite = (imdbID) => {
    return favorites.some(
      (fav) => fav.imdbID === imdbID
    );
  };

  return (
    <div className="container">
      <h1>영화 목록</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="영화 제목 입력"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />

        <button onClick={handleSearch}>
          검색
        </button>
      </div>

      <h2>내 선호작 ({favorites.length})</h2>

      <div className="movie-list">
        {favorites.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster} alt={movie.Title} />

            <div className="movie-card-content">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>

              <button
                className="favorite-btn remove-btn"
                onClick={() => toggleFavorite(movie)}
              >
                선호작 취소
              </button>
            </div>
          </div>
        ))}
      </div>

      <h2>영화 목록</h2>

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img src={movie.Poster} alt={movie.Title} />

            <div className="movie-card-content">
              <h3>{movie.Title}</h3>
              <p>{movie.Year}</p>

              <button
                className={
                  isFavorite(movie.imdbID)
                    ? "favorite-btn remove-btn"
                    : "favorite-btn add-btn"
                }
                onClick={() => toggleFavorite(movie)}
              >
                {isFavorite(movie.imdbID)
                  ? "선호작 취소"
                  : "선호작 추가"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;