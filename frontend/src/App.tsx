import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Footer from './components/Footer';
import Register from './pages/register';
import Profile from './pages/profile';
import Notfound from './pages/NotFound';
import Cookies from 'universal-cookie';

function App() {

  const cookies = new Cookies();

  const [logged, setLogged] = useState(false);

  useEffect(() => {
    var isLoggedIn = cookies.get('loggedin');
    if (isLoggedIn === 'true'){
      setLogged(true);
    } else {
      setLogged(false);
    }
  });

  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          {
            logged ? [
              <Route path='/register' element={<Notfound />} />,
              <Route path='/profile' element={<Profile />} />,
              <Route path='/projects' element={<Projects />} />] : [
              <Route path='/profile' element={<Notfound />} />,
              <Route path='/register' element={<Register />} />,
              <Route path='/projects' element={<Notfound />} />
          ]}
          <Route path='/notfound' element={<Notfound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
