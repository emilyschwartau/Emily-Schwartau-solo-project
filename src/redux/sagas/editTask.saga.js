import axios from 'axios';
import { put, takeLatest, takeEvery } from 'redux-saga/effects';

function* editTask(action) {
    //const id = action.payload;

    try {
        //console.log('edit item action.payload', action.payload);
        //point to the update router - send over edited ingredient
        yield axios.put(`/api/listItems/edit/${action.payload.id}`, action.payload);
        //rerender table with updated information 
        //yield put ({type: 'SET_EDIT_ITEM'});
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

function* fetchEditItem (action) {
    const editTaskId = action.payload;
    console.log('editTask id', editTaskId );
    
    try {
        const editItem = yield axios.get(`/api/listItems/${editTaskId}`);
        console.log("editItem:", editItem.data);
        yield put ({ type: "SET_EDIT_ITEM", payload: editItem.data[0] });
        
    } catch (error) {
        console.log ("get edit item saga error", error);
    }  
}



//listen for UPDATE_ITEM dispatch 
function* editTaskSaga() {
    yield takeEvery('FETCH_EDIT_ITEM', fetchEditItem);
   //yield takeLatest('SET_EDIT_ITEM', editTask);
    yield takeLatest('CLEAR_EDIT', clearEdit);
    yield takeLatest('SET_EDIT_SUBMIT', editTask);
}

export default editTaskSaga;