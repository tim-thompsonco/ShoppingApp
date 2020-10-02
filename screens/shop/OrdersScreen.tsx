import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FlatList, Platform, ActivityIndicator, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/CustomHeaderButton';
import Centered from '../../components/UI/Centered';
import Order from '../../models/order';
import OrderItem from '../../components/shop/OrderItem';
import * as ordersActions from '../../store/actions/orders';
import Colors from '../../constants/Colors';

interface OrdersState {
  orders: {
    orders: Order[];
  };
}

const OrdersScreen = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state: OrdersState) => state.orders.orders);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);
      await dispatch(ordersActions.fetchOrders());
      setIsLoading(false);
    };

    getOrders();
  }, [dispatch]);

  if (isLoading) {
    return (
      <Centered>
        <ActivityIndicator size='large' color={Colors.primary} />
      </Centered>
    );
  }

  if (orders.length === 0) {
    return (
      <Centered>
        <Text>No orders found for this user!</Text>
      </Centered>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => (
        <OrderItem
          items={itemData.item.items}
          amount={itemData.item.totalAmount}
          date={itemData.item.readableDate}
        />
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData: any) => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default OrdersScreen;
