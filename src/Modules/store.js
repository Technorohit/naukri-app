import createRootReducer from './RootReducer/Rootreducer';
import { createStore } from 'redux';

export default (initialstate={})=>createStore(createRootReducer,initialstate);