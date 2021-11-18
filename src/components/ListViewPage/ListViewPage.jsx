import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ListViewPage() {

  const dispatch = useDispatch();

  //retrieves listItems from the store
  const listItems = useSelector(store => store.listItemsReducer);

  const user = useSelector((store) => store.user);

  //firing off actions to get data from DB
  useEffect(() => {
    dispatch({ type: 'FETCH_LIST_ITEMS' });
  }, []);

const deleteItem = (id) => {
  dispatch({type: 'DELETE_LIST_ITEM', payload: id});
}

  return (
    <div className="container">
      <p>List View Page</p>

      {listItems.map(item => {
                    return (
                       
                                <div id="margin">
                                    
                                        <div id="card" key={item.id} >
                                            <h3>Task: {item.task}</h3>
                                            <h3>due date: {item.due_date}</h3>
                                            {user.id && <button onClick={() => deleteItem(item.id)}>DELETE</button>}
                                            
                                        </div>
                                    
                                </div>
                    );
                    
                })} 


    </div>
  );
}

export default ListViewPage;
