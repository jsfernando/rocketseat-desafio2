import { useState, useEffect } from 'react';
import { Button } from './Button';

import { api } from '../services/api';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

// 4ª
interface SideBarProps{
  handleClickButton: (id: number) => void; // porque o retorno é void ? pq. na chamada do click não existe o return
  selectedGenreId: number;
}


//                            3ª                  4ª
export function SideBar({handleClickButton, selectedGenreId}: SideBarProps) {
  // Complete aqui
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);



  return (
    <nav className="sidebar">
    <span>Watch<p>Me</p></span>

    <div className="buttons-container">
      {genres.map(genre => (
        <Button
          key={String(genre.id)}
          title={genre.title}
          iconName={genre.name}
          onClick={() => handleClickButton(genre.id)}
          selected={selectedGenreId === genre.id}
        />
      ))}
    </div>

    </nav>
  )

}

// o estado compartilhado do App entre a SideBar e Content é o selectedGenreId que está sendo recebido por props
// sendo passado pelo App