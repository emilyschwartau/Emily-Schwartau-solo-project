import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';


function* postTask (action) {
  
    try {
        yield axios.post('/api/listItems', action.payload);
        yield put({type: 'FETCH_LIST_ITEMS'});
    } catch (err) {
       console.log(err);
       yield put({type: 'POST_ERROR'})
    }
}


function* addTaskSaga() {
  yield takeEvery('ADD_TASK', postTask );
}

export default addTaskSaga;