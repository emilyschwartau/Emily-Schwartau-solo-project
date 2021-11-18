//reducer that stores inputs for manipulation 

const userInputsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SUBMIT_TASK_DETAILS':
            return action.payload;
        default:
            return state;
    }
}
//export
export default userInputsReducer;