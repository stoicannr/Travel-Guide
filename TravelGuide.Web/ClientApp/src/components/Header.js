import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import GoogleLogin from "react-google-login";
import { GoogleLogout } from "react-google-login";
import { useHistory } from "react-router-dom";
import { withRouter } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import axios from "axios";

import { logout } from "../store/userSlice";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  btnList: {
    display: "flex",
    flex: "1",
    justifyContent: "flex-end",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
    },
    marginLeft: theme.spacing(10),
  },
}));

const Header = (props) => {
  const history = useHistory();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const LoggedUser = useSelector((state) => state.user.user?.firstName);
  const LoggedUserUserType = useSelector((state) => state.user.user?.userType);
  const [redirect, setRedirect] = useState(false);
  const [showLoginButton, setShowLoginButton] = useState(true);
  const [showLogoutButton, setShowLogoutButton] = useState(false);
  const clientId =
    "202742736871-bl4h2tlh1jb64kv8o5ivobpfbgqie3ah.apps.googleusercontent.com";

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (pageURL) => {
    history.push(pageURL);
    setAnchorEl(null);
  };

  const handleButtonClick = (pageURL) => {
    history.push(pageURL);
  };

  const menuItems = [
    {
      menuTitle: "Home",
      pageURL: "/",
    },
    {
      menuTitle: "Login",
      pageURL: "/SignIn",
    },
    {
      menuTitle: "Register",
      pageURL: "/Register",
    },
    {
      menuTitle: "Maps",
      pageURL: "/GoogleMaps",
    },
    {
      menuTitle: "Users",
      pageURL: "/user",
    },
    {
      menuTitle: "Locations",
      pageURL: "/LocationsGrid",
    },
  ];
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.post("api/auth/logout").then((response) => {
      dispatch(logout());
      history.push("/");
    });
  };

  const onLoginSuccess = (res) => {
    console.log("Login success: ", res.profileObj);
    setShowLoginButton(false);
    setShowLogoutButton(true);
  };

  const onLoginFailure = (res) => {
    console.log("Login failed: ", res);
    setShowLoginButton(true);
    setShowLogoutButton(false);
  };

  const onSignOutSuccess = () => {
    alert("You've been logged out !");
    setShowLoginButton(true);
    setShowLogoutButton(false);
    console.clear();
  };

  const isLogged = useSelector((state) => state.isLogged);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Travel guide
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuItems.map((menuItem) => {
                  const { menuTitle, pageURL } = menuItem;
                  return (
                    <MenuItem onClick={() => handleMenuClick(pageURL)}>
                      {menuTitle}
                    </MenuItem>
                  );
                })}
              </Menu>
            </>
          ) : (
            <List className={classes.btnList}>
              {showLoginButton ? (
                <GoogleLogin
                  clientId={clientId}
                  buttonText="Login"
                  onSuccess={onLoginSuccess}
                  onFailure={onLoginFailure}
                  isSignedIn={true}
                  cookiePolicy={"single_host_origin"}
                />
              ) : null}
              {showLogoutButton ? (
                <GoogleLogout
                  clientId={clientId}
                  buttonText="Logout"
                  onLogoutSuccess={onSignOutSuccess}
                />
              ) : null}

              <Button
                color="inherit"
                onClick={() => handleButtonClick("/GoogleMaps")}
              >
                Maps
              </Button>

              {!LoggedUser ? (
                <>
                  <Button
                    color="inherit"
                    onClick={() => handleButtonClick("/SignIn")}
                  >
                    Sign In
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleButtonClick("/Register")}
                  >
                    Sign Up
                  </Button>
                </>
              ) : LoggedUserUserType === 2 ? (
                <>
                  <Button
                    color="inherit"
                    onClick={() => handleButtonClick("/LocationsGrid")}
                  >
                    Locations
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    Welcome {LoggedUser}, LOGOUT
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="inherit"
                    onClick={() => handleButtonClick("/LocationsGrid")}
                  >
                    Locations
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => handleButtonClick("/user")}
                  >
                    Users
                  </Button>
                  <Button color="inherit" onClick={handleLogout}>
                    Welcome {LoggedUser}, LOGOUT
                  </Button>
                </>
              )}
            </List>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withRouter(Header);
