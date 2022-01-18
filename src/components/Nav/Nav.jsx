//import React from 'react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';
import { useSelector } from 'react-redux';
import { Info } from 'react-feather';
import { useHistory } from 'react-router-dom';

function Nav() {
  const user = useSelector((store) => store.user);

  const selectedTask = useSelector((store) => store.selectedTaskReducer);  

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
            </>
          )
        } else if (user.id && history.location.pathname === "/list-view") {
          return (
            <>
            <div>
              <h2 className="nav-title">
                List View
              </h2>
            </div>

            <span id="infoIcon" onClick={() => handleAboutClick()}>
              <Info color='#ffffff' size="40" /> 
            </span>
            </>
          )
        } else if (user.id && history.location.pathname === "/graph-view") {
          return (
            <>
            <div>
              <h2 className="nav-title">
                Graph View
              </h2>
            </div>

            <span id="infoIcon" onClick={() => handleAboutClick()}>
              <Info color='#ffffff' size="40" /> 
            </span>
            </>
          )
        } else if (user.id && history.location.pathname === "/add-task-form") {
          return (
            <>
            <div>
              <h2 className="nav-title">
                Add Task
              </h2>
            </div>

            <span id="infoIcon" onClick={() => handleAboutClick()}>
              <Info color='#ffffff' size="40" /> 
            </span>
            </>
          )
        } else if (user.id && history.location.pathname === `/details/${selectedTask.id}`) {
          return (
            <>
            <div>
              <h2 className="nav-title">
                Task Details
              </h2>
            </div>

            <span id="infoIcon" onClick={() => handleAboutClick()}>
              <Info color='#ffffff' size="40" /> 
            </span>
            </>
          )
        } else if (user.id && history.location.pathname === `/edit/${selectedTask.id}`) {
          return (
            <>
            <div>
              <h2 className="nav-title">
                Edit Task
              </h2>
            </div>

            <span id="infoIcon" onClick={() => handleAboutClick()}>
              <Info color='#ffffff' size="40" /> 
            </span>
            </>
          )
        } else if(user.id && history.location.pathname === `/completed-tasks`) {
          return(
            <>
            <div>
              <h2 className="nav-title">
                Completed Tasks
              </h2>
            </div>

            <span id="infoIcon" onClick={() => handleAboutClick()}>
              <Info color='#ffffff' size="40" /> 
            </span>
            </>
          )
        } else if (user.id && history.location.pathname === `/overdue-tasks`) {
          return(
            <>
            <div>
              <h2 className="nav-title">
                Overdue Tasks
              </h2>
            </div>

            <span id="infoIcon" onClick={() => handleAboutClick()}>
              <Info color='#ffffff' size="40" /> 
            </span>
            </>
          )
        }else {
          return (
            <>
            <div>
              <Link to="/login">
                <h2 className="nav-title">
                  Task Matrix
                </h2>
              </Link>
            </div>

            <span id="infoIcon" onClick={() => handleAboutClick()}>
              <Info color='#ffffff' size="40" /> 
            </span>
            </>
          )
        }
      })()}
    </header>
  );
}

export default Nav;
