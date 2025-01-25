import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState([]);
  const getInfo = useCallback(async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setInfo(json.data.movie);
    setLoading(false);
  }, [id]);
  useEffect(() => {
    getInfo();
  }, [getInfo]);
  return (
    <div>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{info.title}</h1>
          <h3>({info.year})</h3>
          <h4>rating: {info.rating}</h4>
          <ul>
            {info.genres.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
          <img src={info.large_cover_image} alt={info.title} />
        </div>
      )}
    </div>
  );
}

export default Detail;
