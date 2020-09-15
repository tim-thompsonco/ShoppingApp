import PRODUCTS from '../../data/dummy-data';
import Product from '../../models/product';

interface ProductsState {
  availableProducts: Array<Product>;
  userProducts: Array<Product>;
}

const initialState: ProductsState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

export default (state = initialState, action: any) => {
  return state;
};
