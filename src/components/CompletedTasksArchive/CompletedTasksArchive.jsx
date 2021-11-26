import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

function CompletedTasksArchive () {

         //firing off actions to get data from DB
  useEffect(() => {
    dispatch({ type: 'FETCH_LIST_ITEMS' });
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();

  const listItems = useSelector(store => store.listItemsReducer);
  const user = useSelector((store) => store.user);
  
  console.log('store.listItemsReducer', listItems);
  
    const deleteItem = (id) => {
    dispatch({type: 'DELETE_LIST_ITEM', payload: id});
    }

    const updateItem = (id) => {
    dispatch({type: 'UPDATE_LIST_ITEM', payload: id});
    }

    const handleSelectTask = (item) => {
    // store selected task object in Redux
    dispatch({ type: 'SET_SELECTED_TASK', payload: item }); 

    // go to details view
    history.push(`/details/${item.id}`);
    //console.log(movie);
    };

    // const current = new Date();
    // const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

    // // To set two dates to two variables
    // //date1 is today's date, date2 is due date
    // let currentDate = new Date(date);
    // console.log(currentDate);
    // let today = currentDate.getTime();
    // console.log("today", today);

        //map through listItems & change them to numbers & push them to new array

        let completedArray = [];
        console.log("overdue", completedArray);
    
        function filter() {
            listItems.map( item => {
                if (item.completion_status === true) {
                   completedArray.push(item); 
                }
                return (
                    console.log("completedArray", completedArray)
                )
            })
        }
    
        filter();

    return (
        <div className="container">
        <p>Completed Task Archive</p>
        
    
        <ul> 
        {completedArray?.map(item => {
                      return (
                        <li>
                                  <div id="margin">
                                      
                                          <div id="card" key={item.id} onClick={() => handleSelectTask(item)}>
                                              <h3>Task: {item.task}</h3>
                                              <h3>due date: {item.due_date}</h3>
                                          </div>
                                          
                                          <div>
                                              {user.id && <button onClick={() => deleteItem(item.id)}>DELETE</button>}
                                              
                                          </div>
                                      
                                  </div>
                          </li>
                      );
                      
                  })} 
          </ul>
  
      </div>
    )
}

export default CompletedTasksArchive;

