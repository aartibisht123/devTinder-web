import React, { useState } from 'react'
import UserCard from './UserCard';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const EditProfile = ({user}) => {
      const [firstName, setFirstName] = useState(user.firstName);
      const [lastName, setLastName] = useState(user.lastName);
      const [age, setAge] = useState(user.age || "");
      const [gender, setGender] = useState(user.gender);
      const [about, setAbout] = useState(user.about);
      const [skills, setSkills] = useState(user.skills);
      const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
      const [error, setError] = useState("");
      const dispatch = useDispatch()
      const [showToast, setShowToast] = useState(false)



     const saveProfile = async() =>{
        // clear error
        setError("")
        try {
             const res = await axios.patch(BASE_URL + '/profile/edit',{
        firstName, lastName, age, skills, about, photoUrl, gender
      },{withCredentials:true})
     
      dispatch(addUser(res?.data?.data))
      setShowToast(true)
      setTimeout(()=>{
        setShowToast(false)
      },3000);
        } catch (error) {
        setError(error.response.data)
        }
     
     }

  return (
    <>
    <div className='flex flex-col md:flex-row flex justify-center items-center gap-6 my-4 px-3 '>
    <div className='mx-10 '>
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box 
  w-full sm:w-[22rem] md:w-[24rem] border p-4 " >
  <legend className="fieldset-legend ">Edit Profile</legend>

  <label className="label " >first Name:</label>
  <input type="text" className="input"  value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>

  <label className="label ">Last Name:</label>
  <input type="text" className="input"  value={lastName} onChange={(e)=> setLastName(e.target.value)} />

  <label className="label " >PhotoUrl:</label>
  <input type="text" className="input"  value={photoUrl} onChange={(e)=> setPhotoUrl(e.target.value)}/>

  <label className="label" >Age:</label>
  <input type="text" className="input"  value={age} onChange={(e)=> setAge(e.target.value)}/>

  <label className="label ">Gender:</label>
    <select
        className="select select-bordered"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
      >
        <option value="">Select gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
    
      </select>

  <label className="label " >Skills:</label>
  <input type="text" className="input"  value={skills} onChange={(e)=> setSkills(e.target.value)}/>


 <label className="label " >About:</label>
  <input type="text" className="input"  value={about} onChange={(e)=> setAbout(e.target.value)}/>



<p className='text-red-500'>{error} </p>

<div className='flex justify-center  '>
  <button className="btn  btn-neutral btn-secondary mt-5 " onClick={saveProfile} >Save Profile</button>
</div>

</fieldset>
    </div >
<div className='w-full sm:w-[22rem] md:w-[24rem] mt-4 md:mt-0 flex justify-center '>
  <UserCard user={{firstName, lastName, age, skills, about, photoUrl, gender}}/>
</div>
  
</div>

{ showToast && <div className="toast toast-top toast-center">
  <div className="alert alert-info">
    <span>Profile saved succussfully.</span>
  </div>
  
</div>}
</>

  )
}

export default EditProfile;


