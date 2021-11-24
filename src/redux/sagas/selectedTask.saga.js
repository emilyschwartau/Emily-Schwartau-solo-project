import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* selectedTask (action) {
    const id = action.payload;
    console.log('selectedTask id', id );
    
    try {
        const selectedTaskDetails = yield axios.get(`/api/listItems/${id}`);
        console.log("selectedTask:", selectedTaskDetails.data);
        yield put ({ type: "SET_SELECTED_TASK", payload: selectedTaskDetails.data[0] });
        
    } catch (error) {
        console.log ("get selected task saga error", error);
    }
  
   
}


function* selectedTaskSaga() {
    yield takeEvery('FETCH_SELECTED_TASK', selectedTask );
}

export default selectedTaskSaga;


// fetch the details of a specific movie from the database (joins tables)
// function* fetchDetails(action) {
//     const id = action.payload;
//     try {
//         const details = yield axios.get(`/api/movie/${id}`);
//         console.log("movie details:", details.data);
//         // save the details in the redux store
//         yield put({ type: "SET_DETAILS", payload: details.data[0] });
//     } catch (error) {
//         console.log("get movie's genres error:", error);
//     }
// }