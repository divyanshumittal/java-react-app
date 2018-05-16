import { combineReducers } from 'redux';

const API = "/petOwners/all";

function ownersReducer(state= {}, action) {
    switch(action.type) {
        case 'LOAD_OWNERS_SUCCESS':
          return action.owners
        default:
          return state;
      }

    return state;
}

function testReducer(state= {}, action) {
    switch(action.type) {
        case 'LOAD_OWNERS':
          return Object.assign(state, {
            ownersList: action.owners
          })
        default:
          return state;
      }

    return state;
}

const rootReducer = combineReducers({
  testReducer,
  ownersReducer,
})

export default rootReducer;
