import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';

const Navbar = () => {

  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  }
  return (
    <header>
        <div className='container'>
            <Link to='/'><span className='title-span'>Workout Buddy <span className='subtitle-span'>- your own workout tracker </span> </span></Link>
            <nav>
              { user && (
                <div className='mail-section'>
                  <span>{user.email}</span>
                  <button onClick={handleClick}>Log out</button>
                </div>
            )}
            { !user && (
                <div>
                  <Link to='/login' >Login</Link>
                  <Link to='/signup' >Signup</Link>
                </div>

            )}
            </nav>
        </div>
    </header>
  )
}

export default Navbar;
