import {
    FILTER_CHANGED
} from '../constants/actionTypes.js';

const initialState = {
    filter: [],
    loading: false,
    error: null
};

function removeItem(array, item){
    for(var i in array){
        if(array[i]==item){
            array.splice(i,1);
            break;
        }
    }
}

export default function annotation(state = initialState, action) {
    const filterKey = action.payload.filterKey;

    switch(action.type) {
        case FILTER_CHANGED:
            let newFilter = state.filter
            if(newFilter.includes(filterKey)) {
                removeItem(newFilter, filterKey);
            } else {
                newFilter.push(filterKey);
            }
            return {
                ...state,
                filter: newFilter
            };

        default:
            return state;
    }
}
