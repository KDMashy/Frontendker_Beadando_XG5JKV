import React, { useLayoutEffect, useState } from 'react';
import Logo from '../res/logo.gif';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";
import ReorderIcon from '@mui/icons-material/Reorder';

function Navbar() {
  const [openLinks, setOpenLinks] = useState(false);
  
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

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  }

  return (
    <div className='navbar'>
      <div className='leftside' id={openLinks ? "open" : "close"}>
        <Link to="/"> <img src={Logo} alt='logo' className='logoImg'/> </Link>
        <div className='hiddenLinks'>
          <Link to="/" onClick={toggleNavbar}> Home </Link>
          <Link to="/projects" onClick={toggleNavbar}> Projects </Link>
          <Link to="/about" onClick={toggleNavbar}> About </Link>
          <Link to="/register" onClick={toggleNavbar}> Login </Link>
          <Link to="/profile" onClick={toggleNavbar}> Profile </Link>
        </div>
      </div>
      <div className='rightside'>
        <Link to="/"> Home </Link>
        <Link to="/projects"> Projects </Link>
        <Link to="/about"> About </Link>
        <Link to="/register"> Login </Link>
        <Link to="/profile"> Profile </Link>
        <button onClick={toggleNavbar}>
            <ReorderIcon />
        </button>
      </div>
    </div>
  )
}

export default Navbar