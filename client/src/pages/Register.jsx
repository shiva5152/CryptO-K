import React, { useEffect, useState } from 'react'
import  FormField  from '../components/FormField'
import { useAppContext } from '../context/appContext';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';
// import { useAppContext } from '../context/appContext'

const Register = () => {
  const navigate =useNavigate();
  const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
    haveAccount:true
  })
  const {signInUser,loginUser,isAuthenticated,isLoading}=useAppContext()
  
  
  const toggleMember=()=>{
    setUser({...user,haveAccount:!user.haveAccount});
  }

  const onSubmit=(e)=>{
    e.preventDefault();
    const { name, email, password, haveAccount } = user;
    if (!email || !password || (!haveAccount && !name)) {
      alert("provoide all values")
      return;
    }
    if(haveAccount){
      loginUser({
        email:user.email,
        password:user.password
      });
    }else{
      signInUser({
        name:user.name,
        email:user.email,
        password:user.password
      });
    }
  }

  useEffect(()=>{
    if(isAuthenticated){
      navigate('/');
    }
  },[isAuthenticated]);
  const handleChange =(e)=>{
    setUser({...user,[e.target.name]:e.target.value})

  }
   if(isLoading){
     return (
       <div className="text-lg absolute inset-0 z-0 flex justify-center items-center rounded-lg">
         Loading...
       </div>
     )
  }
  return (
    <div className='h-screen w-full'>
      {/* background */}
      <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
     <form onSubmit={onSubmit} className='flex items-center justify-center flex-col h-full '>
      <div >
      <Link to={'/'} > <span className='font-lg text-blue-500 font-bold text-[2.5rem]'>CryptoK</span></Link>
      </div>
      {/* name feild */}
      {!user.haveAccount && (
        <div className='sm:w-80 xs:w-9/12 mt-5'>
        <FormField
                labelName="Name"
                type="text"
                name="name"
                placeholder="user name"
                value={user.name}
                handleChange={handleChange}
        />
        </div>
      )}
      {/* email feild */}
      <div className="sm:w-80 xs:w-9/12 mt-6">
      <FormField
              labelName="Email"
              type="text"
              name="email"
              placeholder="user email"
              value={user.email}
              handleChange={handleChange}
      />
      </div>
      <div className="sm:w-80 xs:w-9/12 mt-6">
      <FormField
              labelName="Password"
              type="text"
              name="password"
              placeholder="user password"
              value={user.password}
              handleChange={handleChange}
      />
      </div>
      <div>
        <button 
         type='submit'
         className=" text-white bg-[#020205] my-4 font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        > {user.haveAccount?"Login":"SignIn"}</button>
      </div>
      <div>
      <p className='text-sm'>
          {user.haveAccount? 'Do not have account? ' : 'Already have an account? '}

          <button type='button' onClick={toggleMember} className='text-[#6469ff]'>
            {user.haveAccount ? 'SignIn' : 'Login'}
          </button>
      </p>
      </div>
      </form>
      
    </div>
  )
}

export default Register