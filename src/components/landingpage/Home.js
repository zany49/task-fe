import TopBanner from "../../assests/Home Page/topbanner-n.png";
import { Link, useNavigate } from "react-router-dom";
import LoaderComp from "../loader/loadercomp";
import { appExtraFunctions } from "../../store/actions/appAction";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const LandingHome = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const getSignupPage = () => {
    navigate("/signup");
  };

  useEffect(() => {
    dispatch(appExtraFunctions("showLandingLoader", true));
    setTimeout(() => {
      dispatch(appExtraFunctions("showLandingLoader", false));
    }, 2000);
    window.addEventListener("load", function () {
      dispatch(appExtraFunctions("showLandingLoader", false));
    });

  }, []);
  return (
    <>
    <LoaderComp/>
      <div className="banner-wrap" id="home">
        <div className="banner-section">
          <div class="container">
            <div className="banner-inner">
              <div className="d-flex home-content-end">
                <div className="topBanner ">
                  <h3 className="home-content">
                    Connecting Indian
                    <br />
                    <span className="enterpre-color">organizations</span>
                    <br />
                    Data(s)
                  </h3>
                  
                  <button className="invest-btn" onClick={getSignupPage}>
                    signup 
                  </button>
                </div>
              </div>
              <div className="d-flex home-img-end">
                <img className="bannerImg" src={TopBanner} />
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default LandingHome;
