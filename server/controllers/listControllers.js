import axios from "axios";
import catchAsyncError from "../middleware/catchAsyncError.js";
import FavList from "../models/FavList.js";
import User from "../models/User.js"; 
import ErrorHandler from "../utils/ErrorHandler.js";

const getList= catchAsyncError(async(req,res,next)=>{

    const {data}=await axios.get('https://coinranking1.p.rapidapi.com/coins',{
        params: {
            referenceCurrencyUuid: 'yhjMzLPhuIDl',
            timePeriod: '24h',
            'tiers[0]': '1',
            orderBy: 'marketCap',
            orderDirection: 'desc',
            limit: '50',
            offset: '0'
          },
          headers: {
            'content-type': 'application/octet-stream',
            'X-RapidAPI-Key': 'b5cfbd5fd9msh8c8af1560d5e1b0p1d0f6ejsnf9d237c7dc87',
            'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com'
          }
    })

    res.status(200).json({
        success:true,
        list:data.data.coins
       })  
});

const getFavList= catchAsyncError(async(req,res,next)=>{

  const {_id}=req.user;

  const favList=await FavList.find({userList: _id})
  

  res.status(200).json({
      success:true,
      favList
     })  
});


const addToFavList= catchAsyncError(async(req,res,next)=>{

    const {coinId}=req.body;
    const {_id}=req.user;

    // just for safety
    const user = await User.findById(_id);
    if(!user){
      return next(new ErrorHandler("user not found",404));
    }
    const coin = await FavList.findOne({coinId});
    if(coin){
      // If the item already exists, add the user ID to its likedBy array
      if (!coin.userList.includes(_id)) {
        coin.userList.push(_id);
        await coin.save();
      }
      // const {_id}=req.user;

      const favList=await FavList.find({userList: _id})
      res.status(200).json({
        success:true,
        favList
       }) 
    }else {
      // If the item doesn't exist, create a new item with the provided item name and user ID
      const newCoin = new FavList({coinId , userList: [_id] });
      await newCoin.save();
      res.status(201).json({
        success:true,
        newCoin
       })
    }
 
}) 

const removeFromFavList= catchAsyncError(async(req,res,next)=>{

  const {coinId}=req.body;
  const {_id}=req.user;

  // just for safety
  const user = await User.findById(_id);
  if(!user){
    return next(new ErrorHandler("user not found",404));
  }
  let coin = await FavList.findOne({coinId});
  if(coin){
    // If the item already exists, add the user ID to its likedBy array
    if (coin.userList.includes(_id)) {
      coin.userList.remove(_id);
      await coin.save();
     
    }
    const favList=await FavList.find({userList: _id})
    res.status(200).json({
      success:true,
      favList
     }) 
  }
  else{
    return next(new ErrorHandler("coin not found",404));
  }
  
}) 

export {getList,addToFavList,removeFromFavList,getFavList};