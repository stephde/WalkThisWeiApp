import {
    FILTER_CHANGED
} from '../constants/actionTypes.js';

const initialState = {
    categories: []
};

function removeItem(array, item){
    for(var i in array){
        if(array[i]==item){
            array.splice(i,1);
            break;
        }
    }
}

export default function filter(state = initialState, action) {

    switch(action.type) {
        case FILTER_CHANGED:
            const filterKey = action.payload.filterKey;
            let newFilter = state.categories
            if(newFilter.includes(filterKey)) {
                removeItem(newFilter, filterKey);
            } else {
                newFilter.push(filterKey);
            }
            return {
                ...state,
                categories: newFilter
            };

        default:
            return state;
    }
}
