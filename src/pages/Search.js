import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import {fetchApi} from '../utils/api'
import { Searched } from '../slice/movieSlice'
import Cards from '../components/Cards'

const Search = () => {

  // const [page, setPage] = useState(1);
  // const [total, setTotal] = useState(2);

  const searchedMovieList = useSelector((state) => state.movieSlice.SearchSec);

  const { movie } = useParams();
  console.log("movie",movie);

  const dispatch = useDispatch();

  async function searchMovie(){
    try{
      const result = await fetchApi(
        `https://api.themoviedb.org/3/search/multi?query=${movie}&page=1`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      dispatch(Searched(result.data.results));
      console.log("gggg",result.data.results);

    } catch(error){
      console.log(error);
    }
  }

  useEffect(()=>{
    searchMovie()
  },[])

  console.log("searchedMovie", searchedMovieList);


  return (
    <div style={{backgroundColor:"#04152d"}}>
      <Navbar/>
      <div style={{margin:"2rem"}}>
        <span style={{color:"white",fontSize:"25px"}}>Searched for{" "}{movie}</span>
      </div>
      <div className="newwww">
          { searchedMovieList.map((movie) => {
              return (
                <div key={movie.id} className="mmmmm">
                  <NavLink
                    style={{ width: "100%", borderRadius: "15px" }}
                    to={`/movie/${movie.id}`}
                  >
                    <Cards movie={movie} />
                  </NavLink>
                </div>
                );
              })
            }
      </div>
              
    </div>
  )
}

export default Search
