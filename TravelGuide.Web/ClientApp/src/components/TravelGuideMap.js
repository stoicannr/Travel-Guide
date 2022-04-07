import React, { useCallback, useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import "./googleM.css";
import LocationDialog from "./LocationDialog";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import NavigationIcon from "@material-ui/icons/Navigation";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import _debounce from "debounce";
import { useDebouncedCallback } from "use-debounce";
import { setLocations } from "../store/locationSlice";
import { useDispatch, connect } from "react-redux";
import store from "../store/store";
import Chip from "@material-ui/core/Chip";
import { View, TouchableOpacity, Text, StyleSheet } from "react";
import Carousel from "react-elastic-carousel"
import CarouselCard from "./CarouselCard"

import { setMyCurrentLocation } from "../store/myCurrentLocationSlice";
import { Box } from "@material-ui/core";

const Tag = {
  Hike: 1,
  Historical: 2,
  Cultural: 4,
  Magical: 8,
  Fotball: 16,
};

const containerStyle = {
  width: "66.6vw",
  height: "93.8vh",
};

const navigatorStyle = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));

const useStylesList = makeStyles((theme) => ({
  root: {
    width: "100%",
    padding: 2,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));



const TravelGuideMap = () => {
  const navigatorClass = navigatorStyle();
  const listClasses = useStylesList();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyD3xtHv7R7fneLkOqaHdN6A8Wg3q09EFWM",
  });
  TravelGuideMap.displayName = "TravelGuideMap";
  const [dialogOpen, setDialogOpen] = useState(false);
  const [points, setPoints] = useState([]);
  const [marker, setMarker] = useState({});
  const [activateMarker, setActiveMarker] = useState(false);
  const [displayAdd, setDisplayAdd] = useState(false);
  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState({});
  const [selectedMarker, setSelectedMarker] = useState({ lat: 0, lng: 0 });
  const dispatch = useDispatch();


  const convertFromStatusToString = (location) => {
    let names = [];
    for (let property in Tag) {
      if (location.tags & Tag[property]) {
        names.push(property);
      }
      console.log(property);
    }
    location.tagNames = names;
    console.log(location.tagNames);
    debugger;
  };

  const fetchLocations = useDebouncedCallback(() => {
    if (map) {
      let bounds = map.getBounds();
      window.bounds = bounds;
      axios
        .post("api/Location/GetBoundedLocation", bounds.toJSON())
        .then((response) => {
          let temporaryLocations = response.data;
          temporaryLocations.forEach((location) => {
            convertFromStatusToString(location);
          });
          dispatch(setLocations(temporaryLocations));
          console.log(temporaryLocations);
          debugger;
          setPoints(store.getState().locations.locations);
          console.log(store.getState().locations.locations);
          console.log(store.getState().myCurrentLocation.myLocation);
        });
    }
  }, 1500);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const myLocation = { lat: 0, lng: 0 };
      myLocation.lat = position.coords.latitude;
      myLocation.lng = position.coords.longitude;
      dispatch(setMyCurrentLocation(myLocation));
      setCurrentLocation(myLocation)
    });
  }, []);



  const handleCreateLocation = () => {
    setDialogOpen(true);
    console.log(marker);
  };

  const handleMarker = () => {
    setActiveMarker((current) => !current);
    setDisplayAdd((current) => !current);
    setMarker(null);
  };

  const locationCloseCallback = () => {
    setDialogOpen(false);
  };

  const locationSubmitCallback = (location) => {
    const newPoints = [...points];
    newPoints.push(location);
    setPoints(newPoints);
  };

  const onMapClick = useCallback((event) => {
    setMarker({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      indentifier: event.latLng.lat() + event.latLng.lng(),
    });
    setSelectedMarker(null)
  });

  const options = {
    disableDefaultUI: true,
  };

  return isLoaded && currentLocation ? (
    <Grid container>
      <Grid item xs={4} sx={{ p: 5 }}>
        <Box>
          {points.map((point) => (
            <List className={listClasses.root} >

              <ListItem alignItems="flex-start">
                <img
                  alt="Qries"
                  src={point?.pictureDTOs[0]?.path}
                  id="profileImage"
                />
                <ListItemText
                  secondary={
                    <Box>
                      <Box display="flex" textAlign="center" justifyContent="flex-start" m={2} p={1} ml={6} bgcolor="background.paper"
                        component="span"
                        variant="body2"
                        className={listClasses.inline}
                        color="textPrimary"
                        style={{
                          fontSize: "30px",
                          fontFamily: "cursive",
                          fontStyle: "inherit",
                          color: "gray"
                        }}>
                        {point.name}
                      </Box>

                      <Box display="flex" justifyContent="flex-start" m={1} p={1} bgcolor="background.paper">

                        <Box p={1}>
                          {point.tagNames.map((tagName) => (
                            < Chip
                              variant="outlined"
                              label={tagName}
                              color="primary"
                              key={tagName}
                              style={{ marginLeft: 5, marginTop: 3 }}
                            >
                              {tagName}
                            </Chip>
                          ))
                          }
                        </Box>

                      </Box>

                    </Box>
                  }
                />
              </ListItem>
              <Divider style={{ marginTop: 5, marginLeft: 10, marginRight: 10 }} />
            </List>
          ))}
        </Box>

      </Grid>

      <Grid item xs={7}>
        <div className={navigatorClass.root}>
          <Fab
            style={{ display: displayAdd ? "block" : "none" }}
            size="large"
            onClick={activateMarker ? handleCreateLocation : () => { }}
            id="addNavigatorButton"
            color="primary"
            aria-label="add"
          >
            <AddIcon />
          </Fab>

          <Fab
            style={{ display: activateMarker ? "none" : "block" }}
            size="large"
            onClick={(activateMarker) => handleMarker(activateMarker)}
            id="editNavigatorButton"
            color="secondary"
            aria-label="edit"
          >
            <EditIcon />
          </Fab>

          <Fab
            id="navigate"
            variant="extended"
            style={{ display: activateMarker ? "block" : "none" }}
            onClick={(activateMarker) => handleMarker(activateMarker)}
          >
            <NavigationIcon className={navigatorClass.extendedIcon} />
            Navigate
          </Fab>
        </div>
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={10}
          center={currentLocation}
          options={options}
          onClick={onMapClick}
          onBoundsChanged={fetchLocations}
          onLoad={(map) => {
            setMap(map);
          }}
        >
          {activateMarker ? (
            <Marker
              key={marker?.lat + marker?.lng}
              position={{ lat: marker?.lat, lng: marker?.lng }}
            />
          ) : null}
          {points.map((point) => (
            <Marker
              key={point.lat + point.lng}
              position={{ lat: point.lat, lng: point.lng }}
              icon={{
                url: "aiga-departures-bg.svg",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
              onClick={() => setSelectedMarker({ lat: point.lat, lng: point.lng, name: point.name, description: point.description })}
            />
          ))}
          {
            (!activateMarker && selectedMarker) ? (
              <InfoWindow
                position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
                onCloseClick={() => {
                  setSelectedMarker(null);
                }}
              >

                <div>
                  <div>
                    <Carousel>
                      {/* Here it is. You have clicked.{selectedMarker.lat}=={selectedMarker.lng}=={selectedMarker.name}=={selectedMarker.description} */}
                      <CarouselCard>

                      </CarouselCard>
                      <CarouselCard name="name1">

                      </CarouselCard>
                      <CarouselCard name={"name2"}>

                      </CarouselCard>
                    </Carousel>
                  </div>
                  <div>
                    <button>
                      Click me
                </button>
                  </div>
                </div>
              </InfoWindow>
            ) : null}
        </GoogleMap>
        <LocationDialog
          open={dialogOpen}
          closeCallback={locationCloseCallback}
          saveButtonLabel={"Add"}
          location={marker}
          locationSubmitCallback={locationSubmitCallback}
        ></LocationDialog>
      </Grid>
    </Grid>
  ) : (
    <></>
  );
};

export default TravelGuideMap;


