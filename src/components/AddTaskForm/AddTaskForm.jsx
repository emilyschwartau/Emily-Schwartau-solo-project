import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';


function AddTaskForm () {

    const dispatch = useDispatch();

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

    //function to dispatch an action to add local state object to DB
    //sets of chain of events to add to DB, re-get all list items from DB,
    //and update list item reducer
    const addNewMovie = event => {
        event.preventDefault();
        dispatch({ type: 'ADD_TASK', payload: newTask });
    }

    return (
        <>
        <p>Add A New Task</p>

        <div>
        <form onSubmit={addNewMovie} >

            <input placeholder='Task' type='text' value={newTask.task} onChange={handleTaskChange} />
            <input placeholder='Due Date' type='date' value={newTask.due_date} onChange={handleDueDateChange} />
            <input placeholder='Importance' type='int' value={newTask.importance} onChange={handleImportanceChange} />
            <input placeholder='Time Requirement' type='int' value={newTask.time_requirement} onChange={handleTimeRequirementChange} />
            <textarea placeholder='Notes' rows="4" cols="50" value={newTask.notes} onChange={handleNotesChange}></textarea>
            
            <input type='submit' value='Save' />

        </form>
    </div>
    </>
    )
}

export default AddTaskForm;