import React ,{useEffect,useState}from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import { useAppContext } from '../context/appContext';

const Home = () => {
 
    
  return (
    <>
      <Navbar/>
      <Hero/>
    </>
  )

}

export default Home
