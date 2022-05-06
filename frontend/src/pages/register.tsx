import axios from 'axios'
import React, { useState } from 'react'

function Register() {
  const [jwt, setJwt] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const register = async () => {
     const resp = await axios.post('http://localhost:3069/user/register', {
      username: username,
      email: email,
      password: password
    });
    console.log(resp.data);
  }

  const login = async () => {
    const resp = await axios.post('http://localhost:3069/auth/login', {
      username: username,
      password: password
    })
    console.log(resp.data);
  }

  return (
    <div className='site'>
      <div className='maincontent'>
        <div className='defaultContainer'>
            <div className='register'>
              <h1>REGISTRATION</h1>
              <input 
                type='text'
                placeholder='Username...'
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input 
                type='email'
                placeholder='Email...'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input 
                type='password'
                placeholder='Password...'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button onClick={(e) => {
                e.preventDefault();
                register();
              }}>REGISTER</button>
            </div>
        </div>
        <div className='defaultContainer'>
            <div className='register'>
              <h1>LOGIN</h1>
              <input 
                type='text'
                placeholder='Username...'
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <input 
                type='password'
                placeholder='Password...'
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button onClick={(e) => {
                e.preventDefault();
                login();
              }}>LOGIN</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Register