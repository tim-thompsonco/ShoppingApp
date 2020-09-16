import React from 'react';
import { useSelector } from 'react-redux';
import { FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/UI/CustomHeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Product from '../../models/product';

interface ProductsState {
  products: {
    userProducts: Product[];
  };
}

const UserProductsScreen = (props: any) => {
  const userProducts: Product[] = useSelector(
    (state: ProductsState) => state.products.userProducts
  );
  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => {
        return (
          <ProductItem
            imageUrl={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onViewDetail={() => {}}
            onAddToCart={() => {}}
          />
        );
      }}
    />
  );
};

UserProductsScreen.navigationOptions = (navData: any) => {
  return {
    headerTitle: 'Your Products',
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;
