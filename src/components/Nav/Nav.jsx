//import React from 'react';
import React, {useEffect, useState} from 'react';
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

  const [path, setPath] = useState('');

  history.listen ((location, action) => {
    console.log(location, action);
    setPath (location);
  })



  return (
    <header className="nav">
    {(() => {
      if (user.id === undefined && history.location.pathname === "/about") {
        return (
          <div>
              <h2 className="nav-title">About</h2>
          </div>
        )
      } else if (user.id === undefined && history.location.pathname === "/login") {
        return (
          <>
          <div>
            <Link to="/login">
              <h2 className="nav-title">Task Matrix</h2>
            </Link>
          </div>
          <span id="infoIcon" onClick={() => handleAboutClick()}>
            <Info color='#ffffff' size="40" /> 
          </span>
          </>
        )
      } else if (user.id === undefined && history.location.pathname === "/registration") {
        return(
          <>
          <div>
            <Link to="/login">
              <h2 className="nav-title">Task Matrix</h2>
            </Link>
          </div>
          <span id="infoIcon" onClick={() => handleAboutClick()}>
            <Info color='#ffffff' size="40" /> 
          </span>
          </>
        )   
      } else if (user.id && history.location.pathname === "/about") {
        return (
          <div>
            <h2 className="nav-title">About</h2>
          </div>
        )
      } else if (user.id && history.location.pathname === "/user") {
        return (
          <>
          <div>
            <Link to="/login">
              <h2 className="nav-title">Task Matrix</h2>
            </Link>
          </div>
          <span id="infoIcon" onClick={() => handleAboutClick()}>
            <Info color='#ffffff' size="40" /> 
          </span>
          </>        )
      } else if (user.id && history.location.pathname === "/list-view") {
        return (
          <>
          <div>
            
              <h2 className="nav-title">List View</h2>
            
          </div>
          <span id="infoIcon" onClick={() => handleAboutClick()}>
            <Info color='#ffffff' size="40" /> 
          </span>
          </>          )
      } else if (user.id && history.location.pathname === "/graph-view") {
        return (
          <>
          <div>
            
              <h2 className="nav-title">Graph View</h2>
            
          </div>
          <span id="infoIcon" onClick={() => handleAboutClick()}>
            <Info color='#ffffff' size="40" /> 
          </span>
          </>        )
      } else if (user.id && history.location.pathname === "/add-task-form") {
        return (
          <div>add task form page / logged in</div>
        )
      } else if (user.id && history.location.pathname === "/details") {
        return (
          <div>task details page / logged in</div>
        )
      } else if (user.id && history.location.pathname === "/edit") {
        return (
          <div>edit task page / logged in</div>
        )
        
      }else {
        return (
          <>
          <div>
            <Link to="/login">
              <h2 className="nav-title">Task Matrix</h2>
            </Link>
          </div>
          <span id="infoIcon" onClick={() => handleAboutClick()}>
            <Info color='#ffffff' size="40" /> 
          </span>
          </>        )
      }
    })()}

  </header>
  );
}

export default Nav;

{/* <div className="nav">
<Link to="/login">
  <h2 className="nav-title">Task Matrix</h2>
</Link>
<div> */}
  {/* If no user is logged in, show these links */}
  // {user.id === null &&
  //   // If there's no user, show login/registration links
  //   <Link className="navLink" to="/login">
  //     Login / Register
  //   </Link>
  // }

  {/* If a user is logged in, show these links */}
  // {user.id && (
  //   <>
  //     <Link className="navLink" to="/user">
  //       Home
  //     </Link>

  //     <Link className="navLink" to="/list-view">
  //       List View
  //     </Link>

  //     <LogOutButton className="navLink" />
  //   </>
  // )}


  {/* <Link className="navLink" to="/about">
    About
  </Link> */}

  
//     <span id="infoIcon" onClick={() => handleAboutClick()}>
//         <Info color='#ffffff' size="40" 
        
        
//         /> 
//     </span>


// </div>

// </div>
