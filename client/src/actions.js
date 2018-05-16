const API = "/petOwners/all";

 function getAllOwners() {
    return fetch(API).then(response => {
      return response.json();
    }).catch(error => {
      return error;
    });
 }


export function loadOwnersSuccess(owners) {
  return { type: 'LOAD_OWNERS_SUCCESS', owners };
}

export function getOwners() {
    return (dispatch) => {
        fetch(API)
            .then((response) => response.json())
            .then((items) => dispatch(loadOwnersSuccess(items)))
    };
}
