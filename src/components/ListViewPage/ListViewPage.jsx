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

const prioritizedData= [].concat(listItems)
  .sort((a,b) => a.priorityValue < b.priorityValue ? 1 : -1);

  console.log('prioritized data', prioritizedData);

  return (
    <div className="container">
      <p>List View Page</p>
      
      
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
  );
}

export default ListViewPage;
