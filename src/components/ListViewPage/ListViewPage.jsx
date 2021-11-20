import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function ListViewPage() {

  const dispatch = useDispatch();
  const history = useHistory();


  const listItems = useSelector(store => store.listItemsReducer);
  const user = useSelector((store) => store.user);

  //retrieves listItems from the store
  
  console.log('store.listItemsReducer', listItems);
  console.log('listItems.taskArray', listItems.taskArray);
  const taskArray = listItems.taskArray;

  //firing off actions to get data from DB
  useEffect(() => {
    dispatch({ type: 'FETCH_LIST_ITEMS' });
  }, []);

const deleteItem = (id) => {
  dispatch({type: 'DELETE_LIST_ITEM', payload: id});
}

const updateItem = (id) => {
  dispatch({type: 'UPDATE_LIST_ITEM', payload: id});
}

const handleSelectTask = (item) => {
  // store selected movie object in Redux
  dispatch({ type: 'SET_SELECTED_TASK', payload: item }); 

  // go to details view
  history.push('/details');
  //console.log(movie);
};

  return (
    <div className="container">
      <p>List View Page</p>

      {/* {taskArray.map(item => {
                    return (
                       
                                <div id="margin">
                                    
                                        <div id="card" key={item.id} onClick={() => handleSelectTask(item)}>
                                            <h3>Task: {item.task}</h3>
                                            <h3>due date: {item.due_date}</h3>
                                            {user.id && <button onClick={() => deleteItem(item.id)}>DELETE</button>}
                                            {user.id && <button onClick={() => updateItem(item.id)}>COMPLETE TASK</button>}
                                        </div>
                                    
                                </div>
                    );
                    
                })} 
 */}

    </div>
  );
}

export default ListViewPage;
