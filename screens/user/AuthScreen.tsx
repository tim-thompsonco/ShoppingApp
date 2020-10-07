import React, { useCallback, useEffect, useReducer, useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state: any, action: any) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputId]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.inputId]: action.isValid,
    };

    let updatedFormIsValid = true;

    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }

    return {
      formIsValid: updatedFormIsValid,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
    };
  }

  return state;
};

const AuthScreen = (props: any) => {
  const dispatch = useDispatch();

  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;

    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }

    setError(undefined);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputId: string, inputValue: string, inputValidity: boolean) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        inputId: inputId,
      });
    },
    [dispatchFormState]
  );

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
            errorText='Please enter a valid email address'
            onInputChange={inputChangeHandler}
            initialValue=''
          />
          <Input
            id='password'
            label='Password'
            keyboardType='default'
            secureTextEntry
            required
            minLength={5}
            errorText='Please enter a valid password'
            onInputChange={inputChangeHandler}
            initialValue=''
          />
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size='small' color={Colors.primary} />
            ) : (
              <Button
                title={isSignup ? 'Sign Up' : 'Login'}
                color={Colors.primary}
                onPress={authHandler}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={`Switch to ${isSignup ? 'Login' : 'Sign Up'}`}
              color={Colors.accent}
              onPress={() => {
                setIsSignup((prevState) => !prevState);
              }}
            />
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

export const AuthScreenOptions = {
  headerTitle: 'Authenticate',
};

const styles = StyleSheet.create({
  authContainer: {
    height: '80%',
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
