import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../src/loginSLice'


const store = configureStore({
  reducer: {
    login: loginReducer, // Assigning the imported reducer to the login slice of state
  },
});

export default store;
