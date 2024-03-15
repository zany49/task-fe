import { combineReducers } from 'redux';
import { UsersReducer } from './usersReducer';
import { authReducer} from './authReducer';
import { CompanyReducer } from './companyReducer';
import { LOGOUT_ACTION } from '../actions/authActions';
import storage from "redux-persist/lib/storage";
import { persistor} from '../index'
import { appReducerdata } from './appReducers';
const appReducer = combineReducers({
  // Your reducers go here
  user:UsersReducer,
  auth:authReducer,
  company:CompanyReducer,
  app:appReducerdata
});

const rootReducer = (state, action) => {
  // alert(action.type)
  if (action.type === LOGOUT_ACTION) {
    storage.removeItem("persist:root");
    storage.removeItem("persist:company");
    storage.removeItem("persist:user");
    storage.removeItem("persist:auth");
    storage.removeItem("persist:app");
    // storage.removeItem("persist:projectowner");
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export default rootReducer;