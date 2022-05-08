import { useEffect, useState, useCallback } from 'react'
import axios from 'axios'

import { IUser } from '../interfaces/user.interface'
import Cookies from 'universal-cookie';
import '../styles/Main.css';

function Profile() {
  const [user, setUser] = useState<IUser>();

  const cookies = new Cookies();

  const getProfile = async () => {
    var token = cookies.get('token');
    const resp = await axios.get(
      'http://localhost:3069/user/profile', {
        headers: {"Authorization": `Bearer ${token}`}
      }
    )
    setUser(resp.data);
  }

  const logout = async () => {
    var token = cookies.get('token');
    const resp = await axios.get('http://localhost:3069/auth/logout', {
      headers: {"Authorization": `Bearer ${token}`}
    })
    
    cookies.set('token', '');
    cookies.set('loggedin', 'false');

    window.location.replace("http://localhost:3000/");
  }

  getProfile();

  return (
    <div className='site'>
      <div className='maincontent'>
        <div className='defaultContainer'>
          <h1>{user?.username}</h1>
          <h1>{user?.email}</h1>
          <button  className='projectCreate' onClick={logout}>LOGOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Profile