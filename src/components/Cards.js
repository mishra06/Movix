import React from 'react'
import "./Cards.css"

const Cards = ({movie}) => {
  return (
    
        <div className="content_image_sec">
          <div className="cont_single_sec">
            <img src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="images" />
          </div>
          <div className="conttent_img_info">
            <p className='conttent_name'>
            {movie.original_title?.length >= 25 ? movie.original_title?.slice(0, 16) +" " + "..." : movie.original_title}
              </p>
            <p className='conttent_date'>{movie.release_date}</p>
          </div>
        </div>
  )
}

export default Cards
