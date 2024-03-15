import _ from "lodash";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ImgAttach from "../assests/Get Started/Vectorattach.png";


export const AppTextField = ({
  name,
  label,
  values,
  placeholder,
  required,
  handleChange,
  errors,
  disabled,
  hideLabel,
  ...props
}) => {
  const useStyles = makeStyles({
    customTextField: {
      "& input::lable": {
        fontSize: "10px",
      },
    },
  });
  const classes = useStyles();

  return (
    <>

      <TextField
        id="outlined-basic"
        label={label}
        variant="outlined"
        name={name}
        value={_.get(values, name)}
        onChange={handleChange}
        fullWidth
        classes={{ root: classes.customTextField }}
        inputProps={{
          style: {
            height: "10px",
          },
        }}
        InputLabelProps={{
          style: {
            fontSize: 12,
          },
        }}
        disabled={disabled}
      />
      <div className="text-danger error_txt" id={name}>
        {errors && errors && errors[name]?.map((err) => err).join(",")}
      </div>

    </>
  );
};

//type2

export const AppSelect = ({
  values,
  options,
  placeholder,
  label,
  name,
  required,
  errors,
  handleChange,
  disabled,
  hideLabel,
}) => (
  <>

    <TextField
      id="outlined-select-currency"
      select
      label={label}
      name={name}
      defaultValue={values[name]}
      fullWidth
      inputProps={{
        style: {
          height: "10px",
        },
      }}
      InputLabelProps={{
        style: {
          fontSize: 12,
        },
      }}
      // helperText={placeholder}
      onChange={(e) => handleChange({ name, value: e.target.value })}
      disabled={disabled}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
    <div className="text-danger error_txt" id={name}>
      {errors && errors && errors[name]?.map((err) => err).join(",")}
    </div>

  </>
);

export const AppImageUpload1 = ({
  values,
  options,
  placeholder,
  label,
  name,
  className,
  required,
  accept,
  errors,
  handleChange,
  disabled,
  hideLabel,
}) => {

  return (
    <>
      <label for="file-upload" className={className} onChange={handleChange}>
        <img src={ImgAttach} onChange={handleChange} />
      </label>
      <input
        id="file-upload"
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={disabled}
      />
      <div className="file-upload-div">
        <TextField
          id="outlined-basic"
          label={label}
          variant="outlined"
          name={name}
          value={values}
          onChange={handleChange}
          fullWidth
          className="file-upload-input"
          inputProps={{
            style: {
              height: "10px",
            },
          }}
          InputLabelProps={{
            style: {
              fontSize: 12,
            },
          }}
          disabled={disabled}
        />
        <div className="text-danger error_txt" id={name}>
          {errors && errors && errors[name]?.map((err) => err).join(",")}
        </div>
      </div>
    </>
  );
};
