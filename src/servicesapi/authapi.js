import axios from "axios";
import { header } from "./appService";

const url = process.env.REACT_APP_DEV_BASE_URL;
// const url ="http://localhost:6001"

// axios.defaults.withCredentials = true;

export const getLongName = (str) => {
  if (str.length > 0) {
    let strn = str?.slice(0).replaceAll("%20", "");
    let maxLength = 27;
    if (strn.length <= maxLength) {
      return strn;
    } else {
      return strn.slice(0, maxLength) + "...";
    }
  } else {
    return "-";
  }
};

export const getFileName = (str) => {
  if (str.length > 0) {
    let strn = str?.slice(str.lastIndexOf("-") + 1).replaceAll("%20", "");
    let maxLength = 20;
    if (strn.length <= maxLength) {
      return strn;
    } else {
      return strn.slice(0, maxLength) + "...";
    }
  } else {
    return "-";
  }
};

export const getContent = async (type,token, value,params) => {
  switch (type) {
    case "registerForm":

      return await axios.post(`${url}/auth/register`, value);

    case "loginAuths":
     return  await axios.post(`${url}/auth/login`, value);


      case "logoutAuths":
      return null;

    default:
      return null;
  }
};
