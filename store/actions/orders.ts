import CartItem from '../../models/cart-item';

export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (cartItems: CartItem[], totalAmount: number) => {
  return async (dispatch: any) => {
    const date = new Date();

    const response = await fetch(
      `https://shoppingapp-a4047.firebaseio.com/orders/u1.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          cartItems,
          totalAmount,
          date: date.toISOString(),
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Error during order add action!');
    }

    const resData = await response.json();

    dispatch({
      type: ADD_ORDER,
      orderData: {
        id: resData.name,
        items: cartItems,
        amount: totalAmount,
        date: date,
      },
    });
  };
};
