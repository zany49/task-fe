import { AppImageUpload1, AppSelect, AppTextField } from "../layout/InputElements";
import _ from "lodash";
import { authContent } from "../store/actions/authActions";
import { Outlet,useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";







export const handleInputChange = async(
    e,
    values,
    errors,
    constraints,
    setValues,
    setErrors,
    pathname
  ) => {
    let obj;
    if (e.type === "file") {
      alert("Please")
      // console.log("Name: ", e.name);
      obj = { ...values, [e.name]: e.file };
    } else if (e.type === "dateTimePicket") {
      obj = { ...values, [e.name]: e?.value };
    } else if (e.type === "timePicket") {
      obj = { ...values, [e.name]: e?.value };
    } else if (e.type === "multiFile") {
      var files;
      if (e.status === "done") {
        files = values?.file ? [...values.file, e.file] : [e.file];
      } else {
        const i = values.file.findIndex(
          (file) => file.lastModified === e.file.lastModified
        );
        values.file.splice(i, 1);
        files = values.file;
      }
      obj = { ...values, [e.name]: files };
    } else if (e.type === "multiFileDropZone") {
      var files;
      obj = { ...values, [e.name]: e.file };
    } else if (e.type === "declaration") {
      obj = { ...values, [e.name]: e.value };
    } else if (e.type === "ckeditor") {
      obj = { ...values, [e.name]: e.data };
    } else if (e.type === "accessControl") {
      let curr = e.currValues;
      let accessObj = { ...curr.access };
      if (accessObj[e.name] && accessObj[e.name].includes(e.value)) {
        accessObj = { ...accessObj, [e.name]: e.value.slice(0, -1) };
      } else {
        accessObj = { ...accessObj, [e.name]: e.value };
      }
  
      obj = { ...values, access: accessObj };
    } else if (e.type === "checkbox") {
      const checkedArr = values[e.name] ?? [];
      const getArr = () => {
        if (
          e.target.checked &&
          (!values[e.name] || !values[e.name].includes(e.value))
        ) {
          return [...checkedArr, e.value];
        } else if (
          !e.target.checked &&
          values[e.name] &&
          values[e.name].includes(e.value)
        ) {
          checkedArr.splice(checkedArr.indexOf(e.value), 1);
          return checkedArr;
        }
      };
      obj = { ...values, [e.name]: getArr() };
    } else if (e.type === "single-checkbox") {
      obj = { ...values, [e.name]: e.value };
    } else if (!e.target && !e.type) {
      if (e.name.includes(".")) {
        const name = e.name.split(".");
        // obj = { ...values, [name[0][name[1]]]: e.value };
        obj = {
          ...values,
          [name[0]]: {
            ...values[name[0]],
            [name[1]]: e.value,
          },
        };
      } else {
        obj = { ...values, [e.name]: e.value };
      }
    } else if (e.target.name.includes(".")) {
      const name = e.target.name.split(".");
      // obj = { ...values, [name[0][name[1]]]: e.value };
      obj = {
        ...values,
        [name[0]]: {
          ...values[name[0]],
          [name[1]]: e.target.value,
        },
      };
    } else if (e.target?.getAttribute("data-mask") === "mask") {
      obj = { ...values, [e.target.name]: e.target.value.trim() };
    } else {
    //   alert ("here")
      obj = { ...values, [e.target.name]: e.target.value };
    }
  
      setValues(_.pickBy(obj, _.identity));
  
    // }
  };



export function renderElements(ele) {
    switch (ele?.type) {
      case 1:
        return <AppTextField {...ele} />;
      case 2:
        return <AppSelect {...ele} />;
    //   case 3:
    //     return <AppPicker {...ele} />;
    //   case 4:
    //     return <AppNumberField {...ele} />;
    //   case 5:
    //     return <AppCheckbox {...ele} />;
    //   case 6:
    //     return <AppMultiSelect {...ele} />;
    //   case 7:
    //     return <AppEmailField {...ele} />;
    //   case 8:
    //     return <AppTextArea {...ele} />;
      case 9:
        return <AppImageUpload1 {...ele} />;
      // return <AppFileUpload {...ele} />;
    //   case 10:
    //     return <AppCheckbox {...ele} />;
    //   case 11:
    //     return <AppSignatureCanvas {...ele} />;
    //   case 12:
    //     return <AppRangeField {...ele} />;
    //   case 13:
    //     return <AppPasswordField {...ele} />;
    //   case 19:
    //     return <AppRadioGroup {...ele} />;
    //   case 20:
    //     return <AppInputMask {...ele} />;
    //   case 24:
    //     return <AppDateRangePicker {...ele} />;
    //   case 25:
    //     return <AppAutoCheckbox {...ele} />;
    //   case 26:
    //     return <AppCKEditor {...ele} />;
    //   case 28:
    //     return <AppDateAndTimePicker {...ele} />;
    //   case 29:
    //     return <AppTimePicker {...ele} />;
    //   case 30:
    //     return <AppSingleCheckbox {...ele} />;
      // case 27:
      //   return <AppFileUploadOld {...ele} />;
      default:
        return null;
    }
  }



export const header = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const executeScroll = (errors) => {
  const div = document.getElementById(Object.keys(errors)[0]);
  if (div) {
    window.scrollTo({
      top: div.offsetTop - 100,
      behavior: "smooth",
    });
  }
};
  

