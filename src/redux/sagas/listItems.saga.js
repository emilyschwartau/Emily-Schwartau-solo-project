import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* fetchListItems(action) {
  
    try {
        const listItems = yield axios.get('/api/listItems');
        console.log('get all:', listItems.data);
        yield put({ type: 'SET_LIST_ITEMS', payload: listItems.data });

    } catch {
        console.log('get listItems error');
    }

};


function* listItemsSaga() {
  yield takeEvery('FETCH_LIST_ITEMS', fetchListItems );
}

export default listItemsSaga;