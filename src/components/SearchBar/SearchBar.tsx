// import { useRef } from 'react';
import styles from './SearchBar.module.css';
import toast from 'react-hot-toast';

interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  // const form = useRef<HTMLFormElement>(null);
  // const input = useRef<HTMLInputElement>(null);
  
  const handleSubmit = (formData: FormData) => {
    const query = (formData.get('query') as string).trim();

    if (query === '') {
      toast.error('Please enter your search query.');
      return;
    }

    onSubmit(query);
    // form.current?.reset();
    // input.current?.focus();
  };
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>
        <form className={styles.form} action={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
