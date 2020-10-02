import { AUTHENTICATE } from '../actions/auth';

interface UserState {
  token: string;
  userId: string;
}

const initialState: UserState = {
  token: '',
  userId: '',
};

export default (state = initialState, action: any) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      };
    default:
      return state;
  }
};