import reducer from "./reducer";
import axios from "axios";

import {
  GET_ALL_USER_SUCCESS,
  CHANGE_ROLE__SUCCESS,
  DELETE_USER_SUCCESS,

  API_CALL_BEGIN,
  API_CALL_FAIL,
  GET_COINS_SUCCESS,
  AAD_FAV_SUCCESS,
  REMOVE_FAV_SUCCESS,
  GET_FAV_LIST_SUCCESS,
  
    GET_USER_BEGIN,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    LOGOUT_USER,
    LOGIN_USER_BEGIN,
    LOGIN_USER_SUCESS,
    LOGIN_USER_FAIL,
    SIGNIN_USER_BEGIN,
    SIGNIN_USER_SUCESS,
    SIGNIN_USER_FAIL,
   
    
} from './action'
import React, { useReducer, useContext,useEffect } from 'react';



export const initialState  ={
    isLoading:false,
    isAuthenticated:false,
    user:null,
    isAdmin:false,
    showAlert:false,
    favListChange:false,
    coins:[],
    favList:[],
    users:[],
     
}
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  
  const [state, dispatch] = useReducer(reducer,initialState);
  // axiso --base url
  const instance = axios.create({
    // development->
     baseURL: 'abc/api/v1'
    // // production
    // baseURL: '/api/v1',
    
  });
    const getCoins=async()=>{
      dispatch({type:API_CALL_BEGIN});
      
      try {
        const {data}= await instance.get('/coins/list')
        // console.log(data.list);
        dispatch({type:GET_COINS_SUCCESS,
          payload:data.list
        })
      } catch (error) {
        dispatch({type:API_CALL_FAIL});
      }
    }
    const getFavList=async()=>{
      dispatch({type:API_CALL_BEGIN});
      
      try {
        
        const {data}= await instance.get('/coins/favlist')
       
       

        dispatch({type:GET_FAV_LIST_SUCCESS,
          payload:data.favList
        })
      } catch (error) {
        dispatch({type:API_CALL_FAIL});
      }
    }
    const addToFav=async(coinId)=>{
      dispatch({type:API_CALL_BEGIN});
      
      try {
        const {data}= await instance.put('/coins/adduser',{coinId})
        // console.log(data.list);
        dispatch({type:AAD_FAV_SUCCESS,
          payload:data.favList
        })
      } catch (error) {
        dispatch({type:API_CALL_FAIL});
      }
    }
   
    const removeFromFav=async(coinId)=>{
      dispatch({type:API_CALL_BEGIN});
      
      try {
        const {data}= await instance.put('/coins/removeuser',{coinId})
        // console.log(data.list);
        dispatch({type:REMOVE_FAV_SUCCESS,
          payload:data.favList
        })
      } catch (error) {
        dispatch({type:API_CALL_FAIL});
      }
    }
   
    
    const logoutUser =async()=>{
      await instance.get('/auth/logout');
      dispatch({type:LOGOUT_USER});
      
      
    }
    
    const signInUser=async (currUser)=>{
      dispatch({type:SIGNIN_USER_BEGIN});
      try {
        const {data}= await instance.post('/auth/register',currUser);
          dispatch({
            type:SIGNIN_USER_SUCESS,
            payload:data.user
          })
      } catch (error) {
        dispatch({type:SIGNIN_USER_FAIL})
        if (error.response && error.response.data && error.response.data.message) {
          return  alert(error.response.data.message);
        } 
        
        alert(error.message || 'something went wrong tru later');
      }
    }

    const loginUser=async(currUser)=>{
      dispatch({type:LOGIN_USER_BEGIN});
      
      try{
        const {data} =await instance.post('/auth/login',currUser);
        
        dispatch({ 
          type:LOGIN_USER_SUCESS,
          payload:data.user
        })
      }catch(error){
        dispatch({type:LOGIN_USER_FAIL})
        if (error.response && error.response.data && error.response.data.message) {
          return  alert(error.response.data.message);
        } 
        
        alert(error.message || 'something went wrong tru later');
      }

    }
    const getCurrUser=async()=>{
        dispatch({type:GET_USER_BEGIN});
        try{
          const {data}= await instance.get('/auth/getCurrUser');
          dispatch({
            type:GET_USER_SUCCESS,
            payload:data.user
          })
        }catch(err){
          
          if (err.response.status === 401) {
           
            return;
          };
          dispatch({type:GET_USER_FAIL})
          logoutUser();
          console.log(err.responce.data.msg);
        }
    }
    useEffect(() => {
      getCurrUser();
    }, []);
    // ADMIN
    
     const getAllUser=async()=>{
      dispatch({type:API_CALL_BEGIN});
      
      try {
        const {data}= await instance.get('/auth/admin/users')
       
        dispatch({type:GET_ALL_USER_SUCCESS,
          payload:data.users
        })
      } catch (error) {
        dispatch({type:API_CALL_FAIL});
      }
    }
    const changeRole=async(userId,userRole)=>{
      dispatch({type:API_CALL_BEGIN});
      
      try {
        let obj={role:"admin"};
        if(userRole==="admin") obj={role:"user"}
        console.log(obj);
        console.log("hi");


        const {data}= await instance.patch(`/auth/admin/user/${userId}`,obj)
       
        dispatch({type:CHANGE_ROLE__SUCCESS,
          payload:data.users
        })
        // console.log(data.user)
      } catch (error) {
        dispatch({type:API_CALL_FAIL});
      }
    }
    const deleteUser=async(userId)=>{
      dispatch({type:API_CALL_BEGIN});
      
      try {
        const {data}= await instance.delete(`/auth/admin/user/${userId}`)
       
        dispatch({type:DELETE_USER_SUCCESS,
          payload:data.users
        })
        // console.log(data.message);
      } catch (error) {
        dispatch({type:API_CALL_FAIL});
      }
    }
   
    return (
        <AppContext.Provider
          value={{...state,
            getCoins,getAllUser,deleteUser,changeRole,
            getFavList,addToFav,removeFromFav,signInUser,loginUser,logoutUser,getCurrUser}}
        >
          {/*child componect which needs to be contexed eg App.js  */}
          {children}
        </AppContext.Provider>
      );
}
export const useAppContext = () => {
    return useContext(AppContext);
  };
  
  export { AppProvider };