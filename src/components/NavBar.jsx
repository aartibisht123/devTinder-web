import axios from "axios";
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { useEffect } from "react";

const NavBar = () => {
  const user = useSelector((store )=> store.user);
   const dispatch = useDispatch()
   const navigate = useNavigate()
  const handleLogout = async () =>{
   
    try {
      await axios.post(BASE_URL + "/logout",{},{withCredentials: true,});
      dispatch(removeUser())
      return navigate("/login")
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
}, []);

function handleTheme(e) {
  const theme = e.target.checked ? "dark" : "light";
  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}


  return (
  <div className="navbar bg-base-300 ">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">Zivo </Link>
    <h6 className="text-xs" >— Match the energy —</h6>
  </div>
  {user && (
  <div className="flex-none gap-2">

    <div className="dropdown dropdown-end mx-5 flex">
      <div 
      tabIndex={0} 
      role="button" 
      className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="user photo"
            src={user.photoUrl} />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link to="/profile" className="justify-between">
            Profile
            <span className="badge">New</span>
          </Link>
        </li>
        <li><Link to="/connection">Connections</Link></li>
        <li><Link to="/request">Request</Link></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
  )}
<label className="swap swap-rotate mx-3">
  {/* this hidden checkbox toggles theme */}
  <input
    type="checkbox"
    className="theme-controller"
    value="dark"  // toggle light <-> dark
     onChange={handleTheme}
  />

  {/* Sun icon */}
  <svg
    className="swap-off h-6 w-6 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="4"></circle>
      <path d="M12 2v2"></path>
      <path d="M12 20v2"></path>
      <path d="m4.93 4.93 1.41 1.41"></path>
      <path d="m17.66 17.66 1.41 1.41"></path>
      <path d="M2 12h2"></path>
      <path d="M20 12h2"></path>
      <path d="m6.34 17.66-1.41 1.41"></path>
      <path d="m19.07 4.93-1.41 1.41"></path>
    </g>
  </svg>

  {/* Moon icon */}
  <svg
    className="swap-on h-6 w-6 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
    </g>
  </svg>
</label>


  
</div>
  )
}

export default NavBar
