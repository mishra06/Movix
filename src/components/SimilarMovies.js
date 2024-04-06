import React, { useEffect, useState } from 'react'
import { SetSimilar } from '../slice/movieSlice';
import { fetchApi } from "../utils/api";
import CardSection from "../components/CardSection";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ReactSimplyCarousel from "react-simply-carousel";
import { useParams } from 'react-router-dom';

const SimilarMovies = () => {
    const {id} = useParams()

        const [activeSlideIndex, setActiveSlideIndex] = useState(0);
        const [top, setTop] = useState("movie");


    

    const TopRateMovies = useSelector((state) => state.movieSlice.Similar);
    
      const dispatch = useDispatch();
    
      
      async function GetData() {
        const data = await fetchApi(`https://api.themoviedb.org/3/movie/${id}/similar`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        });
        console.log("top_rated",data.data.results);
        dispatch(SetSimilar(data.data.results));
      }
    
      useEffect(() => {
        GetData();
        console.log("test");
      }, [top]);
    
    
      return (
        <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}} className="">
            <div style={{width:"90%" ,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"1.5rem"}}>
            <div style={{color:"white",display:"flex",justifyContent:"space-between",width:"80%",marginTop:"5px"}}>
                <div><h2 style={{fontSize:"35px" , fontWeight:"600"}}>Similar Movies</h2></div>
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
            {
                TopRateMovies.map((movie) => {
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
}

export default SimilarMovies
