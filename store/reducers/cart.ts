import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart';
import CartItem from '../../models/cart-item';
import Product from '../../models/product';

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
      const addedProduct: Product = action.product;
      const productPrice: number = action.product.price;
      const productTitle: string = action.product.title;
      let cartItem: CartItem;

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
      const selectedCartItem: CartItem = state.items[action.pid];
      const currentQty: number = selectedCartItem.quantity;
      let updatedCartItems: { [index: string]: CartItem };

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
