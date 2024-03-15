import Customtable from "../../table/customtable"
import { useState, useEffect } from "react";
import { getCompanyContent } from "../../../store/actions/companyActions";
import { useDispatch, useSelector } from "react-redux";
import LoaderComp from "../../loader/loadercomp";
import { appExtraFunctions } from "../../../store/actions/appAction";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CustomModal from "../../modal/modal";
import { getUserPageContent } from "../../../store/actions/usersActions";



const AdminUserList = ({})=>{

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth.token);
    const userid = useSelector((state) => state.auth.authdata);
    const userList = useSelector((state) => state.user?.userListAdmin);
    const columns = [
        {
            title: "Name",
            field: "name"
        },
        {
            title: "Designation",
            field: "designation"
        },
        {
            title: "Email",
            field:"email"
        },
        {
            title: "Role",
            field:"role"
        }
    ]

    console.log("userDetails---->",userList)
    useEffect(() => {
        dispatch(appExtraFunctions("showLandingLoader", true));
        dispatch(getUserPageContent("getuserListadmin", token,{},navigate,userid?.organization_ref));
      }, [userid?.organization_ref]);
    return userList && (
        <>
        <div className=" d-flex justify-content-start mb-30 mt-20 ml-10">
         <h4 className="">Users List Of Current Organaization </h4>
        </div>
        
          <Customtable columns={columns} data={userList} />
        </>
    )
}

export default AdminUserList