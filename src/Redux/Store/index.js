import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "../Reducers";

// ===== store =====
// const store = createStore(reducer);

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
