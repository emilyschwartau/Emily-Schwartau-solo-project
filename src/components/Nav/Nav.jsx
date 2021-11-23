import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Info } from 'react-feather';
import { useHistory } from 'react-router-dom';


function Nav() {
  const user = useSelector((store) => store.user);

  const history = useHistory();

  function handleAboutClick () {
    history.push('/about');
  }



  return (
    <div className="nav">
      <Link to="/login">
        <h2 className="nav-title">Task Matrix</h2>
      </Link>
      <div>
        {/* If no user is logged in, show these links */}
        {user.id === null &&
          // If there's no user, show login/registration links
          <Link className="navLink" to="/login">
            Login / Register
          </Link>
        }

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link className="navLink" to="/user">
              Home
            </Link>

            <Link className="navLink" to="/list-view">
              List View
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

      
        {/* <Link className="navLink" to="/about">
          About
        </Link> */}

        
          <span id="infoIcon" onClick={() => handleAboutClick()}>
              <Info color='#ffffff' size="40" 
              
              
              /> 
          </span>


      </div>
      
    </div>
  );
}

export default Nav;
