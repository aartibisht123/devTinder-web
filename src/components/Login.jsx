import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {

    const [emailId, setEmailId] = useState("aartisingh@gmail.com");
    const [password, setPassword] = useState("Aartisingh@1234");
     const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [isLoginForm, setIsLoginFrom] = useState(true);
    const [error, setError] = useState("")
    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleLogin = async () => {
        try {
          const res =  await axios.post(BASE_URL + '/login',
            {
          emailId,
          password,
            }, 
            {withCredentials: true}
          );
          
          dispatch(addUser(res.data))
         return navigate("/");

        }catch (error) {
            setError(error?.response?.data || "something went wrong")
        }};
      

        const handleSignUp = async () =>{
          try {
            const res = await axios.post(BASE_URL + "/signup",{firstName, lastName, emailId, password},{withCredentials:true})

            dispatch(addUser(res.data))
             return navigate("/profile");

          } catch (error) {
             setError(error?.response?.data || "something went wrong")
          }
        }

  return (
    <div className={isLoginForm?'flex justify-center my-30 md:my-40' : 'flex justify-center my-10  md:my-20 '}>
     
<fieldset className={isLoginForm? "fieldset bg-base-00 border-base-300 rounded-box w-xs border h-80 p-4 ": "fieldset bg-base-200 border-base-300 rounded-box w-xs border h-122 p-4  " } >
  <legend className="fieldset-legend">
    {isLoginForm ? 'Login' : "SignUp"}</legend>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          isLoginForm ? handleLogin() : handleSignUp();
        }}
      >
  {!isLoginForm && (
<>
    <label className="label mt-3" >First Name</label>
  <input type="email" className="input"  value={firstName} onChange={(e)=> setFirstName(e.target.value)}/>

    <label className="label mt-3" >Last Name</label>
  <input type="email" className="input"  value={lastName} onChange={(e)=> setLastName(e.target.value)}/>
  </>)}

  <label className="label mt-3" >Email ID</label>
  <input type="email" className="input"  value={emailId} onChange={(e)=> setEmailId(e.target.value)}/>

  <label className="label mt-3">Password</label>
  <input type="password" className="input"  value={password} onChange={(e)=> setPassword(e.target.value)} />

<p className='text-red-500'>{error} </p>
  <button className="btn btn-neutral mt-5" onClick={isLoginForm ? handleLogin : handleSignUp}>{isLoginForm?  "Login" : "Sign Up"}</button>
 </form>
 
  <p className=' cursor-pointer py-2' onClick={()=>setIsLoginFrom((value) => !value)}>{isLoginForm? "New User? SignUp Here": "Existing User? Login Here"}</p>
</fieldset>

      </div>
    
  
  )
}

export default Login
