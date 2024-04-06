import React, { useState } from 'react'
import './Header.css'
import { useNavigate } from 'react-router-dom';

const Header = () => {


    const [search,setSearch] = useState("");

    const navigate = useNavigate()

    function SearchedData(){
        if(search !==""){
            navigate(`/search/${search}`);
        }

    }
  return (
    <div className='header_upper'>
      <div className='header_lower_sec'>
        <h1 className='text-8xl font-bold '>Welcome.</h1>
        <h4 className='text-xl font-bold'>Millions of movies, TV shows and people to discover. Explore now.</h4>
        <div className="header_serch_sec">
            <input value={search} placeholder='Search for a movie and Tv-Show' type="text" onChange={(e)=>{
                setSearch(e.target.value);
            }} />
            <button onClick={SearchedData}>Seach</button>
        </div>
      </div>
    </div>
  )
}

export default Header