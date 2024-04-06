import React, { useEffect, useState } from "react";
import { Populars } from '../slice/movieSlice'
import { fetchApi } from "../utils/api";
import CardSection from "../components/CardSection";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import ReactSimplyCarousel from "react-simply-carousel";

const Popular = () => {
        const [activeSlideIndex, setActiveSlideIndex] = useState(0);
        const [switchMovie, setSwitchMovie] = useState("movie");
        const whatsPopularMovie = useSelector(

        (state) => state.movieSlice.WhatsPopular
      );
    
      const dispatch = useDispatch();
    
      
    
      async function GetData() {
        const data = await fetchApi(`https://api.themoviedb.org/3/${switchMovie}/popular`, {
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          },
        });
        // console.log("trending_page",data.data.results);
        dispatch(Populars(data.data.results));
      }
    
      useEffect(() => {
        GetData();
      }, [switchMovie]);
    
      return (
        <div style={{width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}} className="">
            <div style={{width:"90%" ,display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",gap:"1.5rem"}}>
            <div style={{color:"white",display:"flex",justifyContent:"space-between",width:"80%",marginTop:"5px"}}>
                <div><h2 style={{fontSize:"25px"}}>What's Popular</h2></div>
                <div style={{display:"flex",width:"20%",border:"2px solid white",justifyContent:"space-between",borderRadius:"15px",padding:"2px",cursor:"pointer"}}>
                    <button onClick={()=>{
                        setSwitchMovie("movie")
                    }} style={{width:"50%",backgroundColor:"red",padding:"0px 20px", borderRadius:"15px"}}>Movies</button>
                    <button onClick={()=>{
                        setSwitchMovie("tv")
                    }} style={{width:"50%",padding:"0px 20px", borderRadius:"15px",backgroundColor:"green",fontSize:"15px"}}>Tv-Show</button>
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
                whatsPopularMovie.map((movie) => {
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

export default Popular
