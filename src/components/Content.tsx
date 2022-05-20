import { useEffect, useState } from 'react';
import { api } from '../services/api';
import { MovieCard } from './MovieCard';


interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

//2ª
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

// 1ª
interface ContentProps{
  selectedGenreId: number;
  selectedGenre: GenreResponseProps;
}

//                              1ª             2ª
export function Content( { selectedGenreId, selectedGenre } : ContentProps ) {
  // Complete aqui

  const [movies, setMovies] = useState<MovieProps[]>([]);
  
  useEffect(() => {
    api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
      setMovies(response.data);
    });

  }, [selectedGenreId]);

  return(
    <div className="container">
    <header>
      <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
    </header>
      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard key ={movie.imdbID} title={movie.Title} poster={movie.Poster} runtime={movie.Runtime} rating={movie.Ratings[0].Value} />
          ))}
        </div>
      </main>
    </div>
  
  )

}

// o estado compartilhado do App entre a SideBar e Content é o selectedGenreId que está sendo recebido por props
// sendo passado pelo App