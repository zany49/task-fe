import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_ACTION, authContent } from "../../store/actions/authActions";
import { persistor } from "../../store";
import { useEffect,useState } from "react";



const SideNavBar = ({ menu }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const logOutFun = () => {
    localStorage.removeItem("persist:root");
    // dispatch(authContent("logoutAuths"))
    persistor.purge();
    navigate("/");
    window.location.reload();
  };

  useEffect(()=>{
    const handleResize = () => {
      setIsMobile(window.innerWidth < 991);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };

  },[])
  return (
    <>
      <div className="col-auto px-0">
        <div
          id="sidebar"
          className={isMobile ?"collapse-horizontal  border-end sidebar-main collapse":"collapse collapse-horizontal show border-end sidebar-main"}
        >
          <div
            id="sidebar-nav"
            className="list-group border-0 rounded-0 text-sm-start min-vh-85"
          >
            {menu.map((d, i) => {
              return (
                <>
                  <a
                    onClick={()=>navigate(d.url)}
                    className="list-group-item border-end-0 d-inline-block text-truncate sidebar-item-properties"
                    data-bs-parent="#sidebar"
                  >
                    <img src={d?.icon ? d?.icon : ""} /> <span>{d.title}</span>{" "}
                  </a>
                </>
              );
            })}
          </div>

          <button className="logout-btn-main" onClick={logOutFun}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.4">
                <path
                  d="M6.61892 17H3.21152C2.75967 17 2.32632 16.8127 2.00682 16.4793C1.68731 16.1459 1.50781 15.6937 1.50781 15.2222V2.77778C1.50781 2.30628 1.68731 1.8541 2.00682 1.5207C2.32632 1.1873 2.75967 1 3.21152 1H6.61892"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M12.582 13.4446L16.8413 9.00011L12.582 4.55566"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M16.8394 9H6.61719"
                  stroke="black"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
            </svg>
            logout
          </button>
        </div>
      </div>
    </>
  );
};

export default SideNavBar;
