import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Grid, List, PlusCircle, Tool, AlertCircle, CheckCircle, CheckSquare, Trash, Edit} from 'react-feather';


function TaskDetails () {
     // get the movie id from the url parameter
     const { id } = useParams();
     //console.log("id", id);

     const dispatch = useDispatch();
     const history = useHistory();
     const location = useLocation();

    // on page load, fetch the selected and save in the store
    // combined with the url params, this lets the details survive a page refresh
    useEffect(() => {
        dispatch({ type: "FETCH_SELECTED_TASK", payload: id });
        // send the current location to the store
        dispatch({ type: "CHANGE_PAGE", payload: location.pathname });
    }, []);
    
    const selectedTask = useSelector((store) => store.selectedTaskReducer);


    // click edit to go to the edit page and bring id with
    function handleEdit () {
        
        dispatch({ type: 'SET_EDIT_ITEM', payload: selectedTask }); 
    
        history.push(`/edit/${selectedTask.id}`);

    }
    
  

    let dueDate = new Date(selectedTask.due_date);
    let dueDateNumber = dueDate.toDateString();
    console.log(dueDateNumber);

    const updateItem = (id) => {
        dispatch({type: 'UPDATE_LIST_ITEM', payload: id});
    }

    const deleteItem = (id) => {
        dispatch({type: 'DELETE_LIST_ITEM', payload: id});
        history.push('/list-view');
      }

    return (
        <div>
        <div className="HeaderFooterSpace"></div>
        

        {
            selectedTask.task ? (
            <>
                <div id="taskDetail">
                <h1>Task: {selectedTask.task}</h1>
                <h2>Due date: {dueDateNumber}</h2>
                <h2>Notes: {selectedTask.notes}</h2>
                <h2>Importance from 0 to 100: {selectedTask.importance}</h2>
                <h2>Time requirement: {selectedTask.time_requirement} minutes</h2>
                
                </div>
                <div id="detailBtns">
                
                <CheckSquare size="40" id="checkDetails" onClick={() => updateItem(selectedTask.id)}></CheckSquare>
                <Edit size="40"id="editDetails" onClick={handleEdit}>Edit Task</Edit>
                <Trash size="40"id="deleteDetails" onClick={() => deleteItem(selectedTask.id)}>DELETE</Trash>
                </div>

            </>
            ) : (
              <p>No task selected.</p>
            )
        }
        </div>
    )

}

export default TaskDetails;