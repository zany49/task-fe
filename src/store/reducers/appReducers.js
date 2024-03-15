
    const initialState = {

      };
      
      export function appReducerdata  (state = initialState, action){
        switch (action.type) {
            case "SHOW_LADING_LOADER":
                return {
                  ...state,
                  landingLoader: action.payload,
                };
            
          default:
            return state;
        }
      };
      
    //   export default authReducer;