// PATH REDUCER - keep track of the current pathname
const pathReducer = (state = "/", action) => {
    if (action.type === "CHANGE_PAGE") {
        return action.payload;
    }
    return state;
};

export default pathReducer;