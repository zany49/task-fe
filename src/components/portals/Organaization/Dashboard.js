import { useState, useEffect } from "react";
import { getCompanyContent } from "../../../store/actions/companyActions";
import { useDispatch, useSelector } from "react-redux";
import CompanyCreated from "./Company/CompanyCreated";
import LoaderComp from "../../loader/loadercomp";
import { appExtraFunctions } from "../../../store/actions/appAction";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CustomModal from "../../modal/modal";


const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const token = useSelector((state) => state.auth.token);
  const userid = useSelector((state) => state.auth.authdata);
  const companyDetails = useSelector((state) => state.company?.orgData);

 
  console.log("user id---->",userid,userid?._id)
  useEffect(() => {
    dispatch(appExtraFunctions("showLandingLoader", true));
    dispatch(getCompanyContent("getOrgdatabyId", token,{},navigate,userid?._id));
  }, [userid]);

  return companyDetails && (
    <>
     <LoaderComp />
     <div className=" d-flex justify-content-end mb-30">
        <CustomModal title="Edit Organization" data={companyDetails} />
        </div>
        <CompanyCreated data={companyDetails} />
    </>
  );
};

export default Dashboard;

