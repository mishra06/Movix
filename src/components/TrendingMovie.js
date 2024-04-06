import React, { useEffect, useState } from "react";
import { Trending } from "../slice/movieSlice";
import { fetchApi } from "../utils/api";
import CardSection from "../components/CardSection";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import "./TrendingMovie.css";
import ReactSimplyCarousel from "react-simply-carousel";

const TrendingMovie = () => {
  const trendingMoviesSection = useSelector(
    (state) => state.movieSlice.Populer
  );

  const dispatch = useDispatch();

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [switchMovie, setSwitchMovie] = useState("day");

  async function GetData() {
    const data = await fetchApi(`https://api.themoviedb.org/3/trending/movie/${switchMovie}`, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    });
    // console.log("trending_page",data.data.results);
    dispatch(Trending(data.data.results));
  }

  useEffect(() => {
    GetData();
  }, [switchMovie]);

  return (
    <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}} className="">
        <div style={{width:"90%" ,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"1.5rem"}}>
        <div style={{color:"white",display:"flex",justifyContent:"space-between",width:"80%",marginTop:"5px"}}>
            <div><h2 style={{fontSize:"25px"}}>Trending</h2></div>
            <div style={{display:"flex",width:"20%",border:"2px solid white",justifyContent:"space-between",borderRadius:"15px",padding:"2px",cursor:"pointer"}}>
                <button onClick={()=>{
                    setSwitchMovie("day")
                }} style={{width:"50%",backgroundColor:"red",padding:"0px 20px", borderRadius:"15px"}}>Day</button>
                <button onClick={()=>{
                    setSwitchMovie("week")
                }} style={{width:"50%",padding:"0px 20px", borderRadius:"15px",backgroundColor:"green"}}>week</button>
            </div>
        </div>
      <ReactSimplyCarousel
        style={{border:"none"}}
            activeSlideIndex={activeSlideIndex}
            onRequestChange={setActiveSlideIndex}
            itemsToShow={1}
            itemsToScroll={1}
            forwardBtnProps={{
            //here you can also pass className, or any other button element attributes
            style: {
                alignSelf: "center",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "20px",
                height: 30,
                lineHeight: 1,
                textAlign: "center",
                width: 30,
            },
            children: <span>{`>`}</span>,
            }}

            backwardBtnProps={{
            //here you can also pass className, or any other button element attributes
            style: {
                alignSelf: "center",
                border: "none",
                color: "white",
                cursor: "pointer",
                fontSize: "20px",
                height: 30,
                lineHeight: 1,
                textAlign: "center",
                width: 30,
            },
            children: <span>{`<`}</span>,
            }}

            responsiveProps={[
            {
                itemsToShow: 5,
                itemsToScroll: 4,
                minWidth: 768,
            },
            ]}
            speed={400}
            easing="linear"
      >
        {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
        {
            trendingMoviesSection.map((movie) => {
                return (
                     <div style={{
                        width: "13rem",
                        height: "25rem",
                        border:"none"
                        
                      }}  key={movie.id}>

                        <NavLink  to={`/movie/${movie.id}`}>
                            <CardSection movie={movie} />
                        </NavLink>
                    </div>
                )
            })
        }
      </ReactSimplyCarousel>
      </div>
    </div>
  );
};

export default TrendingMovie;

// 
