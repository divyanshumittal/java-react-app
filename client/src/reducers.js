import { combineReducers } from 'redux';

const API = "/petOwners/all";

function ownersReducer(state= [], action) {
    switch(action.type) {
      case 'LOAD_OWNERS_SUCCESS':
        return action.owners
      default:
        return state;
    }

    return state;
}

function vetsReducer(state= [], action) {
    switch(action.type) {
      case 'LOAD_VETS_SUCCESS':
        return action.vets
      default:
        return state;
    }

    return state;
}

const rootReducer = combineReducers({
  vets: vetsReducer,
  owners: ownersReducer,
})

export default rootReducer;
