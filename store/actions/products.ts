import Product from '../../models/product';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;

    try {
      const response = await fetch(
        'https://shoppingapp-a4047.firebaseio.com/products.json'
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProducts: Product[] = [];

      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
            resData[key].ownerPushToken,
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }

      dispatch({
        type: SET_PRODUCTS,
        products: loadedProducts,
        userProducts: loadedProducts.filter((prod) => prod.ownerId === userId),
      });
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = (productId: string) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://shoppingapp-a4047.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE',
      }
    );

    if (!response.ok) {
      throw new Error('Error during product delete action!');
    }

    dispatch({ type: DELETE_PRODUCT, pid: productId });
  };
};

export const createProduct = (
  title: string,
  description: string,
  imageUrl: string,
  price: number
) => {
  return async (dispatch: any, getState: any) => {
    let pushToken: string | null;
    let permissionStatus: string = (
      await Permissions.getAsync(Permissions.NOTIFICATIONS)
    ).status;

    if (permissionStatus !== 'granted') {
      permissionStatus = (await Permissions.askAsync(Permissions.NOTIFICATIONS))
        .status;
    }
    if (permissionStatus !== 'granted') {
      pushToken = null;
    } else {
      pushToken = (await Notifications.getExpoPushTokenAsync()).data;
    }

    const token: string = getState().auth.token;
    const userId: string = getState().auth.userId;

    const response = await fetch(
      `https://shoppingapp-a4047.firebaseio.com/products.json?auth=${token}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
          price,
          ownerId: userId,
          ownerPushToken: pushToken,
        }),
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        description,
        imageUrl,
        price,
        ownerId: userId,
        pushToken: pushToken,
      },
    });
  };
};

export const updateProduct = (
  id: string,
  title: string,
  description: string,
  imageUrl: string
) => {
  return async (dispatch: any, getState: any) => {
    const token = getState().auth.token;

    const response = await fetch(
      `https://shoppingapp-a4047.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Error during product update action!');
    }

    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
