import React, { useState, useCallback } from "react";
import { Grid, TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Input = ({
  half,
  handleChange,
  handleShowPassword,
  name,
  label,
  autoFocus,
  type,
  errorMessage,
  validator,
}) => {
  const [showError, setShowError] = useState(false);

  const onChange = useCallback(
    (e) => {
      handleChange(e);

      if (typeof validator === "function") {
        e.persist();
        setShowError(!validator(e.target.value));
      }
    },
    [handleChange, validator]
  );

  return (
    <>
      <Grid item xs={12} sm={half ? 6 : 12}>
        <TextField
          name={name}
          label={label}
          onChange={onChange}
          fullWidth
          required
          helperText={showError && errorMessage}
          variant="outlined"
          autoFocus={autoFocus}
          type={type}
          InputProps={
            name === "password"
              ? {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {type === "password " ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }
              : null
          }
        />
        {/* style={{ color: "red" }} variant="h6" align="center" */}
        {/* <Box
          sx={{
            color: "red",
            textAlign: "center",
            required: "true",
          }}
        >
          {errorMessage}
        </Box> */}
      </Grid>
    </>
  );
};

export default Input;
