import { logOutGFunction } from "../../servicesapi/appService";
import { getContent } from "../../servicesapi/authapi";
import { toast } from 'react-toastify';
import { appExtraFunctions } from "./appAction";






export const LOGOUT_ACTION = "[Logout action] logout action";
// token, id, options
export const authContent = (type,token, value,navigate,params) => (dispatch) => {
  let res = getContent(type,token, value,params)
  .then((res)=>{
    switch (type) {
      case "loginAuths":
        toast.success(res.data.message )
        navigate(params)
        return dispatch({
          type: "Login_Auth",
          payload: res.data,
        });
      case "logoutAuths":
        // alert("in")
        return dispatch({
          type: "LOGOUT_AUTH",
          payload: null,
        });
        case "registerForm":
        // alert("in")
        navigate(params)
        return dispatch({
          type: "Register_Auth",
          payload: res.data,
        });
         
    }
  }).catch((err)=>{
    console.error(err);
    dispatch(appExtraFunctions("showLandingLoader", false));
    if(err?.response?.status === 400|| err?.response?.status === 409){
        toast.error(err.response.data.message)

    }else if (err.response.status === 401 || err.response.status === 403){
      toast.error('unauthorized')
      navigate('/')
      dispatch(appExtraFunctions("showLandingLoader", false));
      dispatch(authContent("logoutAuths"))
    }else{
      toast.error("error")
    }

    // toast.error(err.response.data.message, { autoClose: 5000 })
  })
   
  }

