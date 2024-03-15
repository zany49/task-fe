import { useEffect } from "react";
import SideNavBar from "../../sidenavbar/sidenavbar";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authContent } from "../../../store/actions/authActions";
import Navbar from "../../landingpage/newNavbar";
import LoaderComp from "../../loader/loadercomp";
import { appExtraFunctions } from "../../../store/actions/appAction";

const AdminIndex = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userid = useSelector((state) => state.auth.authdata);

  const dispatch = useDispatch();
  const sideMenu = [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      navigate: navigate,
    },
    {
      title: "User List",
      url: "/admin/user-list",
      navigate: navigate,
    },{
    
      title: "Organization List",
      url: "/admin/organization-list",
      navigate: navigate,
    }
  ];
  
  useEffect(() => {
    dispatch(appExtraFunctions("showLandingLoader", true));
    // if(userid?.role !== "admin"){
    //   navigate('/')
    // }
    console.log("role-->",userid?.role)
  }, [userid?.role]);

  // return isAuthenticated === true ?
  return (
    <>

          {/* <LandingNavBar token={token}/> */}
          <Navbar token={token} />

          <div className="container-fluid">
            <div className="row flex-nowrap">
              <SideNavBar menu={sideMenu} />
              <main className="col ps-md-2 pt-2 max-height">
                <Outlet />
              </main>
            </div>
          </div>
        </>
  )
  //  : (
  //   <>
  //      <LoaderComp />
  //   </>
  // );
};

export default AdminIndex;
