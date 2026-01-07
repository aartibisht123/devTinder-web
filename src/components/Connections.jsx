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

       if(connections.length === 0) return <h1 className='flex justify-center my-10'> No Connections  Found</h1>
    
 return <div className='text-center my-10 ' >
          <h1 className='text-bold color- white text-3xl'>Connections</h1>
          {connections.map((connection)=>{
            const {_id, firstName, lastName, age, skills, about, photoUrl, gender} = connection;

            return(
              <div key={_id} className='flex m-4 p-4 border rounded-lg border bg-base-300 w-1/2 mx-auto h-40 items-center  '>
                <div>
                  <img src={photoUrl} alt="photo" className=' m-20 h-20 rounded-full '/>
                </div>
               
               <div className='text-left mx-4'>
                  <h2 className='font-bold text-xl'>{firstName + " " + lastName}</h2>
                { age && gender && <p>{age+ ", " + gender}</p>}
                   <p>{about}</p>
                   <p>{skills}</p>
                
               </div>
              
                 <Link to={"/chat/" + _id }> 
                 <button className='btn btn-primary '>Chat</button> </Link> 
             
                 
              </div>
            )

          })}
 </div>
}

export default Connections;
