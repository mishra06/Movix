import React, { useEffect } from 'react'
import { TvShows } from '../slice/movieSlice'
import { fetchApi } from '../utils/api';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { NavLink } from 'react-router-dom';
import CardSection from '../components/CardSection';

const TvShow = () => {

    const MovieSSections = useSelector((state)=>state.movieSlice.TVSHOWS);

    const dispatch = useDispatch();

    async function TvShowSection(){
        try{
            const result = await fetchApi(
              "https://api.themoviedb.org/3/discover/tv",
              {
                headers: {
                  accept: 'application/json',
                  Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
                },
              }
            );
            dispatch(TvShows(result.data.results));
            console.log(result);
      
          } catch(error){
            console.log(error);
          }
    }

    useEffect(()=>{
        TvShowSection()
    })

    console.log(MovieSSections);
  return (
    <div>
      <Navbar/>
      <div>
      {
                MovieSSections.map((movie) => {
                    return (
                        <div key={movie.id}>
                            <NavLink to={`/movie/${movie.id}`}>
                                <CardSection movie={movie} />
                            </NavLink>
                        </div>
                    )
                })
            }
      </div>
    </div>
  )
}

export default TvShow
