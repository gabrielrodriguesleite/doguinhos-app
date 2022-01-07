import React from "react";
import { render } from "@testing-library/react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from '../Redux/Reducers'
import { Provider } from "react-redux";

const createMockStore = (initialState) => (
  createStore(combineReducers({ reducer }), initialState, applyMiddleware(thunk))
);

const renderWithRedux = ( component,
  { initialState, store = createMockStore(initialState) } = {}
) => ({ ...render(
  <Provider store={ store }>
    {component}
  </Provider>),
  store });

export default renderWithRedux;

// uso no teste:
// const { queryByText } = renderWithRedux(<App />);
// const buttonDoguinho = queryByText('Novo Doguinho');
// expect(buttonDoguinho).toBeInTheDocument();
