import { useEffect, useState } from 'react';
import Movie from './components/Movie';

function App2() {
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovies = async () => {
    const response = await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=8.8&sort_by=year`);
    const json = await response.json();
    console.log(json);
    setMovies(json.data.movies);
    setLoading(false);
  };

  useEffect(() => {
    getMovies();
  });

  //이제 return 파트에서 Loading 끝나면 Movie를 뿌릴 겁니다.

  return (
    <div className='home-container'>
      {loading ? (
        <h1 className='home-loading'>로딩 중...🕐</h1>
      ) : (
        <div className='movie-grid'>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              coverImg={movie.medium_cover_image}
              title={movie.title}
              summary={movie.summary}
              genres={movie.genres}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App2;
