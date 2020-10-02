import React from 'react';
import { Button, View, SafeAreaView, StyleSheet } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';

const Logout = (props) => {
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(authActions.logout());
    props.navigation.navigate('Auth');
  };

  return (
    <View style={styles.screen}>
      <SafeAreaView>
        <DrawerItems {...props} />
        <Button title='Logout' color={Colors.primary} onPress={logoutUser} />
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingTop: 20,
  },
});

export default Logout;
