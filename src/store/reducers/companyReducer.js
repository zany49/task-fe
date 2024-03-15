const initialState = {
  userCreated: false,
};
  
  export function CompanyReducer(state = initialState, action) {
    switch (action.type) {
      // case "PO_DASHBOARD_CONTENT":
      //   return {
      //     ...state,
      //     dashboardTableHeader: [...action.payload],
      //   };
        case "COMP_LIST":
          return {
            ...state,
            companyDetails: {...action.payload}
          };

          case "ORG_DATA_BY_ID":
            console.log(action.payload)
            return {
              ...state,
              orgData: {...action.payload}
            };

            case "ORG_USER_LIST_BY_ID":
            
            return {
              ...state,
              userList: [...action.payload]
            };

            case "USER_CREATED_SUCESSIVE":
               return{
                ...state,
                userCreated: action.payload
               }
            
          // case 'LOGOUT_AUTH':
          //   return null;

        default:
          return state;
      }
  }