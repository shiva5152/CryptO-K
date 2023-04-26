import React, { useState } from 'react'
import { useAppContext } from '../context/appContext';
import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';


export const Ncard=({currency,defaultVal})=>{

  const {addToFav,removeFromFav,isLoading}=useAppContext();
  const [color,setColor]=useState(defaultVal);
  const handleClick=()=>{
    setColor(!color);
    if(color){
      addToFav(currency.uuid)
    }else{
      removeFromFav(currency.uuid)
    }
  } 
  

  return (
    <Card
    title={`${currency.rank}. ${currency.name}`}
    extra={<img className="crypto-image" src={currency.iconUrl} />}
    hoverable
   


  >
    <div className='flex justify-between'>
      <div>
        <p>Price: {millify(currency.price)}</p>
        <p>Market Cap: {millify(currency.marketCap)}</p>
        <p>Daily Change: {currency.change}%</p>
      </div>
      <button disabled={isLoading} onClick={handleClick}>
        {color?(
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        ):(
          <svg xmlns="http://www.w3.org/2000/svg" fill="pink" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
        )}

      </button>
    </div>
  </Card>
  )
}



const Hero = () => {
  const {getCoins,coins}=useAppContext();


  return (
    <div className='p-5 bg-slate-200'>
     
      <Row gutter={[32, 32]} className="crypto-card-container">
        {coins?.map((currency) => (
          <Col
            xs={24}
            sm={12}
            lg={6}
            className="crypto-card"
            key={currency.uuid}
          >
           <Ncard currency={currency} defaultVal/>
            
          </Col>
        ))}
      </Row>
      
    </div>
  )
}

export default Hero
