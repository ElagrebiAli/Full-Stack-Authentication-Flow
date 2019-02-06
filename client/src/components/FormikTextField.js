import React from "react";
import TextField from "@material-ui/core/TextField";
//import TextField from "./TextField";

const MaterialInput = ({
  field: { /* value, */ ...fields },
  form: { touched, errors },
  ...props /*label*/ 
}) => {
  return (
    <TextField
      {...props}
      {...fields}
      error={Boolean(touched[fields.name] && errors[fields.name])}
      helperText={touched[fields.name] && errors[fields.name]}
    />
  );
};

export default MaterialInput;
