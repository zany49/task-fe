const initialState = {

};

export function UsersReducer(state = initialState, action) {
  switch (action.type) {

      case "USR_DATA_BY_ID":
        return {
          ...state,
          userDataById: {...action.payload}
        };

        case "USR_DATA_BY_ID_ADM":
        return {
          ...state,
          userDataByIdAdmin: {...action.payload}
        };

        case "USR_LIST_ADM":
        return {
          ...state,
          userListAdmin: [...action.payload]
        };

        case "ORG_LIST_ADM":
        return {
          ...state,
          orgListAdmin: [...action.payload]
        };
  
      default:
        return state;
    }
}