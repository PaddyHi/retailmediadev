import { useState } from 'react';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Hamburger Menu */}
      <div className="absolute top-0 left-0 p-4">
        <button
          className="text-xl focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          &#9776; {/* Hamburger Icon */}
        </button>
      </div>

      {/* Full-Screen Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center text-black z-50">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-3xl focus:outline-none"
            onClick={toggleMenu}
            aria-label="Close Menu"
          >
            &times; {/* Close Icon */}
          </button>

          {/* Menu Items */}
          <ul className="space-y-8 text-center text-2xl">
            <li><a href="#home" className="hover:text-gray-500">p01: creative builder</a></li>
            <li><a href="mailto:info@patrickhinlopen.nl" className="hover:text-gray-500">contact me</a></li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="typewriter"> 
        <h1 className="text-2xl font-black">hello World 👋,</h1>
      </div>
      <br />
      <p>welcome to retailmedia.dev, this is my place to experiment with development projects in the field of retail media.</p>

      <br />
      <a href="https://www.linkedin.com/in/patrick-hinlopen-%F0%9F%9F%A2-9b5b1216a/" target="_blank" rel="noopener noreferrer">
        <i className="fa fa-linkedin-square text-blue-800"></i> <small>patrick hinlopen</small>
      </a>
    </>
  );
}

export default App;
