import React from 'react';
import '../styles/Main.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className='site'>
      <div className='maincontent'>
        <div className='defaultContainer'>
          <h1>Welcome to my project ToDo site</h1>
          <p>
            I made the site to create projects im working on right now, and list them.
          </p>
          <p>
            Hope you find something that interests you.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home