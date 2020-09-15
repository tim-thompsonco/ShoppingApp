import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import CartItem from '../../components/shop/CartItem';
import CartItemModel from '../../models/cart-item';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

interface CartState {
  cart: {
    items: { [index: string]: CartItemModel };
    totalAmount: number;
  };
}

const CartScreen = () => {
  const dispatch = useDispatch();

  const cartTotalAmount = useSelector(
    (state: CartState) => state.cart.totalAmount
  );
  const cartItems = useSelector((state: CartState) => {
    const transformedCartItems = [];

    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].productTitle,
        productPrice: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }

    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1
    );
  });

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.abs(cartTotalAmount).toFixed(2)}
          </Text>
        </Text>
        <Button
          color={Colors.accent}
          title='Checkout'
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
          }}
        />
      </View>
      <View>
        <FlatList
          keyExtractor={(item, index) => item.productId}
          data={cartItems}
          renderItem={(itemData) => (
            <CartItem
              key={itemData.item.productId}
              amount={itemData.item.sum}
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId));
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

CartScreen.navigationOptions = {
  headerTitle: 'Your Cart',
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
