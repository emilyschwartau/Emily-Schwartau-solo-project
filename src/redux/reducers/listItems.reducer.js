//reducer
const listItemsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_LIST_ITEMS':
            return action.payload;
        default:
            return state;
    }
}
//export
export default listItemsReducer;