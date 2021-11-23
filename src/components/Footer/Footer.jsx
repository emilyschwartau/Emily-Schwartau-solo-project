import React, {useEffect, useState} from 'react';
import './Footer.css';
import { useSelector } from 'react-redux';
//import { Info } from 'react-feather';
import { useHistory, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';



// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'




function Footer() {

  const user = useSelector((store) => store.user);

  const history = useHistory();

  const [path, setPath] = useState('');

  history.listen ((location, action) => {
    console.log(location, action);
    setPath (location);
  })


  return (
    <footer>
      {(() => {
        if (user.id === undefined && history.location.pathname === "/about") {
          return (
            <div>about page / not logged in</div>
          )
        } else if (user.id === undefined && history.location.pathname === "/login") {
          return (
            <div>login / not logged in</div>
          )
        } else if (user.id === undefined && history.location.pathname === "/registration") {
          return(
            <div>registration / not logged in</div>
          )   
        } else if (user.id && history.location.pathname === "/about") {
          return (
            <div>about page / logged in</div>
          )
        } else if (user.id && history.location.pathname === "/user") {
          return (
            <div>home page / logged in</div>
          )
        } else if (user.id && history.location.pathname === "/list-view") {
          return (
            <div>list view page / logged in</div>
          )
        } else if (user.id && history.location.pathname === "/graph-view") {
          return (
            <div>list view page / logged in</div>
          )
        } else if (user.id && history.location.pathname === "/add-task-form") {
          return (
            <div>add task form page / logged in</div>
          )
        } else if (user.id && history.location.pathname === "/details") {
          return (
            <div>task details page / logged in</div>
          )
        }
        else {
          return (
            <div>login after logging out</div>
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