import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
} from 'react-native';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';

const AuthScreen = (props: any) => {
  return (
    <KeyboardAvoidingView
      behavior='padding'
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <Card style={styles.authContainer}>
        <ScrollView>
          <Input
            id='email'
            label='E-Mail'
            keyboardType='email-address'
            required
            email
            autoCapitalize='none'
            errorMessage='Please enter a valid email address'
            onInputChange={() => {}}
            initialValue=''
          />
          <Input
            id='password'
            label='Password'
            keyboardType='default'
            secureTextEntry
            required
            minLength={5}
            errorMessage='Please enter a valid password'
            onInputChange={() => {}}
            initialValue=''
          />
          <View style={styles.buttonContainer}>
            <Button title='Login' color={Colors.primary} onPress={() => {}} />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title='Switch to Sign Up'
              color={Colors.accent}
              onPress={() => {}}
            />
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate',
};

const styles = StyleSheet.create({
  authContainer: {
    height: '50%',
    maxHeight: 400,
    width: '80%',
    maxWidth: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthScreen;
