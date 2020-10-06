import React from 'react';
import {
  Button,
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Product from '../../models/product';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';

interface ProductsState {
  products: {
    availableProducts: Product[];
    userProducts: Product[];
  };
}

const ProductsDetailScreen = (props: any) => {
  const dispatch = useDispatch();

  const productId: string = props.navigation.getParam('productId');

  const selectedProduct:
    | Product
    | undefined = useSelector((state: ProductsState) =>
    state.products.availableProducts.find((prod) => prod.id === productId)
  );

  if (selectedProduct === undefined) {
    return null;
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title='Add to Cart'
          onPress={() => {
            dispatch(cartActions.addToCart(selectedProduct));
          }}
        />
      </View>

      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

export const productDetailScreenOptions = (navData: any) => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontSize: 20,
    fontFamily: 'open-sans-bold',
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    fontFamily: 'open-sans',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default ProductsDetailScreen;
