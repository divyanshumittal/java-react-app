const API = "/vets/all";

export function loadVetsSuccess(vets) {
  return { type: 'LOAD_VETS_SUCCESS', vets };
}

export function getVets() {
    return (dispatch) => {
        fetch(API)
            .then((response) => response.json())
            .then((items) => dispatch(loadVetsSuccess(items)))
    };
}
