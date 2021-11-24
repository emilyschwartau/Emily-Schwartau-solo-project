import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { useState } from 'react';

function TaskDetails () {
     // get the movie id from the url parameter
     const { id } = useParams();
     //console.log("id", id);

     const dispatch = useDispatch();
     const history = useHistory();
     const location = useLocation();

         // on page load, fetch the movie genres and save in the store
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
    
        history.push(`/edit/${id}`);

    }
    
    


    return (
        <section>
        <h1>Task Details</h1>

        {
            selectedTask.task ? (
            <>
              
                <h2>Task: {selectedTask.task}</h2>
                <h2>Due date: {selectedTask.due_date}</h2>
                <h2>Notes: {selectedTask.notes}</h2>
                <h2>Importance: {selectedTask.importance}</h2>
                <h2>Time requirement: {selectedTask.time_requirement}</h2>
                <h2>Completion Status: {selectedTask.completion_status.toString()}</h2>
                <button onClick={handleEdit}>Edit Task</button>


            </>
            ) : (
              <p>No task selected.</p>
            )
        }
        </section>
    )

}

export default TaskDetails;