import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


// ===== actions =====
const GET_IMAGE = 'GET_IMAGE', REQUEST_IMAGE = 'REQUEST_IMAGE', FAILED_REQUEST = 'FAILED_REQUEST';

function getImage(json) { return { type: GET_IMAGE, payload: json.message };}

function requestDog() { return { type: REQUEST_IMAGE }; }

function failedRequest(error) { return { type: FAILED_REQUEST, payload: error };}

export function fetchDog() {
  return (dispatch) => { 
    dispatch(requestDog());
    return fetch('https://dog.ceo/api/breeds/image/random')
      .then((r) => r.json()
        .then(
          (json) => dispatch(getImage(json)),
          (error) => dispatch(failedRequest(error)),
        )
      );
  };
}

// ===== reducer =====
const INITIAL_STATE = { isFetching: false, imagePath: '', error: '', };

function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUEST_IMAGE: return { ...state, isFetching: true };
    case GET_IMAGE: return { ...state, imagePath: action.payload, isFetching: false };
    case FAILED_REQUEST: return { ...state, error: action.payload, isFetching: false };
    default: return state;
  }
}

// ===== store =====
// const store = createStore(reducer);

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
