import { useState, useEffect } from "react";
import { getCompanyContent } from "../../../store/actions/companyActions";
import { useDispatch, useSelector } from "react-redux";
// import CompanyCreated from "./Company/CompanyCreated";
import LoaderComp from "../../loader/loadercomp";
import { appExtraFunctions } from "../../../store/actions/appAction";
import { Link, useNavigate, useLocation } from "react-router-dom";
import UserCreated from "./userDetail/UserCreated";
import { getUserPageContent } from "../../../store/actions/usersActions";


const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token);
  const userid = useSelector((state) => state.auth.authdata);
  const userDetails = useSelector((state) => state.user?.userDataById);

 
  console.log("user id---->",userid,userid?._id,userDetails)
  useEffect(() => {
    dispatch(appExtraFunctions("showLandingLoader", true));
    dispatch(getUserPageContent("getuserById", token,{},navigate,userid?._id));
  }, [userid]);

  return userDetails && (
    <>
     <LoaderComp />
        <UserCreated data={userDetails} />
    </>
  );
};

export default UserDashboard;

