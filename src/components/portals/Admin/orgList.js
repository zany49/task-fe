import Customtable from "../../table/customtable"
import { useState, useEffect } from "react";
import { getCompanyContent } from "../../../store/actions/companyActions";
import { useDispatch, useSelector } from "react-redux";
import LoaderComp from "../../loader/loadercomp";
import { appExtraFunctions } from "../../../store/actions/appAction";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CustomModal from "../../modal/modal";
import { getUserPageContent } from "../../../store/actions/usersActions";



const OrgUserList = ({})=>{

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth.token);
    const userid = useSelector((state) => state.auth.authdata);
    const userList = useSelector((state) => state.user?.orgListAdmin);
    const columns = [
        {
            title: "Name",
            field: "name"
        },
        {
            title: "Organization Type",
            field: "org_type"
        },
        {
            title: "Email",
            field:"email"
        },
        {
            title: "Employee Size",
            field:"employee_size"
        }
    ]

    console.log("userDetails---->",userList)
    useEffect(() => {
        dispatch(appExtraFunctions("showLandingLoader", true));
        dispatch(getUserPageContent("getOrgListadmin", token,{},navigate,userid?.organization_ref));
      }, [userid?.organization_ref]);
    return userList && (
        <>
        <div className=" d-flex justify-content-start mb-30 mt-20 ml-10">
         <h4 className="">Current Admin Organaization data</h4>
        </div>

          <Customtable columns={columns} data={userList} />
        </>
    )
}

export default OrgUserList