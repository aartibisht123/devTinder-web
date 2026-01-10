import axios from 'axios'
import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addConnections } from '../utils/connectionSlice'
import { Link } from 'react-router-dom'

const Connections = () => {
  const connections = useSelector((store) => store.connection);
  const dispatch = useDispatch();
    const fetchConnections = async() =>{
      try {
          const res = await axios.get(BASE_URL + "/user/connection", {withCredentials:true});
      
          dispatch(addConnections(res.data.data))
      } catch (error) {
        console.error(error.message);
      }
    }
      
       useEffect(()=>{
      fetchConnections()
       },[]);
       if(!connections) return;

       if(connections.length === 0) return <h1 className='flex justify-center my-10 '> No Connections  Found</h1>
    
 return <div className='text-center my-10 pr-6 ' >
          <h1 className='text-bold color- white text-3xl '>Connections</h1>
          {connections.map((connection)=>{
            const {_id, firstName, lastName,  photoUrl } = connection;

            return(
              <div
              key={_id} 
              className="flex items-center gap-4 m-4 p-4 border rounded-lg bg-base-300 md:w-1/2 md:mx-auto h-32 justify-between">
                <div >
                  <img 
                  src={photoUrl} 
                  alt="photo" 
                  className='   h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 rounded-full object-cover flex-shrink-0'/>
                </div>
               
               <div className='text-left mx-4'>
                  <h2 className='font-bold md:text-xl'>{firstName + " " + lastName}</h2>
               
               </div>
              
                 <Link to={"/chat/" + _id }> 
                 <button className='btn btn-primary '>Chat</button> </Link> 
             
                 
              </div>
            )

          })}
 </div>
}

export default Connections;
