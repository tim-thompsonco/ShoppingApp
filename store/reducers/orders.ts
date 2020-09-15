import { ADD_ORDER } from '../actions/orders';
import Order from '../../models/order';

interface OrdersState {
  orders: Order[];
}

const initialState: OrdersState = {
  orders: [],
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );

      return {
        ...state,
        orders: state.orders.concat(newOrder),
      };
    default:
      return state;
  }
};
