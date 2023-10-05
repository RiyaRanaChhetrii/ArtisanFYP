import { CART_ADD_ITEM } from "../constants/cartConstants";

const initialState = {
  cartItems: [],
};

export const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      // Ensure that state.cartItems is always an array
      const cartItems = Array.isArray(state.cartItems) ? state.cartItems : [];

      const existItem = cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...cartItems, item],
        };
      }
    
    // case CART_REMOVE_ITEM:
    //   return {
    //     ...state,
    //     cartItems: state.cartItems.filter((x) => x.product !== action.payload)
    //   }

    default:
      return state;
  }
};
