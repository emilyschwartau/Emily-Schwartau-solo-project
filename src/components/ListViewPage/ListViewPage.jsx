import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';

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

  return (
    <>
    <div className="HeaderFooterSpace"></div>
    <div className="container">
    <p>List View Page</p>
    <div>
    {(() => {
      if (overdueCount === 1) {
        return (
        <p>you have {overdueCount} overdue Task!</p>
        )
      } else if (overdueCount > 0) {
        return (
          <p>you have {overdueCount} overdue Tasks!</p>
        )
      }
    })()}
    </div>


      
      
      
      <ol> 
      {prioritizedData?.map(item => {
                    return (
                      <li>
                                <div id="margin">
                                    
                                        <div id="card" key={item.id} onClick={() => handleSelectTask(item)}>
                                            <h3>Task: {item.task}</h3>
                                            <h3>due date: {item.due_date}</h3>
                                        </div>
                                        
                                        <div>
                                            {user.id && <button onClick={() => deleteItem(item.id)}>DELETE</button>}
                                            {user.id && <button onClick={() => updateItem(item.id)}>COMPLETE TASK</button>}
                                        </div>
                                    
                                </div>
                        </li>
                    );
                    
                })} 
        </ol>

    </div>
    <div className="HeaderFooterSpace"></div>
    </>
  );
}

export default ListViewPage;
