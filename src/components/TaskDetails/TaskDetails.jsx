import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function TaskDetails () {
    
    const selectedTask = useSelector((store) => store.selectedTaskReducer);

    const history = useHistory();

    function editTask () {
        history.push('/edit');  
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
                <button onClick={() => editTask(selectedTask.id)}>Edit Task</button>


            </>
            ) : (
              <p>No task selected.</p>
            )
        }
        </section>
    )

}

export default TaskDetails;