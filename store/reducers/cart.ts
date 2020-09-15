import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';

interface CartState {
  items: { [index: string]: CartItem };
  totalAmount: number;
}

const initialState: CartState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = action.product.price;
      const productTitle = action.product.title;
      let cartItem;

      if (state.items[addedProduct.id]) {
        cartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        cartItem = new CartItem(1, productPrice, productTitle, productPrice);
      }

      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: cartItem },
        totalAmount: state.totalAmount + productPrice,
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;

      if (currentQty > 1) {
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );

        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }

      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    default:
      return state;
  }
};
