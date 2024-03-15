const initialState = {
   authdata: null,
    isAuthenticated: false,
    regSucessCode:false,
    // companyList:[],
  };
  
  export function authReducer  (state = initialState, action){
    switch (action.type) {
      case 'Login_Auth':
        return {
          ...state,
          // user: action.payload,
          isAuthenticated: false,
          authdata:action.payload.userdetails, 
          token: action.payload.accessToken
        };
      case 'LOGOUT_AUTH':
        return {
          ...state,
          user: null,
          token:null,
          isAuthenticated: false,
        };
        case 'Register_Auth':
          return {
            ...state,
            token: action.payload.accessToken,
            authdata:action.payload.userdetails, 
            regSucessCode: true,
          };
          case "Is_Authenticated":
            return {
              ...state,
              isAuthenticated: true,
            }

      default:
        return state;
    }
  };
  
//   export default authReducer;