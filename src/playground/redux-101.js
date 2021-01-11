import { createStore } from 'redux';

// Action generators - functions that return action object.

const incrementCount = ( { incrementBy = 1 } = {} ) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ( { decrementBy = 1 } = {}) => ({ 
    type: 'DECREMENT',
    decrementBy
});

const setCount = ( { count = 1 } = {} ) => ({
    type: 'SET',
    count
});

const resetCount = () => ({
    type: 'RESET'
});

// Reducers:
// 1. Reducers are pure functions
// 2. Never change state or action

const countReducer = ( state = { count: 0 }, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return { count: state.count + action.incrementBy }
        case 'DECREMENT':
            return { count: state.count - action.decrementBy }
        case 'SET':
            return { count: action.count }
        case 'RESET':
            return { count: 0 }
        default:
            return state;
    }
}

// createStore() will create a store for us and it calls the function passed in its parameter without state.
// So we initialized the state for it.
// Now the store will always monitor the state for changes.
const store = createStore(countReducer);

// Just call unsubscribe() to stop receiving updates about data change.
const unsubscribe = store.subscribe( () => {
    console.log(store.getState())
});


store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());
store.dispatch(resetCount()); 
store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(decrementCount());
store.dispatch(setCount({ count: 100 }));
store.dispatch(setCount());