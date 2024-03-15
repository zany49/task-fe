const getPattern = (type) => {
  switch (type) {
    case 0:
      // only numbers like zipcode length 4 - 5
      return /\d{5}(-\d{4})?/;
    case 1:
      // for text and spaces
      return /^[a-zA-Z ]*$/;
    case 2:
      // only numbers and -
      return /^[0-9-]+$/;
    case 3:
      // only numbers and -)(
      return /^[0-9-)(]+$/;
    case 4:
      //only txt and num
      return /^[a-zA-Z0-9]*$/;
    case 5:
      //email
      return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    case 6:
      // only numbers
      return /^[0-9]+$/;
    case 7:
      return /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
    case 8:
      return /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;
    case 9:
      //only txt and num and space
      return /^[a-zA-Z0-9- ]*$/;
    case 10:
      //txt, num and special characters
      return /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\\/ -]*$/;
    case 11:
      //number and decimal value
      return /^[0-9]+(\.[0-9]+)?$/;
    case 12 :
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&+])[A-Za-z\d@$!%*?&+]{8,}$/
  }
};

export function validateFileType(name){
  var fileName = name.name;
  var filesize = name.size
  var idxDot = fileName.lastIndexOf(".") + 1;
  var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
 
  if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
      //TO DO
      if(filesize && filesize <= 5 * 1024 * 1024){
        return 200
      }else{
        return 401
      }
  }else{
      return 400
  }   
}

export const getValidateSchema = (arr) => {
  const obj = {};
  arr?.forEach((s, i) => {
    obj[s.name] = {};
    if (s.required) {
      obj[s.name] = {
        ...obj[s.name],
        presence: { allowEmpty: false, message: `^${s.label} can't be empty` },
      };
    }
    if (s.name === "sub") {
      s.fields.forEach((f, i) => {
        obj[f.name] = {};
        if (f.required) {
          obj[f.name] = {
            ...obj[f.name],
            presence: {
              allowEmpty: false,
              message: `^${f.label} can't be empty`,
            },
          };
        }
        if (f.type === 7) {
          obj[f.name] = { ...obj[f.name], email: true };
        }
        if (f.type === 4) {
          obj[f.name] = { ...obj[f.name], numericality: true };
        }
      });
    }
    if (s.constraints) {
      s.constraints.forEach((c, i) => {
        if (c.label === "equality") {
          obj[s.name] = {
            ...obj[s.name],
            equality: {
              attribute: c.value,
              message: "^Confirm password is not equal to password",
            },
          };
        }
        if (c.label === "greaterThan") {
          obj[s.name] = {
            ...obj[s.name],
            numericality: { onlyInteger: true, greaterThan: c.value },
          };
        }
        if (c.label === "pattern") {
          obj[s.name] = {
            ...obj[s.name],
            format: {
              pattern: getPattern(c.value),
              message:
                c.value === 3
                  ? `^${s.label} value is invalid only numbers and -`
                  : c.value === 4
                  ? `^${s.label} value is invalid only text and numbers`
                  : c.value === 6
                  ? `^${s.label} value is invalid only numbers`
                  : c.value === 7
                  ? `^${s.label} value is invalid only text`
                  : c.value === 8
                  ? `URL is invalid`
                  : c.value ===12 ? 'Invalid password'
                  : `^${s.label} value is invalid`,
            },
          };
        }
        if (c.label === "isUrl") {
          obj[s.name] = { ...obj[s.name], url: true };
        }
        if (c.label === "length") {
          if (Object.keys(c).includes("max")) {
            obj[s.name] = {
              ...obj[s.name],
              length: { minimum: c.min, maximum: c.max },
            };
          } else {
            obj[s.name] = { ...obj[s.name], length: { minimum: c.min } };
          }
        }
      });
    }
    if (s.type === 7) {
      obj[s.name] = { ...obj[s.name], email: true };
    }
    if (s.type === 4) {
      obj[s.name] = { ...obj[s.name], numericality: true };
    }
    if (s.type === 10) {
      if (s.required) {
        obj[s.name] = {
          ...obj[s.name],
          presence: {
            allowEmpty: false,
            message: "^Please accept this to proceed",
          },
        };
      }
    }
;
    // }
    if (s.type === 12) {
      if (s.required) {
        obj[s.name] = {
          ...obj[s.name],
          presence: {
            allowEmpty: false,
            message: `^${s.label} can't be empty`,
          },
        };

        obj[`${s.name}.${s.field1}`] = {
          ...obj[`${s.name}.${s.field1}`],
          presence: {
            allowEmpty: false,
          },
        };
        obj[`${s.name}.${s.field2}`] = {
          ...obj[`${s.name}.${s.field2}`],
          presence: {
            allowEmpty: false,
          },
        };
      }
    }
  });
  return obj;
};
