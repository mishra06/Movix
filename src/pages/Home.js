import React from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import Cardcollection from "./Cardcollection";


const Home = () => {
  
  return (
    <div>
      <Navbar />
      <Header />
      <Cardcollection/>
    </div>
  );
};

export default Home;
