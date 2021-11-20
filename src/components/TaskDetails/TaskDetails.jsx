import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

function TaskDetails () {
    
    const selectedTask = useSelector((store) => store.selectedTaskReducer);

    const history = useHistory();

    return (
        <section>
        <h1>Task Details</h1>

        {
            selectedTask.task ? (
            <>
              
                <h2>Task:{selectedTask.task}</h2>
                <h2>Due date:{selectedTask.due_date}</h2>
                
            </>
            ) : (
              <p>No task selected.</p>
            )
        }
        </section>
    )

}

export default TaskDetails;