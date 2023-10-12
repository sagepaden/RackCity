import { FETCH_POOL_TABLES } from "../Reducers/poolTableActions";

const initialState = {
    poolTables: [],
};

const poolTableReducer = (state = initialState, action) => {
    switch (action, type) {
        case FETCH_POOL_TABLES:
            return {
                ...state,
                poolTables: action.payload,
            };
        default:
            return state;
    }
};

export default poolTableReducer;