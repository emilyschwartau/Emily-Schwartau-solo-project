import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* editTask(action) {
    //const id = action.payload;

    try {
        console.log('edit item action.payload', action.payload);
        //point to the update router - send over edited ingredient
        yield axios.put(`/api/listItem/edit/${action.payload.id}`, action.payload);
        //rerender table with updated information 
        yield put ({type: 'FETCH_LIST_ITEMS'});
        yield put ({type:  'CLEAR_EDIT', payload: '' })

    } catch (error) {
        console.log('Error in PUT', error);
    }
}

function* clearEdit(action){
    try{
        console.log('clear edit', action.payload);
    }
    catch(error) {
        console.log('error in clear', error);
        
    }
}



//listen for UPDATE_ITEM dispatch 
function* editTaskSaga() {
    yield takeLatest('SET_EDIT_ITEM', editTask);
    yield takeLatest('CLEAR_EDIT', clearEdit);
    yield takeLatest('SET_EDIT_SUBMIT', editTask);
}

export default editTaskSaga;