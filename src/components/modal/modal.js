import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  executeScroll,
  handleInputChange,
  renderElements,
} from "../../servicesapi/appService";
import { getValidateSchema, validateFileType } from "../../utils/ValidateSchema";
import { validate } from "validate.js";
import { faker } from "@faker-js/faker";
import {
  getCompanyContent,
  handleSubmitForm,
} from "../../store/actions/companyActions";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { appExtraFunctions } from "../../store/actions/appAction";

const CustomModal = ({ title, btnType, data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const userid = useSelector((state) => state.auth.authdata);
  const userCreated = useSelector((state) => state.company.userCreated);
  const [enableEditval, setEnableEditval] = useState(false);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState({});
  const [constraints, setConstraints] = useState({});
  const [filename, setFilename] = useState("");
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    organization_ref: userid._id,
  });

  const [orgvalues, setOrgValues] = useState({ });

  const layoutElements = [
    {
      label: "Name",
      name: "name",
      type: 1,
      required: true,
      constraints: [
        {
          label: "pattern",
          value: 1,
        },
      ],
    },
    {
      label: "Email",
      name: "email",
      type: 1,
      required: true,
      constraints: [
        {
          label: "pattern",
          value: 5,
        },
      ],
    },
    {
      label: "Designation",
      name: "designation",
      type: 1,
      required: true,
      constraints: [
        {
          label: "pattern",
          value: 4,
        },
      ],
    },
    {
      label: "Password",
      name: "password",
      type: 1,
      required: true,
      constraints: [
        {
          label: "pattern",
          value: 12,
        },
      ],
    },
    {
      label: "Role",
      name: "role",
      placeholder: "Please select User type",
      required: true,
      type: 2,
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Users",
          value: "users",
        },
      ],
    },
  ];
  const layoutElementsEdit = [
    {
      label: "Name",
      name: "name",
      type: 1,
      required: true,
      constraints: [
        {
          label: "pattern",
          value: 1,
        },
      ],
    },
    {
      label: "Email",
      name: "email",
      type: 1,
      required: true,
      constraints: [
        {
          label: "pattern",
          value: 5,
        },
      ],
    },
    {
      label: "Designation",
      name: "designation",
      type: 1,
      required: true,
      constraints: [
        {
          label: "pattern",
          value: 4,
        },
      ],
    },
    {
      label: "Role",
      name: "role",
      placeholder: "Please select User type",
      required: true,
      type: 2,
      options: [
        {
          label: "Admin",
          value: "admin",
        },
        {
          label: "Users",
          value: "users",
        },
      ],
    },
  ];

  const orglayoutElements = [
    {
      label: "Name",
      name: "name",
      type: 1,
      required: true,
      constraints: [
        {
          label: "pattern",
          value: 1,
        },
      ],
    },
    {
      label: "Email",
      name: "email",
      type: 1,
      required: true,
      constraints: [
        {
          label: "pattern",
          value: 5,
        },
      ],
    },
    {
      label: "Organization Type",
      name: "org_type",
      placeholder: "Please select your Organization  type",
      required: true,
      type: 2,
      options: [
        {
          label: "Public",
          value: "public",
        },
        {
          label: "Private",
          value: "private",
        },
      ],
    },
    {
      label: "Employee size",
      name: "employee_size",
      type: 1,
      required: true,
      constraints: [
        {
          label: "pattern",
          value: 6,
        },
      ],
    },
    {
      label: "Company Logo",
      name: "logo",
      className:"custom-file-upload-n" ,
      type: 9,
      required: true,
      accept: " image/png, image/jpg, image/jpeg",
    },
  ];
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setValues({
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: "Admin@1234",
      organization_ref: userid._id,
    });
    setShow(true);
  };

  const handleShoworg = ()=>{
    setOrgValues(data)
    setShow(true);
  }

  const handleShowN = () => setShow(true);

  const handleChange = (e) => {
    handleInputChange(e, values, errors, constraints, setValues, setErrors);
  };

  const handleChangeOrg = (e) => {
    if (e?.target?.type && e?.target?.type === "file") {
      const res = validateFileType(e.target.files[0]);
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
      setOrgValues({ ...orgvalues, logo: e.target.files[0] });
      setFilename(e.target.files[0].name);
    } else {
    handleInputChange(e, orgvalues, errors, constraints, setOrgValues, setErrors);
    }
  };

  const onSubmit = () => {
    dispatch({
      type: "USER_CREATED_SUCESSIVE",
      payload: false,
    });
    const constraints = getValidateSchema(layoutElements);

    // setConstraints(constraints);
    const errors = validate(values, constraints);
    if (errors || errors !== undefined) {
      setErrors(errors);
      executeScroll(errors);
      return errors;
    }

    dispatch(appExtraFunctions("showLandingLoader", true));
    dispatch(handleSubmitForm("enroll_user", token, values, navigate));
    setValues({})
    setErrors({})
    handleClose();
  };

  const onSubmitEdit = ()=>{
    dispatch({
      type: "USER_CREATED_SUCESSIVE",
      payload: false,
    });
    const constraints = getValidateSchema(layoutElementsEdit);

    // setConstraints(constraints);
    const errors = validate(values, constraints);
    if (errors || errors !== undefined) {
      setErrors(errors);
      executeScroll(errors);
      return errors;
    }

    dispatch(appExtraFunctions("showLandingLoader", true));
    dispatch(handleSubmitForm("edit_user", token, values, navigate,data._id));
    setValues({})
    setErrors({})
    handleClose();
  }

  const editorganization = () =>{
    dispatch({
      type: "USER_CREATED_SUCESSIVE",
      payload: false,
    });
    const constraints = getValidateSchema(orglayoutElements);

    // setConstraints(constraints);
    const errors = validate(orgvalues, constraints);
    if (errors || errors !== undefined) {
      setErrors(errors);
      executeScroll(errors);
      return errors;
    }

    dispatch(appExtraFunctions("showLandingLoader", true));
    const formData = new FormData();
        for (let key in orgvalues) {
          formData.append(key, orgvalues[key]);
        }
        dispatch(handleSubmitForm("edit_org", token, formData, navigate,data._id));
        setOrgValues({})
        setErrors({})
        handleClose()
  }

  const enableEdit = (data) => {
    setEnableEditval(true);
    setValues({
      name: data.name,
      email: data.email,
      designation: data.designation,
      role: data.role,
    });
  };

  const deleteUser = (data) => {
    dispatch({
      type: "USER_CREATED_SUCESSIVE",
      payload: false,
    });
    dispatch(appExtraFunctions("showLandingLoader", true));
    dispatch(handleSubmitForm("delete_user", token, {}, navigate,data._id));
    handleClose();
  };

  console.log("userCreated--->0", userCreated);

  useEffect(() => {
    dispatch(appExtraFunctions("showLandingLoader", true));
    dispatch(
      getCompanyContent("getUserListbyId", token, {}, navigate, userid._id)
    );
  }, [userCreated]);

  return (
    <>
      <Button
        variant={
          btnType === "danger"
            ? "btn btn-outline-danger"
            : btnType === "secondary"
            ? "btn btn-outline-secondary"
            : "btn btn-outline-primary"
        }
        onClick={title === "Create user" ? handleShow : title === "Edit Organization" ? handleShoworg :  handleShowN}
      >
        {title}
      </Button>

      {title === "Create user" ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {layoutElements?.map((d, i) => (
              <div key={i} className="company-tab-wrap">
                {renderElements({
                  ...d,
                  handleChange,
                  values,
                  errors,
                  // hideLabel: true,
                })}
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="btn btn-outline-secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="btn btn-outline-primary"
              onClick={() => onSubmit()}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      ) : title === "Delete user" ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>View User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Are you sure , you want to delete this user ?</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="btn btn-outline-secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="btn btn-outline-danger"
              onClick={() => deleteUser(data)}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      ) :  title === "View user" ? (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>View User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {enableEditval ? (
                layoutElementsEdit?.map((d, i) => (
                  <div key={i} className="company-tab-wrap">
                    {renderElements({
                      ...d,
                      handleChange,
                      values,
                      errors,
                    })}
                  </div>
                ))
              ) : (
                <div className="company-details-inner mt-30">
                  <div className="d-flex justify-space-between mt-10">
                    <div className=" ml-10">
                      <div className="d-flex justify-content-start">
                        <p className="mb-team-0">Name :</p>
                        <div className="industry-name">
                          <p className="data-sub-p">{data?.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-space-between mt-10">
                    <div className=" ml-10">
                      <div className="d-flex justify-content-start">
                        <p className="mb-team-0">Email:</p>
                        <div className="industry-name">
                          <p className="data-sub-p">{data?.email}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-space-between mt-10">
                    <div className=" ml-10">
                      <div className="d-flex justify-content-start">
                        <p className="mb-team-0">Designation:</p>
                        <div className="industry-name">
                          <p className="data-sub-p">{data?.designation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex justify-space-between mt-10">
                    <div className=" ml-10">
                      <div className="d-flex justify-content-start">
                        <p className="mb-team-0">Role:</p>
                        <div className="industry-name">
                          <p className="data-sub-p">{data?.role}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="btn btn-outline-secondary" onClick={handleClose}>
                Close
              </Button>
              {enableEditval ? (
                <Button
                  variant="btn btn-outline-primary"
                  onClick={() => onSubmitEdit()}
                >
                  Save Changes
                </Button>
              ) : (
                <Button
                  variant="btn btn-outline-primary"
                  onClick={() => enableEdit(data)}
                >
                  Enable Edit
                </Button>
              )}
            </Modal.Footer>
          </Modal>
      ): title="Edit Organization" && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Organaization</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {orglayoutElements?.map((d, i) => (
              <div key={i} className="company-tab-wrap">
                {d.name !== "logo" ? (
                  <>
                    {renderElements({
                  ...d,
                  handleChange:handleChangeOrg,
                  values:orgvalues,
                  errors,
                  // hideLabel: true,
                })}
                  </>):(
                    <>
                     {renderElements({
                  ...d,
                  handleChange:handleChangeOrg,
                  values:orgvalues,
                  errors,
                  name:"logo",
                  values:filename,
                  // hideLabel: true,
                })}
                    </>
                  )}
                
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="btn btn-outline-secondary" onClick={handleClose}>
              Close
            </Button>
            <Button
              variant="btn btn-outline-primary"
              onClick={() => editorganization()}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )
      }
    </>
  );
};

export default CustomModal;
