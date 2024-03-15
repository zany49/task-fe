import Customtable from "../../table/customtable"
import { useState, useEffect } from "react";
import { getCompanyContent } from "../../../store/actions/companyActions";
import { useDispatch, useSelector } from "react-redux";
import CompanyCreated from "./Company/CompanyCreated";
import LoaderComp from "../../loader/loadercomp";
import { appExtraFunctions } from "../../../store/actions/appAction";
import { Link, useNavigate, useLocation } from "react-router-dom";
import CustomModal from "../../modal/modal";



const UserList = ({})=>{

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const token = useSelector((state) => state.auth.token);
    const userid = useSelector((state) => state.auth.authdata);
    const userList = useSelector((state) => state.company?.userList);
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
        },
        {
            title: "Action",
            field:"action" 
        },
        {
            title: "Delete",
            field:"delete"
        }
    ]

    console.log("userDetails---->",userList)
    useEffect(() => {
        dispatch(appExtraFunctions("showLandingLoader", true));
        dispatch(getCompanyContent("getUserListbyId", token,{},navigate,userid._id));
      }, [userid]);
    return userList && (
        <>
        <div className=" d-flex justify-content-end mb-30">
        <CustomModal title="Create user" />
        </div>
        
          <Customtable columns={columns} data={userList} />
        </>
    )
}

export default UserList