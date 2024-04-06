import React, { useEffect, useState } from "react";
import { fetchApi } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { SetTvGenres,TvShows } from "../slice/movieSlice";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";
import Cards from "../components/Cards";
import "./Movies.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Select from "react-select";

const Movies = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(2);

  const MovieSection = useSelector((state) => state.movieSlice.TVSHOWS);
  const genres = useSelector((state) => state.movieSlice.TvGenres);
  

  const dispatch = useDispatch();

  async function TvsSection() {
    try {
      const result = await fetchApi(
        "https://api.themoviedb.org/3/discover/tv",
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      dispatch(TvShows(result.data.results));
      // setPage((prev)=> prev+1);
      setTotal(result.data.total_page);
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    TvsSection();
  }, []);

  async function moviesSectionPage() {
    try {
      const result = await fetchApi(
        `https://api.themoviedb.org/3/discover/tv?page=${page}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      // dispatch(MoviesSec(result.data.results));
      const NewMovieData = [...MovieSection, ...result.data.results];
      dispatch(TvShows(NewMovieData));
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
      `https://api.themoviedb.org/3/genre/tv/list`,
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

    dispatch(SetTvGenres(filteredData));
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
      `https://api.themoviedb.org/3/discover/tv?with_genres=${params}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        },
      }
    );

    // console.log("data",data);
    dispatch(TvShows(data.data.results));
    setTotal(data.data.total_pages);
  }

  useEffect(() => {
    if (selectedOption) {
      fetchFilteredMovie();
    }
  }, [selectedOption]);


  // SortBy 


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
