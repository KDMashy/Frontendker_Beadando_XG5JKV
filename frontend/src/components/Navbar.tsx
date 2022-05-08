import React, { useEffect, useLayoutEffect, useState } from 'react';
import Logo from '../res/logo.gif';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";
import ReorderIcon from '@mui/icons-material/Reorder';
import Cookies from 'universal-cookie';

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  const [logged, setLogged] = useState(false);
  
  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
        if (window.innerWidth > 600){
          setOpenLinks(openLinks);
        }
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }

  useWindowSize();

  const cookies = new Cookies();
  useEffect(() => {
    var isLoggedIn = cookies.get('loggedin');
    if (isLoggedIn === 'true'){
      setLogged(true);
    } else {
      setLogged(false);
    }
  });

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  }

  return (
    <div className='navbar'>
      <div className='leftside' id={openLinks ? "open" : "close"}>
        <Link to="/"> <img src={Logo} alt='logo' className='logoImg'/> </Link>
        <div className='hiddenLinks'>
          <Link to="/" onClick={toggleNavbar}> Home </Link>
          <Link to="/projects" onClick={toggleNavbar} id={logged ? "profLog" : "profNoLog"}> Projects </Link>
          <Link to="/about" onClick={toggleNavbar}> About </Link>
          <Link to="/register" onClick={toggleNavbar} id={logged ? "loginNoLog" : "loginLog"}> Login </Link>
          <Link to="/profile" onClick={toggleNavbar} id={logged ? "profLog" : "profNoLog"}> Profile </Link>
        </div>
      </div>
      <div className='rightside'>
        <Link to="/"> Home </Link>
        <Link to="/projects" id={logged ? "profLog" : "profNoLog"}> Projects </Link>
        <Link to="/about"> About </Link>
        <Link to="/register" id={logged ? "loginNoLog" : "loginLog"}> Login </Link>
        <Link to="/profile" id={logged ? "profLog" : "profNoLog"}> Profile </Link>
        <button onClick={toggleNavbar}>
            <ReorderIcon />
        </button>
      </div>
    </div>
  )
}

export default Navbar