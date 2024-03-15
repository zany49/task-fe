import { lazy, Suspense, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { authContent } from "./store/actions/authActions";
import {
  Redirect,
  Route,
  Routes,
  withRouter,
  useRoutes,
  useNavigate,
  useLocation
} from "react-router-dom";
import { persistor } from "./store";
import AuthPage from "./components/login/AuthPage";
import Dashboard from "./components/portals/Organaization/Dashboard";
import OrganizationIndex from "./components/portals/Organaization";
import UserList from "./components/portals/Organaization/userlist";
import LandingPage from "./components/landingpage";
import { appExtraFunctions } from "./store/actions/appAction";
import AdminIndex from "./components/portals/Admin";
import UsersIndex from "./components/portals/Users";
import UserDashboard from "./components/portals/Users/Dashboard";
import OrgUserList from "./components/portals/Admin/orgList";
import AdminDashboard from "./components/portals/Admin/Dashboard";
import AdminUserList from "./components/portals/Admin/userlist";

function App(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector((state) => state.auth.token);


  const routes = useRoutes([

    {
      path: "/",
      element: <LandingPage />,
    },
    {
      path: "/signup",
      element: <AuthPage />,
    },
    {
      path: "/*",
      element: <LandingPage />,
    },
  
  ]);

  const protectedRoute = useRoutes([
    {
      path: "/organizations",
      element: <OrganizationIndex />,
      children: [
        {
          path: "user-list",
          element: <UserList />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "/user",
      element: <UsersIndex />,
      children: [
        {
          path: "dashboard",
          element: <UserDashboard />,
        },
      ],
    },
    {
      path: "/admin",
      element: <AdminIndex />,
      children: [
        {
          path: "user-list",
          element: <AdminUserList />,
        },
        {
          path: "dashboard",
          element: <AdminDashboard />,
        },{
          path: "organization-list",
          element:<OrgUserList/>
        }
      ],
    },
  ]);



  useEffect(() => {
    // dispatch(authContent("checkUser",{},navigate,{},token))
    if (
      !token &&
      (protectedRoute?.props?.match?.pathnameBase === "/organizations")
    ) {
      persistor.purge();
      dispatch(authContent("logoutAuths"))
      window.location.reload()
      navigate("/");
      dispatch(appExtraFunctions("showLandingLoader", false));

    }
    if(token && (location.pathname === "/"|| location.pathname.includes("/signup"))){
      // alert('in')
      persistor.purge();
      dispatch(authContent("logoutAuths"))
      window.location.reload()
      dispatch(appExtraFunctions("showLandingLoader", false));
    }
  }, []);
  return (
    <div className="App">
      <div className="vh-100">
        {!token ? (
          <Suspense
            fallback={
              <div id="preloader">
                <div className="sk-three-bounce">
                  <div className="sk-child sk-bounce1"></div>
                  <div className="sk-child sk-bounce2"></div>
                  <div className="sk-child sk-bounce3"></div>
                </div>
              </div>
            }
          >
            {routes}
          </Suspense>
        ) : (
          <Suspense
            fallback={
              <div id="preloader">
                <div className="sk-three-bounce">
                  <div className="sk-child sk-bounce1"></div>
                  <div className="sk-child sk-bounce2"></div>
                  <div className="sk-child sk-bounce3"></div>
                </div>
              </div>
            }
          >
            {protectedRoute}
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default App;
