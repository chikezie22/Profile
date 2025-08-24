import { useState } from 'react';
import { FaTimes, FaLaptopCode } from 'react-icons/fa';
import { NavLink } from 'react-router';
import { HiBars3BottomRight } from 'react-icons/hi2';

const navLinks = [
  { to: '/', path: 'Home' },
  { to: '/projects', path: 'Projects' },
  { to: '/blog', path: 'Blog' },
  { to: '/about', path: 'About' },
  { to: '/contact', path: 'Contact' },
];

const Navbar = () => {
  const base = `transition hover:text-blue-400`;
  const active = `text-blue-400 font-semibold`;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-md sticky top-0 z-50 backdrop-blur-3xl h-[60px]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className={'flex items-center gap-2 text-lg font-bold text-blue-300'}>
          <FaLaptopCode className="text-blue-400 text-xl" />
          <span>The Friendly Developer</span>
        </NavLink>

        {/* desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <div className="space-x-4 text-sm text-gray-300">
            {navLinks.map(({ to, path }) => (
              <NavLink key={to} className={({ isActive }) => (isActive ? active : base)} to={to}>
                {path}
              </NavLink>
            ))}
          </div>
        </div>

        {/* mobile navigation */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            className="text-blue-400 text-xl cursor-pointer"
            title="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <HiBars3BottomRight />}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-gray-800/90 border-t border-gray-700 px-6 py-4  flex flex-col gap-4 items-end text-left backdrop-blur-3xl absolute left-0 right-0  top-[60px] h-screen">
          {navLinks.map(({ to, path }) => (
            <NavLink
              key={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => (isActive ? active : base)}
              to={to}
            >
              {path}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
