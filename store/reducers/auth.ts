import { AUTHENTICATE, LOGOUT, SET_DID_TRY_AUTO_LOGIN } from '../actions/auth';

interface UserState {
  token: string;
  userId: string;
  didTryAutoLogin: boolean;
}

const initialState: UserState = {
  token: '',
  userId: '',
  didTryAutoLogin: false,
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };
    case SET_DID_TRY_AUTO_LOGIN:
      return {
        ...state,
        didTryAutoLogin: true,
      };
    case LOGOUT:
      return {
        ...initialState,
        didTryAutoLogin: true,
      };
    default:
      return state;
  }
};
