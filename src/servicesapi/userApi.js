import axios from "axios";
import { header } from "./appService";

const url = process.env.REACT_APP_DEV_BASE_URL;

export const getUserContent = async (type, token, value, id) => {
    switch (type) {
  
      case "getuserById":
        return await axios.get(`${url}/user/getuserById/${id}`, header(token));
        case "getuserByIdadmin":
        return await axios.get(`${url}/admin/getuserById/${id}`, header(token));
        case "getuserListadmin":
        return await axios.get(`${url}/admin/getalluserdata/${id}`, header(token));
        case "getOrgListadmin":
            return await axios.get(`${url}/admin/getallorgdata/${id}`, header(token));
      default:
        return null;
    }
  };