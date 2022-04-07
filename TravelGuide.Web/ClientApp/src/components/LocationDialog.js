import { makeStyles, useTheme } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import React, { Component, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./modalStyle.css";
import axios from "axios";
import Chip from "@material-ui/core/Chip";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import ButtonGroup from "@material-ui/core/ButtonGroup";

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
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    textAlign: "center",
  },
}));

const Tag = {
  Hike: 1,
  Historical: 2,
  Cultural: 4,
  Magical: 8,
  Fotball: 16,
};

const LocationDialog = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [location, setLocation] = useState({
    name: "",
    description: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);

  const classesUploadPhoto = useStyles();
  const onFileChange = (event) => {
    event.preventDefault();
    setSelectedFile(event.target.files[0]);

    console.log(event.target.files[0]);
  };


  useEffect(() => {
    if (props.location?.name) {
      setLocation(props.location);
    }
    if (props.location?.lat) {
      setLocation(props.location);
    }
  }, [props.location]);

  const submit = () => {
    let responseLocation
    const url = location.id
      ? "api/Location/Update/"
      : "api/Location/CreateLocation";
    console.log(location);
    axios.post(url, location).then((response) => {
      const formData = new FormData();
      let locationId = response.data.id;
      console.log(response.data);
      formData.append("formFile", selectedFile);
      formData.append("LocationId", locationId);
      formData.append("name", response.data.name + "profilePhoto");
      fetch("/api/Location/UploadImage", {
        body: formData,
        method: "POST",
      }).then((imgResponse) => {
        let locationCreated = response.data;
        locationCreated.pictureDTOs[0] = imgResponse.data;
        props.locationSubmitCallback(locationCreated);
      });
      if (!location.id) {
        console.log(response.data);
        props.closeCallback(response.data);
        selectedFile.locationId = response.data.id;
        responseLocation = response.data;
      } else {
        console.log(response.data);
        props.closeCallback(location);
      }
    });

  };
  const handle = (e) => {
    const newData = { ...location };
    newData[e.target.name] = e.target.value;
    setLocation(newData);
    console.log(newData);
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
              <form>
                <div>
                  <div>
                    {Object.getOwnPropertyNames(Tag).map((tagName) => (
                      <Chip
                        variant="outlined"
                        color={
                          location.tags & Tag[tagName] ? "primary" : "default"
                        }
                        key={Tag[tagName]}
                        label={tagName}
                        className={"selected"}
                        onClick={() => {
                          setLocation({
                            ...location,
                            tags: location.tags ^ Tag[tagName],
                          });
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div id="outline">
                  <TextField
                    onChange={(e) => handle(e)}
                    name="name"
                    label="Name"
                    value={location.name}
                    variant="outlined"
                  />
                </div>
                <div id="outline">
                  <TextField
                    onChange={(e) => handle(e)}
                    name="description"
                    label="Description"
                    value={location.description}
                    variant="outlined"
                  />
                </div>
                <div className={classesUploadPhoto.root}>
                  <input
                    style={{ display: "none" }}
                    accept="image/*"
                    className={classesUploadPhoto.input}
                    id="icon-button-file"
                    type="file"
                    onChange={onFileChange}
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera />
                    </IconButton>
                  </label>
                </div>
                <ButtonGroup
                  disableElevation
                  variant="contained"
                  color="primary"
                >
                  <Button variant="contained" color="primary" onClick={submit}>
                    {props.saveButtonLabel}
                  </Button>{" "}
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>{" "}
                </ButtonGroup>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LocationDialog;
