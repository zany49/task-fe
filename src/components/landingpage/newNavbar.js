import { useState, useEffect } from "react";
import Logo from "../../assests/Home Page/logo.jpg";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { persistor } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { authContent } from "../../store/actions/authActions";
import logout from "../../assests/Get Started/logout.svg";
import "../../css/newnav.css";

export default function Navbar({ token }) {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const loc = location.pathname;
  const dispatch = useDispatch();

  const logOutFun = () => {
    localStorage.removeItem("persist:root");
    dispatch(authContent("logoutAuths"));
    persistor.purge();
    navigate("/");
    window.location.reload();
  };

  const handleScroll = (scrollTO) => {
    document
      .getElementById("scrollToHome")
      .addEventListener("click", function (event) {
        event.preventDefault();

        // Smooth scroll to the home div
        document.querySelector(scrollTO).scrollIntoView({
          behavior: "smooth",
        });
      });
  };

  return (
    <div className="nav-div">
      <div className="navigation">
        <div className="landingLogo">
          {/* {!token ? ( */}
            <img
              className="nav-bar-logo"
              src={Logo}
            />
          {/* )  */}
          
          {/* // : token && (
          //   <>
          //     <button className="logout-btn ml-20" onClick={logOutFun}>
          //       <img src={logout} />
          //       logout
          //     </button>
          //   </>
          // )} */}
        </div>
        {/* {!token && (
          <> */}
        <button
          className="hamburger"
          onClick={() => {
            setIsNavExpanded(!isNavExpanded);
          }}
          data-bs-target="#sidebar"
          data-bs-toggle="collapse"
        >
          {/* icon from Heroicons.com */}

          {!isNavExpanded ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="white"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 20 20"
              stroke="white"
              className="h-5 w-5 close-icon"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          )}
        </button>
        <div
          className={
            loc == '/' ? isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
            : "navigation-menu"
          }
        >
          <ul>
            <li className="btn-li">
              {!token && (
                <>
                  <div class="dropdown">
                    <button
                      class="btn-signup"
                      onClick={() => {
                        navigate("/signup");
                      }}
                    >
                      Sign up
                    </button>
                  </div>
                </>
              )}
            </li>
          </ul>
        </div>
        {/* </> */}
        {/* )} */}
      </div>
    </div>
  );
}
