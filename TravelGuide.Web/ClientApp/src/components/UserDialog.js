import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import React, { Component, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import axios from "axios";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Input } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import FaceIcon from "@material-ui/icons/Face";
import DoneIcon from "@material-ui/icons/Done";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    width: 200,
  },
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(0.5),
    },
  },
  button: {
    display: "block",
    marginTop: theme.spacing(2),
  },

  paper: {
    position: "absolute",
    height: 400,
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
}));

const UserDialog = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userType: "",
  });
  const [open, setOpen] = useState(false);
  const [userTypes, setUserTypes] = useState([]);

  const Type = {
    Admin: 1,
    User: 2,
  };

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);

  const submit = (e) => {
    const userToPost = {
      firstname: user.firstName,
      lastName: user.lastName,
      email: user.email,
      userType: parseInt(user.userType),
    };
    const url = user.id ? "api/User/UpdateUser/" : "api/User/AddUser";
    axios.post(url, user).then((response) => {
      if (!user.id) {
        props.closeCallback(response.data);
      } else {
        props.closeCallback(user);
      }
    });
  };
  const handleChange = (event) => {
    setUser(event.target.value);
  };
  const handleCloseSelect = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handle = (e) => {
    const newData = { ...user };
    newData[e.target.name] = e.target.value;
    setUser(newData);
  };

  const handleClose = () => {
    props.closeCallback();
  };

  return (
    <div>
      <Modal open={props.open} onClose={handleClose}>
        <div style={modalStyle} className={classes.paper}>
          <div>
            <div className="createForm">
              <form onSubmit={(e) => submit(e)}>
                <div id="outline">
                  <TextField
                    onChange={(e) => handle(e)}
                    name="firstName"
                    label="First Name"
                    value={user.firstName}
                    variant="outlined"
                  />
                </div>
                <div id="outline">
                  <TextField
                    onChange={(e) => handle(e)}
                    name="lastName"
                    label="Last Name"
                    value={user.lastName}
                    variant="outlined"
                  />
                </div>
                <div id="outline">
                  <TextField
                    onChange={(e) => handle(e)}
                    name="email"
                    label="Email"
                    value={user.email}
                    variant="outlined"
                  />
                </div>
                <div id="outline">
                  <div>
                    <FormControlLabel
                      label="Is admin"
                      control={
                        <Checkbox
                          checked={user.userType === Type.Admin}
                          onChange={(e) => {
                            setUser({
                              ...user,
                              userType: e.target.checked
                                ? Type.Admin
                                : Type.User,
                            });
                          }}
                          inputProps={{ "aria-label": "primary checkbox" }}
                        />
                      }
                    />

                  </div>
                </div>
                <Button variant="contained" color="primary" onClick={submit}>
                  {props.saveButtonLabel}
                </Button>
                <Button variant="contained" onClick={handleClose}>
                  Cancel
                </Button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserDialog;
