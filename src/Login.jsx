import axios from 'axios';
import React, { useState } from 'react'

const Login = () => {

    const [emailId, setEmailId] = useState("aartisingh@gmail.com");
    const [password, setPassword] = useState("Aartisingh@1234");

    const handleLogin = async () => {
        try {
          const res =  await axios.post('http://localhost:3000/login',
            {
          emailId,
          password,
            },
            {withCredentials: true}
          );
        }catch (error) {
            console.log(error);
        }};

  return (
    <div className='flex justify-center my-40'>
    <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border h-80 p-4" >
  <legend className="fieldset-legend">Login</legend>

  <label className="label mt-3" >Email</label>
  <input type="email" className="input" placeholder="Email" value={emailId} onChange={(e)=> setEmailId(e.target.value)}/>

  <label className="label mt-3">Password</label>
  <input type="password" className="input" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)} />

  <button className="btn btn-neutral mt-5" onClick={handleLogin}>Login</button>
</fieldset>
    </div>
  )
}

export default Login
