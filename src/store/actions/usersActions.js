

import { getUserContent } from '../../servicesapi/userApi';
import { appExtraFunctions } from './appAction';
import { authContent } from "./authActions";
import { toast } from 'react-toastify';
import { persistor } from "../../store";


// token, id, options
export const getUserPageContent = (type, token,value,navigate,params) => (dispatch) => {

     let res = getUserContent(type, token, value, params)
     .then((res)=>{
      switch (type) {       
  
        case "getuserById":
             dispatch({
              type: "USR_DATA_BY_ID",
              payload: res.data.userData,
            });
            return dispatch(appExtraFunctions("showLandingLoader", false));

            case "getuserByIdadmin":
              dispatch({
               type: "USR_DATA_BY_ID_ADM",
               payload: res.data.userData,
             });
             return dispatch(appExtraFunctions("showLandingLoader", false));

             case "getuserListadmin":
              dispatch({
               type: "USR_LIST_ADM",
               payload: res.data.userData,
             });
             return dispatch(appExtraFunctions("showLandingLoader", false));

             case "getOrgListadmin":
              dispatch({
                type: "ORG_LIST_ADM",
                payload: res.data.userData,
              });
              return dispatch(appExtraFunctions("showLandingLoader", false));
      }
    }).catch((err)=>{
      console.error(err);
      if(err?.response?.status === 400|| err?.response?.status === 409){
        // alert(err.response.data.message)
          toast.error(err.response.data.message)
      }else if (err?.response?.status === 401 || err?.response?.status === 403){
        toast.error('unauthorized')
        // LogoutFunN()
        navigate('/')
        persistor.purge();
        dispatch(authContent("logoutAuths"))
        window.location.reload()
      }else{
        toast.error('errorr')
        dispatch(appExtraFunctions("showLandingLoader", false));
  
      }
      dispatch(appExtraFunctions("showLandingLoader", false));
      toast.error(err.response.data.message, { autoClose: 5000 })
    })
      };