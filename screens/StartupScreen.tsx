import React, { useEffect } from 'react';
import { ActivityIndicator, AsyncStorage } from 'react-native';
import { useDispatch } from 'react-redux';

import Centered from '../components/UI/Centered';
import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

interface parsedUserData {
  token: string;
  userId: string;
  expireDate: string;
}

const StartupScreen = (props: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');

      if (!userData) {
        props.navigation.navigate('Auth');
        return;
      }

      const transformedData: parsedUserData = JSON.parse(userData);
      const { token, userId, expireDate } = transformedData;
      const expirationDate: Date = new Date(expireDate);

      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate('Auth');
        return;
      }

      const expirationTime: number =
        expirationDate.getTime() - new Date().getTime();

      props.navigation.navigate('Shop');
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <Centered>
      <ActivityIndicator size='large' color={Colors.primary} />
    </Centered>
  );
};

export default StartupScreen;
