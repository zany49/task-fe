import { LogoutFunN } from "../../components/sidenavbar/sidenavbar";
import {  getcompanyContentapi, handleSubmitdataform } from "../../servicesapi/companyapi";
import { authContent } from "./authActions";
import { toast } from 'react-toastify';
import { persistor } from "../../store";
import { appExtraFunctions } from "./appAction";



export const handleSubmitForm = (type,token, value,navigate,params) => (dispatch) => {
  // alert("Submit")
  let res = handleSubmitdataform(type,token,value,navigate,params)
  .then((res)=>{
    switch (type) {
  
          case "enroll_user":

            toast.success("User Enrolled Successfully")
              dispatch({
                type: "USER_CREATED_SUCESSIVE",
                payload:true
              });
            return
            case "edit_user":

            toast.success("User Updated Successfully")
              dispatch({
                type: "USER_CREATED_SUCESSIVE",
                payload:true
              });
            return
            case "edit_org":

            toast.success("User Updated Successfully")

              dispatch({
                type: "ORG_DATA_BY_ID",
                payload: res.data.orgData,
              });
            return     dispatch(appExtraFunctions("showLandingLoader", false));
            case "delete_user":

            toast.success("User deleted Successfully")
              dispatch({
                type: "USER_CREATED_SUCESSIVE",
                payload:true
              });
            return
    }
  }).catch((err)=>{
    if(err?.response?.status === 400|| err?.response?.status === 409){
      // alert(err.response.data.message)
      toast.error(err.response.data.message)
    }else if (err?.response?.status === 401 || err?.response?.status === 403){
      toast.error(err.response.data.message)
      navigate('/')
      dispatch(authContent("logoutAuths"))
    }else{
      toast.error('errorr')


    }
    // toast.error(err.response.data.message, { autoClose: 5000 })
  })
   
  }






export const getCompanyContent = (type, token,value,navigate,params) => (dispatch) => {
  // alert("in")
  let res = getcompanyContentapi(type,token, value,params)
  .then((res)=>{
    switch (type) {       

      case "getOrgdatabyId":
           dispatch({
            type: "ORG_DATA_BY_ID",
            payload: res.data.orgData,
          });
          return dispatch(appExtraFunctions("showLandingLoader", false));
          case "getUserListbyId":
            dispatch({
             type: "ORG_USER_LIST_BY_ID",
             payload: res.data.userData,
           });
           return dispatch(appExtraFunctions("showLandingLoader", false));

    }
  }).catch((err)=>{
    console.log(err);
    if(err?.response?.status === 400|| err?.response?.status === 409){
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
  })
   
  }

