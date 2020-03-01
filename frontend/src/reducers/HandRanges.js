const handRangesAvailable = (state = [], action) => {
    switch (action.type) {
        case 'GET_HAND_RANGES':
            return state;
        case 'SET_HAND_RANGE':
            console.log(action);
            return {...state, "ranges": action.payload};
        case 'SET_HAND_RANGE_FOLDER':
            console.log(action);
            if (action.payload) {
                return {...state, "folderNames": action.payload};
            } else {
                return state;
            }
        case 'SET_HAND_RANGE_GROUP':
            console.log(action);
            if (action.payload) {
                return {...state, "folderGroups": action.payload};
            } else {
                return state;
            }
        case 'GET_HAND_RANGE_FOLDER':
            return state;
        default:
            return state;
    }
};

export default handRangesAvailable;