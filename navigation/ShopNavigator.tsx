import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CartScreen, { cartScreenOptions } from '../screens/shop/CartScreen';
import OrdersScreen, {
  ordersScreenOptions,
} from '../screens/shop/OrdersScreen';
import ProductsOverviewScreen, {
  productsOverviewScreenOptions,
} from '../screens/shop/ProductsOverviewScreen';
import ProductDetailsScreen, {
  productDetailScreenOptions,
} from '../screens/shop/ProductsDetailScreen';
import UserProductsScreen, {
  userProductsScreenOptions,
} from '../screens/user/UserProductsScreen';
import EditProductsScreen, {
  editProductsScreenOptions,
} from '../screens/user/EditProductsScreen';
import StartupScreen from '../screens/StartupScreen';
import AuthScreen, { AuthScreenOptions } from '../screens/user/AuthScreen';
import Colors from '../constants/Colors';
import Logout from '../components/Logout';
import ProductItem from '../components/shop/ProductItem';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTitleStyle: { fontFamily: 'open-sans-bold' },
  headerBackTitleStyle: { fontFamily: 'open-sans' },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
};

const ProductsStackNavigator = createStackNavigator();

const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name='ProductsOverview'
        component={ProductsOverviewScreen}
        options={productsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name='ProductDetail'
        component={ProductDetailsScreen}
        options={productDetailScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name='Cart'
        component={CartScreen}
        options={cartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name='Orders'
        component={OrdersScreen}
        options={ordersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name='UserProducts'
        component={UserProductsScreen}
        options={userProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name='EditProduct'
        component={EditProductsScreen}
        options={editProductsScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  return (
    <ShopDrawerNavigator.Navigator
      drawerContent={(props: any) => {
        return <Logout {...props} />;
      }}
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
    >
      <ShopDrawerNavigator.Screen
        name='Products'
        component={ProductsNavigator}
        options={{
          drawerIcon: (props: any) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Orders'
        component={OrdersNavigator}
        options={{
          drawerIcon: (props: any) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name='Admin'
        component={AdminNavigator}
        options={{
          drawerIcon: (props: any) => (
            <Ionicons
              name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AuthStackNavigator.Screen
        name='Auth'
        component={AuthScreen}
        options={AuthScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
