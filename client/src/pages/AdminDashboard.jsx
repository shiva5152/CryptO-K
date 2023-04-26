import React, { useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { Link } from 'react-router-dom';


 const AdminDashboard = () => {
    const {getAllUser,users,deleteUser,changeRole,isLoading,user}=useAppContext();
    useEffect(()=>{
        getAllUser();
    },[])

    
    return (
       <div className="">
       <nav className='z-10 bg-gray-800 p-4 flex justify-between items-center'>
       <Link to={'/'} > <span className='font-lg text-blue-500 font-bold text-lg'>CryptoK</span></Link>
       <h2 className='font-bold text-white text-[1.2rem] p-1'> Admin Dashboard</h2>
       </nav>
        <div className="p-4">
            <ul role="list" className="divide-y divide-gray-200">
              {users.map((person) => (
                <li key={person.email} className=" flex justify-between gap-x-6 py-5">
                  <div className="flex gap-x-4">
                    <img className="h-12 w-12 flex-none rounded-full bg-slate-200 object-cover" src={person.imageUrl} alt="" />
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
                    </div>
                  </div>
                  <div className='flex items-end'>
                  <button className='text-blue' disabled={isLoading} onClick={()=>{
                             if(user._id===person._id){ 
                                alert("you can't delete your self")
                                return;
                            }else deleteUser(person._id)
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill={`green`} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg> 
                  </button>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="capitalize font-bold text-sm leading-6 text-gray-900">{person.role}</p>
                    <button disabled={isLoading} onClick={()=>{
                        if(user._id===person._id){ 
                            alert("you can't change role of your self")
                            return;
                        }else changeRole(person._id,person.role)
                    }} className="bg-blue-500 hover:bg-blue-400 text-white py-1 px-1 rounded">Change role</button>
                  </div>
                 
                  </div>
                </li>
              ))}
            </ul>
            </div>
       </div>
      )
}

 export default AdminDashboard
