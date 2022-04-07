import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";

import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Redirect } from "react-router";
import { Formik, Form, useFormik } from "formik";
import * as yup from "yup";
import { login } from "../store/userSlice";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("E-mail is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password must be at least 5 characters long"),
  userType: yup.string().required("User type is required"),
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = () => {
  const classes = useStyles();
  const [user, setUser] = useState({
    email: "",
    password: "",
    firstName: "",
    userType: "",
  });
  const [redirect, setRedirect] = useState(false);
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      userType: parseInt(user.userType),
    },

    onSubmit: (values) => {
      axios.post("api/Auth/Login", values).then((response) => {
        setUser(response.data);
        dispatch(
          login({
            email: response.data.email,
            password: values.password,
            firstName: response.data.firstName,
            userType: response.data.userType,
            loggedIn: true,
          })
        );
      });
      setRedirect(true);
    },
  });

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <TextField
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            value={formik.values.email}
            onChange={formik.handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <TextField
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            value={formik.values.password}
            onChange={formik.handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default SignIn;
