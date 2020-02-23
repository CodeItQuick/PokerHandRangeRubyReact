const handRangesAvailable = (state = [], action) => {
    switch (action.type) {
        case 'GET_HAND_RANGES':
            return state;
        case 'SET_HAND_RANGE':
            console.log(action);
            let handRangesPayload = [];
            action.payload.forEach((handRange) => {
                console.log('handRanges', handRange);
                handRangesPayload = [...handRangesPayload, 
                    {'Range': handRange.RangeName, 
                     'RangeScopes': [
                     handRange.RangeScope0, 
                     handRange.RangeScope1, 
                     handRange.RangeScope2, 
                     handRange.RangeScope3]}];
            })
            return handRangesPayload;
        default:
            return state;
    }
};

export default handRangesAvailable;