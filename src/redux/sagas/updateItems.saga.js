import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* updateTask (action) {
  
    try {
        yield axios.put(`/api/listItems/${action.payload}`);
        yield put({type: 'FETCH_LIST_ITEMS'});
    } catch (err) {
       console.log(err);
       yield put({type: 'UPDATE_ERROR'});
    }
}

function* updateTaskSaga() {
    yield takeEvery('UPDATE_LIST_ITEM', updateTask );
  }
  
  export default updateTaskSaga;