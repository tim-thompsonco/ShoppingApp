import { createDispatchHook } from 'react-redux';

export const SIGNUP = 'SIGNUP';

export const signup = (email: string, password: string) => {
  return async (dispatch: any) => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCnP04Cy84A13I1AN9pibzA1WoVHPCtmzU',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const resData = await response.json();

    console.log(resData);

    dispatch({ type: SIGNUP });
  };
};
