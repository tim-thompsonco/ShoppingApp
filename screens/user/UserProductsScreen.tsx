import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, FlatList, Platform, Alert, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/CustomHeaderButton';
import Centered from '../../components/UI/Centered';
import ProductItem from '../../components/shop/ProductItem';
import Product from '../../models/product';
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products';

interface ProductsState {
  products: {
    userProducts: Product[];
  };
}

const UserProductsScreen = (props: any) => {
  const dispatch = useDispatch();

  const userProducts: Product[] = useSelector(
    (state: ProductsState) => state.products.userProducts
  );

  const deleteHandler = (id: string) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(productsActions.deleteProduct(id));
        },
      },
    ]);
  };

  const editProductHandler = (id: string) => {
    props.navigation.navigate('EditProduct', { productId: id });
  };

  if (userProducts.length === 0) {
    return (
      <Centered>
        <Text>No products found for this user!</Text>
      </Centered>
    );
  }

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => {
        return (
          <ProductItem
            imageUrl={itemData.item.imageUrl}
            title={itemData.item.title}
            price={itemData.item.price}
            onSelect={() => {
              editProductHandler(itemData.item.id);
            }}
          >
            <Button
              color={Colors.primary}
              title='Edit'
              onPress={() => {
                editProductHandler(itemData.item.id);
              }}
            />
            <Button
              color={Colors.primary}
              title='Delete'
              onPress={deleteHandler.bind(this, itemData.item.id)}
            />
          </ProductItem>
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
          title='Add'
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditProduct');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default UserProductsScreen;
