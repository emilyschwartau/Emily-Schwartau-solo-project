import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { useState, useEffect } from "react";

function EditPage () {

    //initialize hooks 
    const dispatch = useDispatch();
    const history = useHistory();
    const editTask = useSelector((store) => store.editTaskReducer);

    //useEffect here?? to refresh page??
    

    //check if changing as typing 
    function handleChange(event, property) {
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: { property: property, value: event.target.value }
        });
    }

    //called with submit button is pushed
    function handleSubmit(event) {
        event.preventDefault();
        dispatch({
            type: 'SET_EDIT_SUBMIT',
            payload: editTask
        })
        
        //need to have /details/id?
        history.push('/details');
    }

    //CANCEL- works ---- ADD SNACKBAR 
    const cancelClick = (event) => {
        history.push('/details');
    }



    return(
        <div id='container'>
            <h1>edit Task</h1>
            <div id='form'>
                <form onSubmit={(event) => handleSubmit(event, editTask)}>

                    <input
                        placeholder="task"
                        type="text"
                        value={editTask.task}
                        onChange={(event) => handleChange(event, 'task')}
                    />

                    <input
                        placeholder="due_date"
                        type="date"
                        value={editTask.due_date}
                        onChange={(event) => handleChange(event, 'due_date')}
                    />

                    <input
                        placeholder="importance"
                        type="int"
                        value={editTask.importance}
                        onChange={(event) => handleChange(event, 'importance')}
                    />

                    <input
                        placeholder="Time Requirement"
                        type="int"
                        value={editTask.time_requirement}
                        onChange={(event) => handleChange(event, 'Time Requirement')}
                    />

                    <textarea placeholder='Notes' rows="4" cols="50" value={editTask.notes}
                    onChange={(event) => handleChange(event, 'Notes')}>

                    </textarea>

                    {/* need to have an onClick to handleSubmit??? */}
                    <button type="submit" >Update</button>

                    <button type="button" onClick={cancelClick}>Cancel</button>


                </form>
            </div>
        </div>
    )
}

export default EditPage;