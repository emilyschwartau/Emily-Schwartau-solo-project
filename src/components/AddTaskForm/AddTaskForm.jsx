import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
import TextField from '@mui/material/TextField';
import Slider from '@mui/material/Slider';

function AddTaskForm () {

    const dispatch = useDispatch();

    const history = useHistory();

    const userInputs = useSelector(store => store.userInputsReducer);

    let [newTask, setNewTask] = useState({ task: '', due_date: '', importance: '', time_requirement: '', notes: ''});

    //series of functions to add properties to local state object
    const handleTaskChange = (event) => {
        setNewTask({...newTask, task: event.target.value})
    }

    const handleDueDateChange = (event) => {
        setNewTask({...newTask, due_date: event.target.value})
    }

    const handleImportanceChange = (event) => {
        setNewTask({...newTask, importance: event.target.value})
    }

    const handleTimeRequirementChange = (event) => {
        setNewTask({...newTask, time_requirement: event.target.value})
    }

    const handleNotesChange = (event) => {
        setNewTask({...newTask, notes: event.target.value})
    }

    let priorityValue = 0;

    //function to dispatch an action to add local state object to DB
    //sets of chain of events to add to DB, re-get all list items from DB,
    //and update list item reducer
    const addNewTask = event => {

        event.preventDefault();

        //dispatching to reducer that holds user inputs
        //for manipulation prior to sending to DB
        //is this needed? ADD_TASK also stores to reducer???
        dispatch({ type: "SUBMIT_TASK_DETAILS", payload: newTask });

        //dispatching to saga that adds to database
        dispatch({ type: 'ADD_TASK', payload: newTask });

        history.push('/list-view');
    }
           
    //console.log(priorityValue);

    //console.log(newTask);
    
    //console.log(userInputs);

    return (
        <>
        <div className="HeaderFooterSpace"></div>
            <div>
                <form onSubmit={addNewTask} >
            
                    <div id="newTaskInput">
                        <h2>New Task</h2>
                        <TextField id="outlined-basic-task" label="New Task" variant="outlined" type='text' value={newTask.task} onChange={handleTaskChange} />
                    </div>
            
                    <div id="dateInput">
                        <h2>Due Date</h2>
                        <TextField id=""label="" variant="outlined" placeholder='Due Date' type='date' value={newTask.due_date.toString()} onChange={handleDueDateChange} />
                    </div>

                    <div id="importanceInput">
                        <h2>Importance</h2>
                        <Slider id="slider" defaultValue={50} min={1} max={99} type='int' value={newTask.importance} onChange={handleImportanceChange} />
                    </div>

                    <div id="timeInput">
                        <h2>Time Requirement</h2>
                        <TextField id="" label="in minutes" type='int' value={newTask.time_requirement} onChange={handleTimeRequirementChange} />
                    </div>
           
                    <div id ="notesInput">
                        <h2>Notes</h2>
                        <TextField fullWidth label='Notes' multiline rows={4} value={newTask.notes} onChange={handleNotesChange}/>
                    </div>
            
                    <div id="submitNewTaskBtn">
                        <input className="btn" type="submit" name="submit" value="Save Task" />
                    </div>
            

                </form>
        
            </div>
        <div className="HeaderFooterSpace"></div>
        </>
    )
}

export default AddTaskForm;