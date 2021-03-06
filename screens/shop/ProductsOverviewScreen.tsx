import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  FlatList,
  Platform,
  ActivityIndicator,
  Text,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Product from '../../models/product';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import HeaderButton from '../../components/UI/CustomHeaderButton';
import Centered from '../../components/UI/Centered';
import Colors from '../../constants/Colors';

interface ProductsState {
  products: {
    availableProducts: Product[];
    userProducts: Product[];
  };
}

const ProductsOverviewScreen = (props: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState(undefined);

  const dispatch = useDispatch();

  const products = useSelector(
    (state: ProductsState) => state.products.availableProducts
  );

  const loadProducts = useCallback(async () => {
    setError(undefined);
    setIsRefreshing(true);

    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const getProducts = async () => {
      setIsLoading(true);
      await loadProducts();
      setIsLoading(false);
    };

    getProducts();
  }, [dispatch, loadProducts]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', loadProducts);

    return () => {
      unsubscribe();
    };
  }, [loadProducts]);

  const selectItemHandler = (id: string, title: string) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  if (error) {
    return (
      <Centered>
        <Text>An error occurred!</Text>
        <Button
          title='Try Again'
          onPress={loadProducts}
          color={Colors.primary}
        />
      </Centered>
    );
  }

  if (isLoading) {
    return (
      <Centered>
        <ActivityIndicator size='large' color={Colors.primary} />
      </Centered>
    );
  }

  if (!isLoading && products.length == 0) {
    return (
      <Centered>
        <Text>No products found. Maybe start adding some!</Text>
      </Centered>
    );
  }

  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          title={itemData.item.title}
          imageUrl={itemData.item.imageUrl}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title='View Details'
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title='To Cart'
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export const productsOverviewScreenOptions = (navData: any) => {
  return {
    headerTitle: 'All Products',
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

export default ProductsOverviewScreen;
