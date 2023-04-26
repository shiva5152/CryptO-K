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

const reducer =(state,action)=>{
    
    if(action.type===GET_USER_BEGIN||action.type===SIGNIN_USER_BEGIN || action.type===API_CALL_BEGIN){
        return{
            ...state,
            isLoading:true         
        }
    }
    if(action.type===GET_USER_SUCCESS){
        return {
            ...state,
            isLoading:false,
            isAuthenticated:true,
            user:action.payload,
            isAdmin:action.payload?.role==="admin",
            
        }
    }
    if(action.type===GET_USER_FAIL || action.type===API_CALL_FAIL){
        return {
            ...state,
            isLoading:false,
        }
    }
    if(action.type===LOGOUT_USER){
        return {
            ...state,
            user:null,
            isAuthenticated:false,
            isAdmin:false
        }
    }
    if(action.type===LOGIN_USER_BEGIN){
        return {
            ...state,
            isLoading: true,
          };
    }
    if(action.type===LOGIN_USER_SUCESS){
        return {
            ...state,
            isLoading:false,
            isAuthenticated:true,
            user:action.payload,
            isAdmin:action.payload?.role==="admin",
           

        }
    }
    if(action.type==LOGIN_USER_FAIL || action.type===SIGNIN_USER_FAIL){
        return {
            ...state,
            isLoading:false,
            isAuthenticated:false,
            user:null,
        }
    }
    if(action.type===SIGNIN_USER_SUCESS){
        return {
            ...state,
            isLoading:false,
            isAuthenticated:true,
            user:action.payload,
            isAdmin:action.payload?.role==="admin",
            
        }
    }
    if(action.type===AAD_FAV_SUCCESS){
        return {
            ...state,
            isLoading:false, 
            favListChange:!state.favListChange ,
            favList:action.payload    
        }
    }
    if(action.type===REMOVE_FAV_SUCCESS){
        return {
            ...state,
            isLoading:false, 
            favListChange:!state.favListChange ,
            favList:action.payload  
        }
    }
    if(action.type===GET_COINS_SUCCESS){
        return {
            ...state,
            isLoading:false,

            coins:action.payload
        }
    }
    if(action.type===DELETE_USER_SUCCESS || action.type===CHANGE_ROLE__SUCCESS){
        return {
            ...state,
            isLoading:false,
            users:action.payload
        }
    }
    // if(action.type===CHANGE_ROLE__SUCCESS){
    //     return {
    //         ...state,
    //         isLoading:false,
    //         users:action.payload
    //     }
    // }
    if(action.type===GET_ALL_USER_SUCCESS){
        return {
            ...state,
            isLoading:false,
            users:action.payload
        }
    }
    if(action.type===GET_FAV_LIST_SUCCESS){
        return {
            ...state,
            isLoading:false,
            favList:action.payload
        }
    }
    
    
   
    throw new Error(`no such action : ${action.type}`)
}
export default reducer;
