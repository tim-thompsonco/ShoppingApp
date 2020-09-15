import Product from '../../models/product';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (product: Product) => {
  return { type: ADD_TO_CART, product: product };
};

export const removeFromCart = (productId: string) => {
  return { type: REMOVE_FROM_CART, pid: productId };
};
