import React, { useState } from "react";
import {
  Container,
  Paper,
  Grid,
  Button,
  Avatar,
  Typography,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signin, signup } from "../../actions/auth";
import Input from "./Input.jsx";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Auth = () => {
  const classes = useStyles();
  const [userShowPassword, SetUserShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(null);
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    e.persist();
    setFormData((currentFormData) => ({
      ...currentFormData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleShowPassword = () => SetUserShowPassword((toggle) => !toggle);

  const switchPosition = () => {
    setIsSignUp((changeSignMode) => !changeSignMode);
    SetUserShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.token;

    try {
      dispatch({ type: "Auth", data: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (err) => {
    console.log("Unsuccessfully Google Sign In ");
  };

  return (
    <Container maxWidth="xs" component="main">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  half
                  autoFocus
                  validator={(value) => value.length > 2}
                  errorMessage="min 2 characters"
                />
                <Input
                  name="last Name"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                  autoFocus
                  validator={(value) => value.length > 2}
                  errorMessage="min 2 characters"
                />
              </>
            )}
            <Input
              name="email"
              label="Email"
              handleChange={handleChange}
              type="email"
              validator={(value) => /\w+@\w+\.\w+/.test(value)}
              errorMessage="it should be a valid email address"
            />
            <Input
              name="password"
              label="Password "
              handleChange={handleChange}
              type={userShowPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
              validator={(value) =>
                value.length >= 8 &&
                value.length <= 20 &&
                /\d/.test(value) &&
                /[a-zA-Z]/.test(value)
              }
              errorMessage="password should be 8-20 characters and include at least 1 letter,1 number and 1 special character!"
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Verified Password"
                handleChange={handleChange}
                type="password"
                validator={(value) => value === formData.password}
                errorMassage="password don't match"
              />
            )}
          </Grid>
          <Button
            className={classes.submit}
            variant="contained"
            type="submit"
            color="primary"
            fullWidth
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId="612821762030-40leou2t01brm5l84hb1p13r67hrfumr.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                fullWidth
                color="primary"
                variant="contained"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchPosition} style={{ color: "blue  " }}>
                {isSignUp
                  ? "Already have an Acoount?  Sign In"
                  : "Dont have an account?  Sign In "}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
