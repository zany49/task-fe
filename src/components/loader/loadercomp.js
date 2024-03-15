import Lottie from "react-lottie";
import animationData from "./loaderdata.json";
import { useDispatch, useSelector } from "react-redux";
import { appExtraFunctions } from "../../store/actions/appAction";
import { useEffect } from "react";



const LoaderComp = ({})=>{
    const dispatch = useDispatch();
    const loader = useSelector((state) => state.app.landingLoader);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      };

      

    return(
        <>
         {loader === true && (
        <div class="preloader">
          {/* <img src="./loader.gif" class="loader" /> */}
          <Lottie options={defaultOptions} height={200} width={200} />
        </div>
      )}
        </>
    )
}

export default LoaderComp