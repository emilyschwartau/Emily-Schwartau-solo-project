import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Trash } from 'react-feather';
import ListItemButton from '@mui/material/ListItemButton';

function CompletedTasksArchive () {

    //firing off actions to get data from DB
    useEffect(() => {
        dispatch({ type: 'FETCH_LIST_ITEMS' });
    }, []);

    const dispatch = useDispatch();
    const history = useHistory();

    const listItems = useSelector(store => store.listItemsReducer);
    const user = useSelector((store) => store.user);
  
    //console.log('store.listItemsReducer', listItems);
  
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
    };

    //map through listItems & change them to numbers & push them to new array
    let completedArray = [];
    //console.log("overdue", completedArray);
    
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
        <>
        <div className="HeaderFooterSpace">
        </div>

        <div className="container">
            <ul> 
                {completedArray?.map(item => {
                    return (
                        <li>
                            <div id="margin">
                                <div id="card" key={item.id} onClick={() => handleSelectTask(item)}>
                                    <ListItemButton>
                                        <h2>
                                            {item.task}
                                        </h2>
                                    </ListItemButton>
                                </div>
                                <div id ="deleteBtn">
                                    {user.id && <Trash onClick={() => deleteItem(item.id)}>DELETE</Trash>}
                                </div>
                            </div>
                        </li>
                    );
                      
                })} 
            </ul>
        </div>
        <div className="HeaderFooterSpace">
        </div>
        </>
    )
}

export default CompletedTasksArchive;

