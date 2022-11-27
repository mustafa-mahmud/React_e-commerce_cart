import React, { useState, useContext, useReducer, useEffect } from 'react';
import cartItems from './data';
import reducer from './reducer';

const url = 'https://course-api.com/react-useReducer-cart-project';

const AppContext = React.createContext();
const initState = {
  cart: [],
  loading: false,
  totalAmount: 0,
  totalPrice: 0,
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initState);

  const removeAll = () => {
    dispatch({ type: 'REMOVE_ALL' });
  };

  const removeSingle = (id) => {
    dispatch({ type: 'REMOVE_SINGLE', payload: id });
  };

  const increase = (id) => {
    dispatch({ type: 'INCREASE', payload: id });
  };

  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id });
  };

  const fetchData = async () => {
    state.loading = true;

    try {
      const res = await fetch(url);
      const cart = await res.json();

      dispatch({ type: 'DISPLAY', payload: cart });
    } catch (err) {
      state.loading = false;
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    dispatch({ type: 'GET_TOTAL' });
  }, [state.cart]);

  return (
    <AppContext.Provider
      value={{
        ...state,
        removeAll,
        removeSingle,
        increase,
        decrease,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export default AppProvider;
