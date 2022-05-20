import { useEffect, useState } from 'react';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';

import './styles/sidebar.scss';
import './styles/content.scss';

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}



export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

  useEffect(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data);
    })
  }, [selectedGenreId]);

  function handleClickButton(id: number) {
    setSelectedGenreId(id);
  } 


  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>

      <SideBar  selectedGenreId={selectedGenreId} handleClickButton={handleClickButton}/>
      {/* 3ª passando os parâmetros de estados para o component Content */}
      <Content selectedGenreId={selectedGenreId} selectedGenre={selectedGenre}/>

    </div>
  )
}


// A Sidebar precisa do Movies ?
// O que precisa ser compartilhado entre a Sidebar e o Content é o GenreId ou o estado setSelectedGenreId
