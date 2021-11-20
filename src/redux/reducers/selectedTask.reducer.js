// holds our selected task for the details view
const selectedTaskReducer = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SELECTED_TASK':
        return action.payload;
      default:
        return state;
    }
}

export default selectedTaskReducer;