import { useEffect, useState } from "react";
import Logo from "../../assests/Home Page/logo.jpg";
import { useParams } from "react-router-dom";
import { ROLES } from "../../config/roles";
import { authContent } from "../../store/actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { EmailRegex, MobileRegex, PasswordRegex } from "../../utils/Regex";
import LoaderComp from "../loader/loadercomp";
import { appExtraFunctions } from "../../store/actions/appAction";
import { validateFileType } from "../../utils/ValidateSchema";
import { renderElements } from "../../servicesapi/appService";

const AuthPage = ({}) => {
  const navigate = useNavigate();
  const params = useParams();
  // const role = "org";
  const dispatch = useDispatch();
  const location = useLocation();
  const [btnActive, setBtnActive] = useState(
    location?.state?.setBtnActive ? location?.state?.setBtnActive : false
  );
  const [filename, setFilename] = useState("");
  const [constraints, setConstraints] = useState({});
  const [authData, setAuthData] = useState({
    logo:"",
    name: "",
    email: "",
    password: "",
    employee_size: "",
    org_type:"public",
    role: "org",
  });
  const [redirect,setRedirect] = useState( `/${ROLES[authData.role]}/dashboard` );
 const layoutElements = [

    {
      label: "Company Logo",
      name: "logo",
      className:"custom-file-upload-n" ,
      type: 9,
      required: true,
      accept: " image/png, image/jpg, image/jpeg",
    },
  ];

  let errorsObj =
    btnActive === false
      ? { name: "", email: "", password: "", employee_size: "",org_type:"" }
      : {
          email: "",
          password: "",
        };
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState(errorsObj);
  const dropdown = [
     {
    value:"admin",
    lable: "Admin"
  },  {
    value:"users",
    lable: "User"
  },  {
    value:"org",
    lable: "Organaization"
  },
]

const typedropdown = [
  {
 value:"public",
 lable: "Public"
},  {
 value:"private",
 lable: "Private"
}, 
]



  const onInputChange = (event) => {
    const { name, value } = event.target;
    if (event?.target?.type && event?.target?.type === "file") {
      const res = validateFileType(event.target.files[0]);
      if (res === 401) {
        setFilename("");
        return setErrors({
          ...errors,
          logo: ["Only file size below 5mb are allowed"],
        });
      }
      if (res === 400) {
        setFilename("");
        return setErrors({
          ...errors,
          logo: ["Only jpg/jpeg and png file are allowed"],
        });
      }
      setErrors({ ...errors, logo: [""] });
      setAuthData({ ...authData, logo: event.target.files[0] });
      setFilename(event.target.files[0].name);
    }else{
      setAuthData((prevObject) => ({
        ...prevObject,
        [name]: value,
      }));
    }

  };

  const submitForm = () => {
    var d;
    if (btnActive === false) {
      let error = false;
      const errorObj = { ...errorsObj };
      if (authData.name === "") {
        errorObj.name = "User Name is Required";
        error = true;
      }
      if (authData.employee_size === "") {
        errorObj.employee_size = "Employee Size is Required";
        error = true;
      }
      if (authData.email === "") {
        errorObj.email = "Email is Required";
        error = true;
      }
      if(authData.org_type === ""){
        error.org_type = "Organization Type is Required";
        error = true;
      }
      if (!EmailRegex.test(String(authData.email).toLowerCase())) {
        errorObj.email = "Enter a valid email address";
        error = true;
      }
      if (authData.password === "") {
        errorObj.password = "Password is Required";
        error = true;
      }
      if (!PasswordRegex.test(String(authData.password))) {
        errorObj.password =
          "Enter a valid Password should have at least one uppercase,lowercase & ,special (@$!%*?&+) and at least min 8 characters";
        error = true;
      }
      setErrors(errorObj);
      if (error) {
        return setError(true);
      }
      const formData = new FormData();
        for (let key in authData) {
          formData.append(key, authData[key]);
        }

      d = formData;
    } else {
      let error = false;
      const errorObj = { ...errorsObj };
      if (authData.email === "") {
        errorObj.email = "Email is Required";
        error = true;
      }
      if (!EmailRegex.test(String(authData.email).toLowerCase())) {
        errorObj.email = "Enter a valid email address";
        error = true;
      }
      if (authData.password === "") {
        errorObj.password = "Password is Required";
        error = true;
      }
      if (!PasswordRegex.test(String(authData.password))) {
        errorObj.password =
          "Enter a valid Password should have at least one uppercase,lowercase & ,special (@$!%*?&+) and at least min 8 characters";
        error = true;
      }
      if (authData.role === "") {
        errorObj.role = "Select User Type is Required";
        error = true;
      }

      setErrors(errorObj);
      if (error) {
        return setError(true);
      }
      d = {
        email: authData.email,
        password: authData.password,
        role: authData.role,
      };
    }
    dispatch(appExtraFunctions("showLandingLoader", true));
    dispatch(
      authContent(
        btnActive === false ? "registerForm" : "loginAuths",
        "",
        d,
        navigate,
        redirect
      )
    );
    // dispatch(appExtraFunctions("showLandingLoader", false));
  };

  const btnActiveFun = () => {
    setError(false);
    setBtnActive(!btnActive);
  };

  useEffect(()=>{
    setRedirect(`/${ROLES[authData.role]}/dashboard`)
  },[authData.role])
  
  return (
    <>
    <LoaderComp />
      <div className="container">
        <div className="row mt-20">
          <div className="d-flex justify-content-between align-items-center">
            <div onClick={() => navigate("/")}>
              <img className="nav-bar-logo" src={Logo} />
            </div>
            <div>
              <p className="mb-0">
                Already have an account?{" "}
                <a
                  className="sigin-a"
                  onClick={() => {
                    setBtnActive(true);
                  }}
                >
                  Sign In
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="signUp-main">
          <div className="row justify-content-center mb-10">
            <div className="col-md-5">
              <div className="signUpContent">
                <h3>
                  Welcome To The <span>OrgData</span> World
                </h3>
                {/* <hr className="hr-signUp" /> */}
                <svg width="125" height="10">
                  <rect width="200" height="100" style={{ fill: "#094380" }} />
                </svg>
                <h4>Get started</h4>
              </div>
            </div>
            <div className="col-md-6 signUp-card">
              <div className="row d-flex justify-content-center">
                <button
                  className={
                    btnActive === false
                      ? "signIn-btn-top isActive"
                      : "signIn-btn-top"
                  }
                  onClick={btnActiveFun}
                >
                  Sign up
                </button>
                <button
                  className={
                    btnActive === true
                      ? "signIn-btn-top isActive"
                      : "signIn-btn-top"
                  }
                  onClick={btnActiveFun}
                >
                  Sign in
                </button>
              </div>
        
              {btnActive === false ? (
                <>
                  <div className="mt-20 txt-start">
                    <span className="mt-20 txt-start">Organization Email</span>
                    <input
                      type="email"
                      placeholder="Your Organization Email"
                      className="signUp-input"
                      name="email"
                      onChange={onInputChange}
                    />
                  </div>
                  {error && errors.email && (
                    <div className="text-danger fs-12 txt-left">
                      {errors.email}
                    </div>
                  )}

                  <div className="mt-20 txt-start">
                    <span className="mt-20 txt-start">Organization Password</span>

                    <input
                      type="password"
                      placeholder="Password"
                      className="signUp-input"
                      name="password"
                      onChange={onInputChange}
                    />
                  </div>
                  {error && errors.password && (
                    <div className="text-danger fs-12 txt-left">
                      {errors.password}
                    </div>
                  )}

                  <div className="mt-20 txt-start">
                    <span className="mt-20 txt-start">Organization Name</span>

                    <input
                      type="text"
                      placeholder="User Name"
                      className="signUp-input"
                      name="name"
                      onChange={onInputChange}
                    />
                  </div>
                  {error && errors.name && (
                    <div className="text-danger fs-12 txt-left">
                      {errors.name}
                    </div>
                  )}

                  <div className="mt-20 txt-start">
                    <span className="mt-20 txt-start">Employee Size</span>

                    <input
                      type="text"
                      placeholder=" Employee Size"
                      className="signUp-input"
                      name="employee_size"
                      onChange={onInputChange}
                      maxLength={10}
                    />
                  </div>
                  {error && errors.employee_size && (
                    <div className="text-danger fs-12 txt-left">
                      {errors.employee_size}
                    </div>
                  )}

                  <div className="mt-20 txt-start">
                   <span className="mt-20 txt-start ">Select Organaization type:</span>
                      <select name="org_type" value={authData.org_type} onChange={onInputChange} className="signUp-input">
                        {typedropdown.map((d)=>{
                          return(
                        <option value={d.value}>{d.lable}</option>
                        )})}
                      </select>
                    </div>
                    {error && errors.org_type && (
                    <div className="text-danger fs-12 txt-left">
                      {errors.org_type}
                    </div>
                  )}

{layoutElements?.map((d, i) => (
                    <div key={i} className="company-tab-wrap mt-30">
                          {renderElements({
                            ...d,
                            handleChange:onInputChange,
                            values:authData,
                            errors,
                            name: "logo",
                            values: filename,
                            // hideLabel: true,
                          })}
                          </div>))}
                  <button className="signUp-btn mt-20" onClick={submitForm}>
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  {/* <div className="mt-20 txt-start">
                  <span className="mt-20 txt-start">User Name</span>

                  <input
                    type="text"
                    placeholder="User Name"
                    className="signUp-input"
                    name="fullname"
                    onChange={onInputChange}
                  />
                </div> */}

                  <div className="mt-20 txt-start">
                    <span className="mt-20 txt-start">Your Email</span>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="signUp-input"
                      name="email"
                      onChange={onInputChange}
                    />
                  </div>
                  {error && errors.email && (
                    <div className="text-danger fs-12 txt-left">
                      {errors.email}
                    </div>
                  )}

                  <div className="mt-20 txt-start">
                    <span className="mt-20 txt-start ">Password</span>

                    <input
                      type="password"
                      placeholder="Password"
                      className="signUp-input"
                      name="password"
                      onChange={onInputChange}
                    />
                  </div>
                  {error && errors.password && (
                    <div className="text-danger fs-12 txt-left">
                      {errors.password}
                    </div>
                  )}

                   <div className="mt-20 txt-start">
                   <span className="mt-20 txt-start ">Select User type:</span>
                      <select name="role" value={authData.role} onChange={onInputChange} className="signUp-input">
                        {dropdown.map((d)=>{
                          return(
                        <option value={d.value}>{d.lable}</option>
                        )})}
                      </select>
                    </div>
                    {error && errors.role && (
                    <div className="text-danger fs-12 txt-left">
                      {errors.role}
                    </div>
                  )}
                  <button className="signUp-btn mt-20" onClick={submitForm}>
                    Sign in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthPage;
