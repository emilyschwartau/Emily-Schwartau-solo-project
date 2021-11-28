import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';


function AddTaskForm () {

    const dispatch = useDispatch();

    const userInputs = useSelector(store => store.userInputsReducer);

    //let [newTask, setNewTask] = useState({ task: '', due_date: '', importance: '', time_requirement: '', notes: '', priority_value: ''});
    let [newTask, setNewTask] = useState({ task: '', due_date: '', importance: '', time_requirement: '', notes: ''});

    //series of functions to add properties to local state object
    const handleTaskChange = (event) => {
        setNewTask({...newTask, task: event.target.value})
    }

    const handleDueDateChange = (event) => {
        setNewTask({...newTask, due_date: event.target.value})

        //setNewTask({...newTask, due_date: new Date(event.target.value).toLocaleDateString()})
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

    // const handlePriorityValue = () => {
    //     const current = new Date();
    //     const date = `${current.getMonth()+1}/${current.getDate()}/${current.getFullYear()}`;

    //     // To set two dates to two variables
    //     //date1 is today's date, date2 is due date
    //     let date1 = new Date(date);
    //     let date2 = new Date(userInputs.due_date);
      
    //     // To calculate the time difference of two dates
    //     let DifferenceInTime = date2.getTime() - date1.getTime();
      
    //     // To calculate the no. of days between two dates
    //     let DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);

    //     let xValue = (userInputs.importance * .01) * (14);
    //     let yValue = (14)-DifferenceInDays;

    //     priorityValue = xValue * yValue;

    //     //dispatch({type: "UPDATE_PRIORITY_VALUE", payload: Number(priorityValue)});

    //     //setNewTask({...newTask, priority_value: priorityValue})
        

    //         return (
    //             priorityValue
                
    //         )
    //     }

       // handlePriorityValue();

        //dispatch({type: "UPDATE_PRIORITY_VALUE", payload: Number(priorityValue)});
    
        //setNewTask({...newTask, priority_value: priorityValue})


    //function to dispatch an action to add local state object to DB
    //sets of chain of events to add to DB, re-get all list items from DB,
    //and update list item reducer
    const addNewTask = event => {
        //handlePriorityValue();

        event.preventDefault();
        //dispatching to reducer that holds user inputs
        //for manipulation prior to sending to DB
        dispatch({ type: "SUBMIT_TASK_DETAILS", payload: newTask });
      
        //handlePriorityValue();
       
        //dispatch({type: "UPDATE_PRIORITY_VALUE", payload: Number(priorityValue)});

        //this was immediately adding to DB
        dispatch({ type: 'ADD_TASK', payload: newTask });
    }
           
    console.log(priorityValue);

    console.log(newTask);
    
    console.log(userInputs);

    return (
        <>
        <div className="HeaderFooterSpaceGraph"></div>
        <p>Add A New Task</p>

        <div>
        <form onSubmit={addNewTask} >

            <input placeholder='Task' type='text' value={newTask.task} onChange={handleTaskChange} />
            <input placeholder='Due Date' type='date' value={newTask.due_date.toString()} onChange={handleDueDateChange} />
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