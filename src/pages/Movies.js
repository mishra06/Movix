import React, { useEffect, useState } from "react";
import { fetchApi } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { MoviesSec, SetGenres } from "../slice/movieSlice";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import "./Movies.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(2);

  const MovieSection = useSelector((state) => state.movieSlice.Movies);
  const genres = useSelector((state) => state.movieSlice.Genres);
  // const sort = useSelector((state)=>state.movieSlice.SortBy)

  // const sortBy  = [
  //   {defaultValue  : null , label : "Select"},
  //   { value: 'popularity.desc', label: 'Popularity Decending' },
  //   { value: 'popularity.asc', label: 'Popularity Ascending' },
  //   { value: 'vote_average.desc', label: 'Rating Decending' },
  //   { value: 'vote_average.asc', label: 'Rating Ascending' },
  //   { value: 'primary_release_date.desc', label: 'Release Date Decending' },
  //   { value: 'primary_release_date.asc', label: 'Release Date Ascending' },
  //   { value: 'original_title.asc', label: 'Title A-Z' },
  // ]
  

  const dispatch = useDispatch();

  async function moviesSection() {
    try {
      const result = await fetchApi(
        "https://api.themoviedb.org/3/discover/movie",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      dispatch(MoviesSec(result.data.results));
      // setPage((prev)=> prev+1);
      setTotal(result.data.total_page);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    moviesSection();
  }, []);

  async function moviesSectionPage() {
    try {
      const result = await fetchApi(
        `https://api.themoviedb.org/3/discover/movie?page=${page}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      // dispatch(MoviesSec(result.data.results));
      const NewMovieData = [...MovieSection, ...result.data.results];
      dispatch(MoviesSec(NewMovieData));
      setPage((prev) => prev + 1);
      setTotal(result.data.total_page);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    moviesSectionPage();
  }, []);
  // useEffect(()=>{

  // },[total])

  //  for selector option

  async function fetchGenres() {
    const data = await fetchApi(
      `https://api.themoviedb.org/3/genre/movie/list`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    );

    const filteredData = data.data.genres.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });

    dispatch(SetGenres(filteredData));
  }

 

  // async function fetchMovieOrTvData(){

  //   const selectedOptionString = selectedOption && selectedOption.map((elem)=>{
  //     return elem.value;
  //   }).join(",");

  //   const movieOrTvShowUrl = `https://api.themoviedb.org/3/discover/"with_genres=": with_genres=${selectedOptionString}`
    
  //   const res = await fetchApi(movieOrTvShowUrl);

  //   const newData = [...sort,...res.data.results]
  //   console.log("newData",newData);
   
  //   dispatch(SetSortBy(newData))
  // }

  useEffect(() => {
    fetchGenres();
    // fetchMovieOrTvData();
  }, []);

  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedSortOption,setSelectedSortOption] = useState(null);

  async function fetchFilteredMovie() {
    let params = "";
    if (selectedOption.length > 0) {
      selectedOption.forEach((item) => {
        params += item.value + ",";
      });
    }

    const data = await fetchApi(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${params}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    );

    // console.log("data",data);
    dispatch(MoviesSec(data.data.results));
    setTotal(data.data.total_pages);
  }

  useEffect(() => {
    if (selectedOption) {
      fetchFilteredMovie();
    }
  }, [selectedOption]);


  // SortBy 

  // async function fetchFilteredSortBy() {
  //   let params = "";
  //   if (selectedSortOption.length > 0) {
  //     selectedSortOption.forEach((item) => {
  //       params += item.value + ",";
  //     });
  //   }

  //   const data = await fetchApi(
  //     `https://api.themoviedb.org/3/discover/movie?sort_by=${params}`,
  //     {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
  //       },
  //     }
  //   );
  //   dispatch(MoviesSec(data.data.results));
  //   setTotal(data.data.total_pages);
  // }

  // useEffect(() => {
  //   if (selectedSortOption) {
  //     fetchFilteredSortBy();
  //   }
  // }, [selectedSortOption]);

  // console.log(genres);

  return (
    <div>
      <Navbar />
      <InfiniteScroll
        dataLength={total}
        next={moviesSectionPage}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {/* // movies page section  */}

        <div className="movies_collection_display">
          <div className="options_types">
            <div className="content_name_sec">
              <span>Explore Movies</span>
            </div>
            <div className="content_filter_section">
              <div
                style={{ width: "100%" }}
                className="flex justify-center m-4"
              >
                <Select
                  className="w-1/2"
                  value={selectedOption}
                  onChange={(e) => {
                    setSelectedOption(e);
                  }}
                  isMulti
                  options={genres}
                />
                <Select
                  className="w-1/2"
                  value={selectedSortOption}
                  onChange={(e) => {
                    setSelectedSortOption(e);
                  }}
                  isMulti
                  options={"hhh"}
                />
                
              </div>
            </div>
          </div>

          <div className="content_upper_sec">
            {MovieSection.map((movie) => {
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
            })}
          </div>
        </div>

        {/* end page  */}
      </InfiniteScroll>
      {/* navbar section  */}
    </div>
  );
};

export default Movies;
