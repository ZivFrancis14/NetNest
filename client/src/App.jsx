import { BrowserRouter, Routes, Route, Link } from 'react-router'
import React from 'react';
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
import Existgame from './components/Game/Existgame';
import Newgame from './components/Game/Newgame';
import About from './components/AboutandContact/About';
import Contact from './components/AboutandContact/Contact';
import Screengame from './components/Game/Screengame';
import Usergame from './components/Game/Usergame';
import safetylogo from './assets/safetylogo.png'

function App() {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <header className={styles.appHeader}>
          <img src={safetylogo} alt="Logo" className={styles.appLogo} />
          <nav className={styles.appNav}>
            <Link to="/" className={styles.appLink}>Home</Link>
            <Link to="/about" className={styles.appLink}>About</Link>
            <Link to="/contact" className={styles.appLink}>Contact</Link>
          </nav>
          
        </header>
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/existgame" element={<Existgame />} />
            <Route path="/newgame" element={<Newgame />} />
            <Route path="/playgame" element={<Screengame />} />
            <Route path="/usergame" element={<Usergame />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
