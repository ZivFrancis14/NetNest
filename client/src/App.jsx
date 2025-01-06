import { BrowserRouter, Routes, Route, Link } from 'react-router'
import Home from './pages/HomePage/HomePage';
import styles from './styles/App.module.css';
import Existgame from './components/game/Existgame';
import Newgame from './components/game/Newgame';
import About from './components/AboutandContact/About';
import Contact from './components/AboutandContact/Contact';

// import projectLogo from './assets/project-logo.png'
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
          </Routes>
        </main>
      </div>
    </BrowserRouter>




    // <BrowserRouter>
    //   <div className={styles.app}>
    //     <header className={styles.appHeader}>
    //       <img src={projectLogo} alt="Logo" className={styles.appLogo} />
    //       <nav className={styles.appNav}>
    //         <Link to="/" className={styles.appLink}>Home</Link>
    //       </nav>
    //     </header>
    //     <main className={styles.main}>
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //       </Routes>
    //     </main>
    //     <footer className={styles.footer}>
    //       <p>&copy; 2024 My App</p>
    //     </footer>
    //   </div>
    // </BrowserRouter>





  );
}

export default App;
