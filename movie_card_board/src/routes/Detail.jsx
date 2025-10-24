import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState(null);

  const getMovie = async () => {
    try {
      const response = await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
      const json = await response.json();
      console.log(json.data.movie);
      setMovie(json.data.movie);
      setLoading(false);
    } catch (err) {
      console.log('영화정보 오류', err);
    }
  };

  useEffect(() => {
    getMovie();
  }, [id]);

  if (loading) {
    return <div className='detail-loading'>영화 정보 불러오는중...🕐</div>;
  }

  if (!movie) {
    return <div className='detail-error'>찾을수 없음</div>;
  }

  return (
    <div className='detail-container'>
      <div
        className='detail-backdrop'
        style={{
          backgroundImage: `url(${movie.background_image_original})`,
        }}
      >
        <div className='detail-overlay'>
          <div className='detail-content'>
            <img src={movie.large_cover_image} alt={movie.title} className='detail-poster' />
            <div className='detail-info'>
              <h1 className='detail-title'>{movie.title}</h1>
              <p className='detail-meta'>
                ⭐ {movie.rating} 점 / 🕐 {movie.runtime} 분
              </p>
              <div className='detail-genres'>
                {movie.genres.map((g) => (
                  <span className='detail-genre' key={g}>
                    {g}
                  </span>
                ))}
              </div>
              <p className='detail-description'>{movie.description_full}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detail;
