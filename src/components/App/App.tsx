import styles from './App.module.css';
import { useState } from 'react';
import type Movie from '../../types/movie';
import toast from 'react-hot-toast';

import fetchMovies from '../../services/movieService';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieModal from '../MovieModal/MovieModal';

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false)

  async function handleSearch(query: string) {
    setMovies([]);
    setSelectedMovie(null);
    setLoading(true);
    setError(false);
    try {
      const results = await fetchMovies(query);
      if (results.length === 0) {
        toast.error('No movies found for your request.');
      }
      setMovies(results);
    } catch (error) {
      toast.error('Failed to fetch movies.');
      console.error('Error fetching movies:', error);
    }
    finally {
      setLoading(false);
    }
  }

  function handleSelect(movie: Movie) {
    setSelectedMovie(movie);
    toast.success(`Selected movie: ${movie.title}`);
    // Тут можна додати логіку для відображення деталей фільму
    // Наприклад, відкриття модального вікна з інформацією про фільм
    console.log('Selected movie:', movie);
  }

  function handleCloseModal() {
    setSelectedMovie(null);
  }

  return (
    <div className={styles.app}>
      <SearchBar onSubmit={handleSearch} />
      {loading && <Loader />}
      {error && !loading && <ErrorMessage />}
      {movies.length > 0 && <MovieGrid movies={movies} onSelect={handleSelect} />}
      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
      )}
    </div>
  );
}
