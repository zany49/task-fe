import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoaderComp from "../../loader/loadercomp";
import { appExtraFunctions } from "../../../store/actions/appAction";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AdminDetails from "./adminDetails/adminDetails";
import { getUserPageContent } from "../../../store/actions/usersActions";


const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token);
  const userid = useSelector((state) => state.auth.authdata);
  const userDetails = useSelector((state) => state.user?.userDataByIdAdmin);

 
  console.log("user id---->",userid,userid?._id,userDetails)
  useEffect(() => {
    dispatch(appExtraFunctions("showLandingLoader", true));
    dispatch(getUserPageContent("getuserByIdadmin", token,{},navigate,userid?._id));
  }, [userid]);

  return userDetails && (
    <>
     <LoaderComp />
        <AdminDetails data={userDetails} />
    </>
  );
};

export default AdminDashboard;

