import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SetDetails, SetCredits } from "../slice/movieSlice";
import { fetchApi } from "../utils/api";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./MovieDetails.css";
import SimilarMovies from "../components/SimilarMovies";
import Recommendations from "../components/Recommendations";

const MovieDetails = () => {
  const { id } = useParams();
  const MovieSection = useSelector((state) => state.movieSlice.Details);
  const Creditinfo = useSelector((state) => state.movieSlice.Credits);
  const dispatch = useDispatch();

  //  function call

  async function movieSection() {
    try {
      const result = await fetchApi(
        `https://api.themoviedb.org/3/movie/${id}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      console.log("result", result.data);
      dispatch(SetDetails(result.data));
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    movieSection();
  }, []);

  console.log("information", MovieSection);

  // credits info api call

  async function CreditSection() {
    try {
      const credit = await fetchApi(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        // https://api.themoviedb.org/3/movie/1127166/credits
        {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        }
      );
      console.log("result", credit.data);
      dispatch(SetCredits(credit.data));
      // console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    CreditSection();
  }, []);

  console.log("Creditinfo", Creditinfo);

  // jsx part
  return (
    <div style={{backgroundColor:"#051329"}}>
      <Navbar />
      {MovieSection && (
        <div className="details_container">
          <div className="details_page">
            <div className="upper_Section">
              <div className="left_image_sec">
                <img
                  src={`https://image.tmdb.org/t/p/original/${MovieSection.poster_path}`}
                  alt=""
                  width="200"
                  height="250"
                />
              </div>
              <div className="right_image_infos">
                <span className="details_titel">
                  {MovieSection.original_title}
                </span>
                <p className="details_tagname">{MovieSection.tagline}</p>
                <ul className="flex gap-4">
                  {MovieSection?.genres?.map((e) => {
                    return <li className="details_movietype">{e.name}</li>;
                  })}
                </ul>
                <span>
                  <div style={{ width: 50, height: 50 }}>
                    <CircularProgressbar
                      value={Math.round(MovieSection.vote_average)}
                      maxValue={10}
                      text={MovieSection.vote_average}
                    />
                  </div>
                </span>
                <span className="details_span">Overview</span>
                <p className="details_overview">{MovieSection.overview}</p>
                <div className="release_info">
                  <span>
                    Status:{" "}
                    <span className="status_info">{MovieSection.status}</span>
                  </span>
                  <span>
                    Release Date:{" "}
                    <span className="status_info">
                      {MovieSection.release_date}
                    </span>
                  </span>
                  <span>
                    Runtime:{" "}
                    <span className="status_info">{MovieSection.runtime}</span>
                  </span>
                </div>
                <ul className="flex gap-4">
                  {Creditinfo?.crew
                    ?.filter((e) => e.job === "Writer")
                    ?.map((e) => (
                      <li>{e.name}</li>
                    ))}
                </ul>
                <hr className="details_overview" />
              </div>
            </div>
            {/* Top Cast  */}

            <div className="second_sections">
              <div className="heading">
                <h1>Top Cast</h1>
              </div>
              <ul className="ulll">
                {Creditinfo?.cast?.map((e) => {
                  return (
                    <div className="large">
                      <div className="second_inner_sections" key={e.id}>
                        <span className="second_inner_section_img"><img src={`https://image.tmdb.org/t/p/original/${e.profile_path}`} alt="" /></span>
                        <div className="name_details_info">
                          <p className="name_details_info_first">{e.name}</p>
                          <p className="name_details_info_second">{e.character}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
      <SimilarMovies/>
      <Recommendations/>
    </div>
  );
};


export default MovieDetails;
