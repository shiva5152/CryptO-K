import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/appContext';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';
import { Ncard } from '../components/Hero';



const Fav = () => {
    const {getFavList,favList,coins,favListChange}=useAppContext();
    const [data,setData]=useState([]);
   
    useEffect(()=>{ 

      getFavList();
      const filteredList = [];
      for(let i=0;i<favList.length;i++){
        for(let j=0;j<coins.length;j++){
          if(favList[i].coinId===coins[j].uuid){
            filteredList.push(coins[j]);
          }
        }
      }
      setData(filteredList);
       
       },[favListChange]);

       
    
   
    return (
      <>
      <nav className='z-10 bg-gray-800 p-4 flex justify-between items-center'>
       <Link to={'/'} > <span className='font-lg text-blue-500 font-bold text-lg'>CryptoK</span></Link>
       <h2 className='font-bold text-white text-[1.2rem] p-1'> Your Favorites</h2>
       </nav>
      
     { data?.length ?(
       <div className='p-5 bg-slate-200'>
         
       <Row gutter={[32, 32]} className="crypto-card-container">
         {data?.map((currency) => (
           <Col
             xs={24}
             sm={12}
             lg={6}
             className="crypto-card"
             key={currency.uuid}
           >
       <Ncard currency={currency} defaultVal={false}/>
           </Col>
         ))}
       </Row>
       
     </div>
     ):(<h1 className='flex justify-center font-bold text-[1.7rem] mt-8'>Nothing in favorites</h1>) }
       
      
      </>
      )
}

export default Fav
