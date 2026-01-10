import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async(status, _id) =>{
    try {
      const res = await axios.post(BASE_URL + "/request/review/" + status + "/" + _id,{},{withCredentials:true})
      dispatch(removeRequest(_id))

    } catch (error) {
      console.error(error.message);
    }
  }

    const fetchRequests = async() =>{
      try {
          const res = await axios.get(BASE_URL + "/user/requests/received", {withCredentials:true});
      
          dispatch(addRequests(res.data.data))
      } catch (error) {
        console.error(error.message);
      }
    }
      
       useEffect(()=>{
      fetchRequests()
       },[]);
       if(!requests) return;

       if(requests.length === 0) return <h1 className='flex justify-center my-10'> No Request Found</h1>
    
 return <div className='text-center my-10'>
          <h1 className='text-bold color- white text-3xl'>Connection Requests</h1>
          {requests.map((request)=>{
            const {_id, firstName, lastName, age, skills, about, photoUrl, gender} = request.fromUserId;

            return(
              <div key={_id} className="flex items-center gap-4 m-4 p-4 border rounded-lg bg-base-300 md:w-1/2 md:mx-auto h-32 justify-around">
                <div className="flex items-center gap-4">
                  <img src={photoUrl} alt="photo" className='h-16 w-16  md:h-20 md:w-20 rounded-full object-cover shrink-0 aspect-square'/>
                </div>
               
               <div className='text-left mx-4'>
                  <h2 className='font-bold md:text-xl'>{firstName + " " + lastName}</h2>
              
               </div>   
               <div className="flex flex-col md:flex-row gap-3">
                <button className="btn btn-primary mx-2 " onClick={() => reviewRequest("rejected", request._id)}>Reject</button>
               <button className="btn btn-secondary mx-2 " onClick={() => reviewRequest("accepted", request._id)}>Accept</button>  
                </div> 
                  
              </div>
            )
          })}
 </div>
}


export default Requests
