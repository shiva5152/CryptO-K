import User from "./User.js";
import mongoose from "mongoose";

const FavListSchema =new mongoose.Schema({
   coinId:{
    type:String,
    required:true
   },
   // users who added coin to their Fav List  
   userList:[
   { 
      type:mongoose.Types.ObjectId,
      ref:"User",
      default:[]
   }
   ],   
})


  export default mongoose.model('FavList',FavListSchema);
