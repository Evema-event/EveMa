export default (state, action) => {
    switch (action.type) {
        case 'CHANGE_USERNAME':
            return {
                ...state,
                username: action.value,
            };
        case 'changeRollNo':
            return {
                ...state,
                rollNo: action.value,
            };
        default: return state
    }
}
