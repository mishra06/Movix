import React from 'react'



const CardSection = ({movie}) => {
  
  return (
    
       <div style={{height:"95%", flexDirection:"column",gap:"1rem",justifyContent:"center" }} className="flex justify-center m-1">
          <div style={{height:"80%",alignItems:"center", justifyContent:"center",display:"flex"}} className="shadow rounded">
            <img style={{borderRadius:"25px", height:"100%"}} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="images" />
          </div>
          <div style={{height:"20%", display:"flex", flexDirection:"column", gap:".5rem", color:"white" , textTransform:"capitalize"}}>
            <p>{movie.original_title}</p>
            <p>{movie.release_date}</p>
          </div>
        </div>

   
  )
}

export default CardSection
