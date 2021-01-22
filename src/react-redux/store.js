import { createStore } from "redux";
import allreducers from './reducer';
export const store=createStore(allreducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
