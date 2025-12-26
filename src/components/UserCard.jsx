import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";

import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
 
  const { _id, firstName, lastName, age, skills, gender, about , photoUrl,} = user;
  const dispatch = useDispatch();

    const handleSendRequest = async (status, userId) =>{
      try {
        const res = await axios.post(BASE_URL + "/request/send/" + status + "/" + userId,
            {},{withCredentials: true})
            dispatch(removeUserFromFeed(userId));
      } catch (error) {
        console.error(error.message)
      }
    }

  return (
    <div className="card bg-base-300 w-89 mt-5 shadow-sm h-140">
      <figure>
        <img className="mt-10 h-75"
          src={photoUrl}
          alt="photo"
        />
      </figure>
      <div className="card-body mx-4">
        <h2 className="card-title " >{firstName + " " + lastName}</h2>
     {age && gender && <p>{age}, {gender}</p>}

        <p > {skills}</p>
        <p  >{about}</p>
       
        <div className="card-actions justify-center mx-4  my-6" >
        <button className="btn btn-primary" onClick={()=> handleSendRequest("ignored" , _id)}> Ignore</button>
         <button className="btn btn-secondary" onClick={()=> handleSendRequest("interested" , _id)}>Interested </button>
        </div>
      </div>
    </div>
  
  );
};

export default UserCard;
