import axios from 'axios'
import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import '../styles/Main.css';

function Register() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loginName, setLoginName] = useState<string>('');
  const [loginPassw, setLoginPassw] = useState<string>('');
  const [loginMessage, setLoginMessage] = useState<string>('');

  const cookies = new Cookies();

  var emailRegex =  /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var passwRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;

  function checkIfReg() {
    if(!emailRegex.test(email)){
      setMessage('User email is not correct format');
    }else if(!passwRegex.test(password)){
      setMessage(`User password is not correct, should contain: uppercase letter,  lowercase letter, special case letter, digits, and minimum length of 8`);
    }
    if(emailRegex.test(email) && passwRegex.test(password)){
      setMessage('');
    }
  }

  function checkIf() {
    if(!passwRegex.test(loginPassw)){
      setLoginMessage(`User password is not correct, should contain: uppercase letter,  lowercase letter, special case letter, digits, and minimum length of 8`);
    }
    if(passwRegex.test(loginPassw)){
      setLoginMessage('');
    }
  }

  const register = async () => {
    setEmail(email.toLowerCase());
    const respReg = await axios.post('http://localhost:3069/user/register', {
      username: username,
      email: email,
      password: password
    });

    const resp = await axios.post('http://localhost:3069/auth/login', {
      username: username,
      password: password
    })

    var token = JSON.stringify(resp.data).replace('}', '').split(':');
    cookies.set('token', token[1], {path: '/'});
    cookies.set('loggedin', "true", {path: '/'});
  }

  const login = async () => {
    const resp = await axios.post('http://localhost:3069/auth/login', {
      username: loginName,
      password: loginPassw
    })

    var token = JSON.stringify(resp.data).replace('}', '').split(':');
    cookies.set('token', token[1], {path: '/'});
    cookies.set('loggedin', "true", {path: '/'});
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
                  checkIfReg();
                }}
              />
              <input 
                type='password'
                placeholder='Password...'
                onChange={(e) => {
                  setPassword(e.target.value);
                  checkIfReg();
                }}
              />
              <p style={{color: 'red', fontSize: '125%', fontWeight: 'bold'}}>{message}</p>
              <button className='projectCreate' onClick={async (e) => {
                e.preventDefault();
                if(username.length > 0  &&
                  email.length > 0 &&
                  password.length > 0) {
                    await register();
                    window.location.replace("http://localhost:3000/profile");
                } else {
                  alert("Missing data for registration");
                }
                
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
                  setLoginName(e.target.value);
                }}
              />
              <input 
                type='password'
                placeholder='Password...'
                onChange={(e) => {
                  setLoginPassw(e.target.value);
                  checkIf();
                }}
              />
              <p style={{color: 'red', fontSize: '125%', fontWeight: 'bold'}}>{loginMessage}</p>
              <button className='projectCreate' onClick={async (e) => {
                e.preventDefault();
                if (loginName.length > 0 &&
                  loginPassw.length > 0) {
                    await login();
                    window.location.replace("http://localhost:3000/profile");
                  } else {
                    alert("Missing data for login");
                  }
              }}>LOGIN</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Register