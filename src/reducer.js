const reducer = (state, action) => {
  if (action.type === 'REMOVE_ALL') {
    return { ...state, cart: [] };
  }

  if (action.type === 'REMOVE_SINGLE') {
    const cart = state.cart.filter((item) => item.id !== action.payload);

    return { ...state, cart };
  }

  if (action.type === 'INCREASE') {
    const cart = state.cart.map((item) => {
      if (item.id === action.payload) {
        return { ...item, amount: item.amount + 1 };
      }

      return item;
    });

    return { ...state, cart };
  }

  if (action.type === 'DECREASE') {
    const cart = state.cart
      .map((item) => {
        if (item.id === action.payload) {
          return { ...item, amount: item.amount - 1 };
        }

        return item;
      })
      .filter((cart) => cart.amount !== 0);

    return { ...state, cart };
  }

  if (action.type === 'DISPLAY') {
    return {
      ...state,
      cart: action.payload,
      cartAmount: action.payload.length,
      loading: false,
    };
  }

  if (action.type === 'GET_TOTAL') {
    const newCart = state.cart.reduce(
      (curr, total) => {
        return {
          totalAmount: curr.totalAmount + total.amount,
          totalPrice: curr.totalPrice + Number(total.price) * total.amount,
        };
      },
      {
        totalAmount: 0,
        totalPrice: 0,
      }
    );

    return {
      ...state,
      totalAmount: newCart.totalAmount,
      totalPrice: newCart.totalPrice.toFixed(2),
    };
  }

  return state;
};

export default reducer;
