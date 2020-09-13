import React from 'react';
import {
  Button,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';

const ProductsDetailScreen = (props) => {
  const productId = props.navigation.getParam('productId');

  const selectedProduct = useSelector((state) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  return (
    <View>
      <Text>{selectedProduct.title}</Text>
    </View>
  );
};

ProductsDetailScreen.navigationOptions = (navData) => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({});

export default ProductsDetailScreen;
