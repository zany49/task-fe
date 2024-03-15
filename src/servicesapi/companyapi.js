import axios from "axios";
import { header } from "./appService";

const url = process.env.REACT_APP_DEV_BASE_URL;
// const url = "http://localhost:6001";

export const handleSubmitdataform = async (
  type,
  token,
  value,
  navigate,
  params
) => {
  switch (type) {
    case "enroll_user":
      return await axios.post(`${url}/org/createuser`, value, header(token));
     
      case "edit_user":
        return await axios.put(`${url}/org/edit-user/${params}`, value, header(token));
        case "edit_org":
        return await axios.put(`${url}/org/edit-org/${params}`, value, header(token));

      case "delete_user":
        return await axios.delete(`${url}/org/delete-user/${params}`, header(token));
    default:
      return null;
  }
};

export const getcompanyContentapi = async (type, token, value, id) => {
  switch (type) {

    case "getOrgdatabyId":
      return await axios.get(`${url}/org/${id}`, header(token));
      case "getUserListbyId":
        return await axios.get(`${url}/org/getuserlist/${id}`, header(token));
      
    default:
      return null;
  }
};
