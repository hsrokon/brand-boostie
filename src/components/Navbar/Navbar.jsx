import { useContext, useEffect, useRef, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider'; 
import { TbLogout } from 'react-icons/tb';
import { hover, motion } from 'framer-motion';

const Navbar = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logOutUser } = useContext(AuthContext);

  // user drop down and focusring handle 
  const dropdownRef = useRef(null);
  const userButtonRef = useRef(null);
  useEffect(()=>{
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
      userButtonRef.current && !userButtonRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside)
  },[])

  const handleLogOut = () => {
    logOutUser()
    .then()
    .catch(error => {
      console.log("Sign out error", error);
    })
  }

  const navItemClasses = ({ isActive }) =>
  `block py-2 px-2 rounded-md transition-all duration-150 ${
    isActive ? 'bg-primary text-white' : ''
  }`;

  const routeToLabel = (path) => {
  return path
    .replace(/^\//, '')                          // remove leading slash
    .replace(/([A-Z])/g, ' $1')                  // add space before caps
    .replace(/\b\w/g, char => char.toUpperCase())// capitalize each word
    .trim();
};


  return (
    <nav className="bg-white border-gray-200 font-poppins">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={'https://i.ibb.co/QjJ55qVd/tr-reduced.png'} className="h-11" alt="Logo" />
        </a>

        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          {
            !user && <div className='md:space-x-2'>
            <Link to={'/auth/login'} ><button className='btn btn-sm lg:btn-md border-0 bg-primary text-white rounded-lg'>Login</button></Link>
            <Link to={'/auth/signup'} ><button className='hidden md:inline-block btn lg:btn-md btn-sm md:border-2 border-primary text-primary rounded-lg'>Sign Up</button></Link>
          </div>
          }
          
          {
            user && <button
            ref={userButtonRef}
            type="button"
            // md:me-0 
            className={`flex text-sm bg-gray-800 ${isUserDropdownOpen && 'focus:ring-4 focus:ring-green-600'} rounded-full`}
            onClick={() => setIsUserDropdownOpen(prev => !prev)}
          >
            <span className="sr-only">Open user menu</span>
            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full">
              <img className="w-full h-full object-cover rounded-full" src={user.photoURL} alt="user" />
            </div>
          </button>
          }
          
          { user && isUserDropdownOpen && (
            <div 
            ref={dropdownRef}
            className="absolute top-14 right-12 z-50 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm">
              <div className="px-4 py-3">
                <span className="block text-sm text-gray-900">{user?.displayName}</span>
                <span className="block text-sm text-gray-500 truncate">{user?.email}</span>
              </div>
              <ul className="py-2">
                <li className="cursor-pointer block px-4 py-2 text-sm hover:bg-gray-100">Dashboard</li>
                <li className="cursor-pointer block px-4 py-2 text-sm hover:bg-gray-100">Settings</li>
                <li className="cursor-pointer block px-4 py-2 text-sm hover:bg-gray-100">Earnings</li>
                <li 
                onClick={handleLogOut}
                className="cursor-pointer flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100">Sign out <TbLogout /></li>
              </ul>
            </div>
          )}

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-user"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        <div
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? '' : 'hidden'}`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-3 text-sm lg:text-base lg:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white">
            
            {["/", "/services", "/pricing", "/caseStudies", "/about", "/blog"].map(nav => 
              <motion.div
              className='relative group'
              initial="rest"
              animate="rest"
              whileHover="hover"
            >
              <NavLink to={nav}
                className={navItemClasses}>
                {()=>routeToLabel(nav) === "" ? "Home" : routeToLabel(nav)}
              </NavLink>
              {/* Use NavLink's `isActive` inside a function to disable the animation */}
              <NavLink
              to={nav}
              children={({isActive})=> 
                !isActive && (
                  <motion.div
                  className='absolute left-0 bottom-0 h-0.5 bg-primary'
                  variants={{
                    rest: {width : 0, opacity: 0, x: -20},
                    hover: {width: '100%', opacity: 1, x: 0},
                  }}
                  transition={{duration: 0.4, ease: 'easeOut'}}
                  />
                )}
              />
            </motion.div>
            )} 
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;