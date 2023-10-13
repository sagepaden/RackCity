import { FETCH_POOL_TABLES } from "../Actions/poolTableActions";

const initialState = {
    poolTables: [],
    loading: false,
};

const poolTableReducer = (state = initialState, action) => {
    switch (action.type) {
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