import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, useLocation } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';

function EditPage () {
    
    const { id } = useParams();

    //initialize hooks 
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

   // on page load, fetch the selected and save in the store
   // combined with the url params, this lets the details survive a page refresh
   useEffect(() => {
       dispatch({ type: "FETCH_EDIT_ITEM", payload: id });
       // send the current location to the store
       dispatch({ type: "CHANGE_PAGE", payload: location.pathname });
   }, []);

   const editTask = useSelector((store) => store.editTaskReducer);

   console.log("editTask", editTask);

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
        
        history.push(`/list-view`);
    }

    
    const cancelClick = (event) => {
        history.push(`/details/${id}`);
    }

    console.log("editTask", editTask);

    return(
        <>
        <div className="HeaderFooterSpace"></div>

        <div id='container'>
            
            <div id='form'>
                <form onSubmit={(event) => handleSubmit(event, editTask)}>

                    {/* <input
                        placeholder="task"
                        type="text"
                        value={editTask.task}
                        onChange={(event) => handleChange(event, 'task')}
                    />

                    <input
                        placeholder="due_date"
                        type="date"
                        value={editTask.due_date?.split(`T`)[0]}
                        onChange={(event) => handleChange(event, 'due_date')}
                    />

                    <input
                        placeholder="importance"
                        type="int"
                        value={editTask.importance}
                        onChange={(event) => handleChange(event, 'importance')}
                    />

                    <input
                        placeholder="time_requirement"
                        type="int"
                        value={editTask.time_requirement}
                        onChange={(event) => handleChange(event, 'time_requirement')}
                    />

                    <textarea placeholder='notes' rows="4" cols="50" value={editTask.notes}
                    onChange={(event) => handleChange(event, 'notes')}>

                    </textarea> */}

<div id="newTaskInput"><h2>Task</h2>
            <TextField id="outlined-basic-task" label="" variant="outlined" type='text' value={editTask.task} onChange={(event) => handleChange(event, 'task')} /></div>
            
            <div id="dateInput"><h2>Due Date</h2>
            <TextField id=""label="" variant="outlined" placeholder='Due Date' type='date' value={editTask.due_date?.split(`T`)[0]} onChange={(event) => handleChange(event, 'due_date')} /></div>

            <div id="importanceInput">
                <h2>Importance</h2>
                <Slider id="slider" defaultValue={50} min={1} max={99} type='int' value={editTask.importance} onChange={(event) => handleChange(event, 'importance')}/></div>

            <div id="timeInput"><h2>Time Requirement</h2>
                <TextField id="" label="" type='int' value={editTask.time_requirement} onChange={(event) => handleChange(event, 'time_requirement')} /></div>
           
            <div id ="notesInput"><h2>Notes</h2>
                <TextField fullWidth label='' multiline rows={4} value={editTask.notes} onChange={(event) => handleChange(event, 'notes')}/></div>

                    {/* <button type="submit" >Update</button> */}
                    <div id="updateButtons">
                    
                        <input id="updateTaskBtn"className="btn" type="submit" name="submit" value="Update Task" />
                    

                    
                        <input id="CancelBtn"className="btn"  value="Cancel" onClick={cancelClick}/>
                    
                    </div>

                    {/* <button type="button" onClick={cancelClick}>Cancel</button> */}


                </form>
            </div>
        </div>
        <div className="HeaderFooterSpace"></div>
        </>
    )
}

export default EditPage;