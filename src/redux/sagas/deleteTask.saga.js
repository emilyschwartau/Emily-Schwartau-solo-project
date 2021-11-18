import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* deleteTask (action) {
  
    try {
        yield axios.delete(`/api/listItems/${action.payload}`);
        yield put({type: 'FETCH_LIST_ITEMS'});
    } catch (err) {
       console.log(err);
       yield put({type: 'DELETE_ERROR'})
    }
}


function* deleteTaskSaga() {
  yield takeEvery('DELETE_LIST_ITEM', deleteTask );
}

export default deleteTaskSaga;