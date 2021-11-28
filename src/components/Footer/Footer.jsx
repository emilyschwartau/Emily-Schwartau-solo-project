import React, {useEffect, useState} from 'react';
import './Footer.css';
import { useSelector } from 'react-redux';
//import { Info } from 'react-feather';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
//import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch } from 'react-redux';
import { Grid, List, PlusCircle } from 'react-feather';



// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'




function Footer() {

  const user = useSelector((store) => store.user);

  const dispatch = useDispatch();

  const history = useHistory();

  const [path, setPath] = useState('');

  history.listen ((location, action) => {
    console.log(location, action);
    setPath (location);
  })

  function aboutLoginClick() {
    history.push('/login');
  }

  function aboutLogoutClick() {
    dispatch({ type: 'LOGOUT' });
    history.push('/login');
  }

  function gridClick() {
    history.push('/graph-view');
  }

  function listClick() {
    history.push('/list-view');
  }

  function addClick() {
    history.push('/add-task-form');
  }

  return (
    <footer>
      {(() => {
        if (user.id === undefined && history.location.pathname === "/about") {
          return (
            <div id="aboutLoginBtn">
              <Button id="aboutLoginBtnSpecific" variant="contained" size="large" onClick={() => aboutLoginClick()}>Log In</Button>
            </div>
          )
        } else if (user.id === undefined && history.location.pathname === "/login") {
          return (
            <div></div>
          )
        } else if (user.id === undefined && history.location.pathname === "/registration") {
          return(
            <div></div>
          )   
        } else if (user.id && history.location.pathname === "/about") {
          return (
            <div id="aboutLoggedIn">
            <div id="aboutGridIcon">
              <span id="gridIcon" onClick={() => gridClick()}>
                <Grid color='#ffffff' size="40" /> 
              </span>
            </div>
            <div id="aboutLogoutBtn">
              <Button id="aboutLogoutBtnSpecific" variant="contained" size="large" onClick={() => aboutLogoutClick()}>Log Out</Button>
            </div>
            <div id="aboutListIcon">
              <span id="listIcon" onClick={() => listClick()}>
                <List color='#ffffff' size="40" /> 
              </span>
            </div>
            </div>
          )
        } else if (user.id && history.location.pathname === "/user") {
          return (
            <div id="aboutLoggedIn">
            <div id="aboutGridIcon">
              <span id="gridIcon" onClick={() => gridClick()}>
                <Grid color='#ffffff' size="40" /> 
              </span>
            </div>
            <div id="addTaskIcon">
            <span id="addTaskIcon" onClick={() => addClick()}>
                <PlusCircle color='#ffffff' size="40" /> 
              </span>
            </div>
            <div id="userListIcon">
              <span id="listIcon" onClick={() => listClick()}>
                <List color='#ffffff' size="40" /> 
              </span>
            </div>
            </div>          )
        } else if (user.id && history.location.pathname === "/list-view") {
          return (
            <div id="aboutLoggedIn">

            <div id="GraphAddTaskIcon">
            <span id="addTaskIcon" onClick={() => addClick()}>
                <PlusCircle color='#ffffff' size="40" /> 
              </span>
            </div>
            <div id="listGridIcon">
              <span id="gridIcon" onClick={() => gridClick()}>
                <Grid color='#ffffff' size="40" /> 
              </span>
            </div>
            </div>           )
        } else if (user.id && history.location.pathname === "/graph-view") {
          return (
            <div id="aboutLoggedIn">

            <div id="GraphAddTaskIcon">
            <span id="addTaskIcon" onClick={() => addClick()}>
                <PlusCircle color='#ffffff' size="40" /> 
              </span>
            </div>
            <div id="graphListIcon">
              <span id="listIcon" onClick={() => listClick()}>
                <List color='#ffffff' size="40" /> 
              </span>
            </div>
            </div>           )
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
            <div></div>
          )
        }
      })()}

    </footer>
  )
  
}

export default Footer;


     {/* if no user logged in */}
     
    //  {user.id === undefined && 
    //   //  history.location.pathname === "/about" (
    //   //    <p>about page not logged in </p>
    //   //  )

      

    // (
     
      
    //  <p>not logged in </p>
    // )}   

    // {/* If a user is logged in */}
    //   {user.id && (
    //   <p>logged in</p>
    //   )}