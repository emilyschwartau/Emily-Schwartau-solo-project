import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function ListViewPage() {

  const dispatch = useDispatch();

  //retrieves listItems from the store
  const listItems = useSelector(store => store.listItemsReducer);

  //firing off actions to get data from DB
  useEffect(() => {
    dispatch({ type: 'FETCH_LIST_ITEMS' });
  }, []);


  return (
    <div className="container">
      <p>List View Page</p>

      {listItems.map(item => {
                    return (
                       
                                <div id="margin">
                                    
                                        <div id="card" key={item.id} >
                                            <h3>{item.task}</h3>
                                            <h3>{item.due_date}</h3>
                                
                                            
                                        </div>
                                    
                                </div>
                    );
                    
                })} 


    </div>
  );
}

export default ListViewPage;
