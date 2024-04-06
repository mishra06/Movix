import React from 'react'
import TrendingMovie from '../components/TrendingMovie'
import Popular from '../components/Popular'
import TopRated from '../components/TopRated'


const Cardcollection = () => {
  return (
    <div style={{backgroundColor:"#04152d",padding:"10px", margin:"2rem", height:"auto",gap:"3rem"}}>
      <TrendingMovie/>
      <Popular/>
      <TopRated/>
    </div>
  )
}

export default Cardcollection
