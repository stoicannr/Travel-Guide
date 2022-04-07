import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

import { DataGrid, GridRowsProp, GridColDef } from "@material-ui/data-grid";
import LocationDialog from "./LocationDialog";
import "./modalStyle.css";

const Tag = {
  Hike: 1,
  Historical: 2,
  Cultural: 4,
  Magical: 8,
  Fotball: 16,
};

const LocationsGrid = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState({
    name: "",
    description: "",
    identifier: "",
    lat: 0,
    lng: 0,
  });

  const DeleteLocation = (id) => {
    axios.delete("api/Location/Delete/" + `${id}`).then((response) => {
      console.log(response);
    });
    handleRemove(id);
  };

  function handleRemove(id) {
    const newList = locations.filter((item) => item.id !== id);
    setLocations(newList);
  }

  useEffect(() => {
    axios.get("api/Location/GetAll").then((response) => {
      console.log(response.data);
      let temporaryLocations = response.data;
      temporaryLocations.forEach((location) => {
        convertFromStatusToString(location);
      });

      setLocations(temporaryLocations);
    });
  }, []);

  const convertFromStatusToString = (location) => {
    let name = "";
    for (let property in Tag) {
      if (location.tags & Tag[property]) {
        name += " " + property;
      }
      console.log(property);
    }

    if (!name) {
      name = "None";
    }
    location.tagName = name;
  };

  const columns = [
    { field: "id", headerName: "Id", width: 150 },
    { field: "name", headerName: "Name", width: 150 },
    { field: "description", headerName: "Description", width: 150 },
    { field: "tagName", headerName: "Tags", width: 150 },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (data) => (
        <Button
          id="deleteButtonLocation"
          color="primary"
          size="small"
          onClick={() => {
            setDialogOpen(true);
            setSelectedLocation(data.row);
          }}
        >
          Edit
        </Button>
      ),
    },
    {
      field: "Delete",
      headerName: "Delete",
      width: 150,
      renderCell: (data) => (
        <Button
          id="deleteButtonLocation"
          color="secondary"
          size="small"
          onClick={() => {
            console.log(1);
            DeleteLocation(data.id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const locationCloseCallback = (location) => {
    setDialogOpen(false);
    let shouldInsert = true;
    if (location) {
      const newLocations = locations.map((l) => {
        if (l.id === location.id) {
          shouldInsert = false;
          return location;
        }
        return l;
      });
      if (shouldInsert) {
        convertFromStatusToString(location);
        newLocations.push(location);
      }
      setLocations(newLocations);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        onClick={() => {
          setDialogOpen(true);
          setSelectedLocation({});
        }}
        id="createModalButton"
      >
        {"Add"}
      </Button>

      <div className="allLocations">
        <div style={{ height: 300, width: "100%" }}>
          <DataGrid rows={locations} columns={columns}></DataGrid>
        </div>
      </div>
      <LocationDialog
        open={dialogOpen}
        location={selectedLocation}
        saveButtonLabel={selectedLocation?.id ? "Save" : "Add"}
        closeCallback={locationCloseCallback}
      ></LocationDialog>
    </>
  );
};

export default LocationsGrid;
