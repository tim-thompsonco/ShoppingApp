import React, { ComponentType } from 'react';
import {
  Button,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  Platform,
} from 'react-native';
import Colors from '../../constants/Colors';

interface Props {
  imageUrl: string;
  title: string;
  price: number;
  onSelect(): any;
}

const ProductItem: React.FC<Props> = (props) => {
  let TouchableCmp: ComponentType<
    TouchableOpacityProps | TouchableNativeFeedbackProps
  > = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={props.onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: props.imageUrl }} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{props.title}</Text>
              <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>{props.children}</View>
          </View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
    overflow: 'hidden',
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 18,
    fontFamily: 'open-sans-bold',
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20,
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10,
  },
});

export default ProductItem;
