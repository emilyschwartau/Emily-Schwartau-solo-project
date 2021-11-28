import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { Grid, List, PlusCircle, Tool, AlertCircle, CheckCircle, CheckSquare, Trash} from 'react-feather';
import ListItemButton from '@mui/material/ListItemButton';
//import ListItemText from '@mui/material/ListItemText';



function ListViewPage() {

  //firing off actions to get data from DB
  useEffect(() => {
    dispatch({ type: 'FETCH_LIST_ITEMS' });
  }, []);

  const dispatch = useDispatch();
  const history = useHistory();

  //let [currentStudent, setCurrentStudent] = useState({});


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

const current = new Date();
const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

// To set two dates to two variables
//date1 is today's date, date2 is due date
let currentDate = new Date(date);
console.log(currentDate);
let today = currentDate.getTime();
console.log("today", today);

let overDueArray = [];
console.log("overdue", overDueArray);

function overdueFilter() {
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

overdueFilter();

let overdueCount = overDueArray.length;
console.log(overdueCount);



let filteredArray = [];
console.log("filteredArray", filteredArray);

function filter() {
    listItems.map( item => {
        let dueDate = new Date(item.due_date);
        let dueDateNumber = dueDate.getTime();
        if (dueDateNumber > currentDate && item.completion_status === false) {
           filteredArray.push(item); 
        }
        return (
            console.log("filteredArray", filteredArray)
        )
    })
}

filter();

const prioritizedData= [].concat(filteredArray)
  .sort((a,b) => a.priorityValue < b.priorityValue ? 1 : -1);

  console.log('prioritized data', prioritizedData);

  function clickOverdue() {
    history.push('/overdue-tasks');
}

function clickCompleted() {
  history.push('/completed-tasks');
}



  return (
    <>
    <div className="HeaderFooterSpace"></div>
    <div id="overdueTasksAlertList" onClick={() => clickOverdue()}>
  
  {(() => {
   if (overdueCount === 1) {
      return (
          <div>
          <span id="alertIconList" >
                  <AlertCircle color='black' size="30" /> 
          </span>
          click to view {overdueCount} overdue Task!
          </div> 
          
      )
  } else if (overdueCount > 0) {
      return (
          <div>
          <span id="alertIconList" >
                  <AlertCircle color='black' size="30" /> 
          </span>
          click to view {overdueCount} overdue Tasks!
          </div> 
          
      )
  }
  })()}
</div>
<div id="completedTasksAlertList" onClick={() => clickCompleted()}>
        <span id="completedIconList" >
                <CheckCircle color='black' size="30" /> 
        </span> 
        click to view completed task archive
        </div>

<h1 id="todoTitle">To-Do</h1>
    {/* <div className="container"> */}

      <ol> 
      {prioritizedData?.map(item => {
                    return (
                      <li>
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

    {/* </div> */}
    <div className="HeaderFooterSpace"></div>
    </>
  );
}

export default ListViewPage;
