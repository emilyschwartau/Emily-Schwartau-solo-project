import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Grid, List, PlusCircle, Tool, AlertCircle, CheckCircle, CheckSquare, Trash} from 'react-feather';
import ListItemButton from '@mui/material/ListItemButton';

function OverdueTaskArchive () {

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
    history.push('/overdue-tasks')
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

    const current = new Date();
    const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

    // To set two dates to two variables
    //date1 is today's date, date2 is due date
    let currentDate = new Date(date);
    console.log(currentDate);
    let today = currentDate.getTime();
    console.log("today", today);

    //map through listItems & change them to numbers & push them to new array

    let overDueArray = [];
    console.log("overdue", overDueArray);

    function filter() {
        listItems.map( item => {
            let dueDate = new Date(item.due_date);
            let dueDateNumber = dueDate.getTime();
            if (dueDateNumber < currentDate && item.completion_status === false) {
               overDueArray.push(item); 
            }
            return (
                console.log("overDueArray", overDueArray)
            )
        })
    }

    filter();

    const prioritizedData= [].concat(overDueArray)
    .sort((a,b) => a.priorityValue < b.priorityValue ? 1 : -1);

    console.log('prioritized data', prioritizedData);
    
    return (
        <div className="container">
        <p>OverDue Task Archive</p>
        
        
        <ol> 
        {prioritizedData?.map(item => {
                      return (
                        <li>
                                  {/* <div id="margin">
                                      
                                          <div id="card" key={item.id} onClick={() => handleSelectTask(item)}>
                                              <h3>Task: {item.task}</h3>
                                              <h3>due date: {item.due_date}</h3>
                                          </div>
                                          
                                          <div>
                                              {user.id && <button onClick={() => deleteItem(item.id)}>DELETE</button>}
                                              {user.id && <button onClick={() => updateItem(item.id)}>COMPLETE TASK</button>}
                                          </div>
                                      
                                  </div> */}

                                  <div id="margin">
                                        <div id="completeBtn">
                                            {user.id && <CheckSquare onClick={() => updateItem(item.id)}></CheckSquare>}
                                        </div>
                                        <div id="card" key={item.id} onClick={() => handleSelectTask(item)}>
                                            <ListItemButton><h2>{item.task}</h2></ListItemButton>
                                            
                                        </div>
                                        
                                        <div id ="deleteBtn">
                                            {user.id && <Trash onClick={() => deleteItem(item.id)}>DELETE</Trash>}
                                        </div>


                                </div> 
                          </li>
                      );
                      
                  })} 
          </ol>
  
      </div>


    )

}

export default OverdueTaskArchive;

