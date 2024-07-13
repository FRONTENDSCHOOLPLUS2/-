// import { atom } from 'recoil';

// export const authState = atom({
//   key: 'authState',
//   default: {
//     isAuthenticated: false,
//     username: '게스트',
//   },
// });

import { atom } from "recoil";

export interface AuthState {
  isAuthenticated: boolean;
  username?: string;
}

export const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isAuthenticated: false,
    username: '',
  },
});