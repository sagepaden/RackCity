import { createStore, combineReducers } from 'redux';
import poolTableReducer from '../reducers/poolTableReducer';

const rootReducer = combineReducers({
  poolTables: poolTableReducer,
});

const store = createStore(rootReducer);

export default store;
