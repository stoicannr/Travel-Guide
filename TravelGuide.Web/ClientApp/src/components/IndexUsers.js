import React, { Component, useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridRowsProp, GridColDef } from "@material-ui/data-grid";
import Button from "@material-ui/core/Button";
import UserDialog from "./UserDialog";
import Register from "./Register";

const Tag = {
  Admin: 1,
  User: 2,
};


const GetUsers = () => {
  const [users, setUsers] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    userType: "",
  });

  useEffect(() => {
    if (!dialogOpen) {
      axios
        .get("/api/User/GetUsers")
        .then((response) => {
          const tempArray = response.data;
          tempArray.forEach((u) => {
            convertFromStatusToString(u);
          });
          setUsers(response.data);
        })
        .catch((err) => {
        });
    }
  }, [dialogOpen]);

  const DeleteUser = (id) => {
    axios.delete("api/User/Delete/" + `${id}`).then((response) => {
    });
    handleRemove(id);
  };

  function handleRemove(id) {
    const newList = users.filter((item) => item.id !== id);
    setUsers(newList);
  }

  const convertFromStatusToString = (user) => {
    let name = "";
    for (let property in Tag) {
      if (user.userType & Tag[property]) {
        name += " " + property;
      }
    }
    if (!name) {
      name = "None";
    }
    user.tagName = name;
  };

  const columns = [
    { field: "id", headerName: "User id", width: 150 },
    { field: "email", headerName: "User email", width: 150 },
    { field: "firstName", headerName: "User firstName", width: 150 },
    { field: "lastName", headerName: "User lastName", width: 150 },
    { field: "tagName", headerName: "User Type", width: 150 },
    {
      field: "edit",
      headerName: "Edit",
      width: 150,
      renderCell: (data) => (
        <Button
          id="editUser"
          color="primary"
          size="small"
          onClick={() => {
            setDialogOpen(true);
            setSelectedUser(data.row);
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
          id="deleteUser"
          color="secondary"
          size="small"
          onClick={() => {
            DeleteUser(data.id);
          }}
        >
          Delete
        </Button>
      ),
    },
  ];

  const userCloseCallBack = (user) => {
    setDialogOpen(false);
    let insertFlag = true;
    if (user) {
      const newUsers = users.map((u) => {
        if (u.id === user.id) {
          insertFlag = false;
          return user;
        }
        return u;
      });
      if (insertFlag) {
        convertFromStatusToString(user);
        newUsers.push(user);
      }

      setUsers(newUsers);
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
          setSelectedUser({
            firstName: "",
            lastName: "",
            email: "",
            userType: "",
          });
        }}
        id="createModalButton"
      >
        Add
      </Button>
      <div style={{ height: 300, width: "100%" }}>
        <DataGrid rows={users} columns={columns}></DataGrid>
      </div>
      <UserDialog
        open={dialogOpen}
        user={selectedUser}
        saveButtonLabel={selectedUser?.id ? "Save" : "Add"}
        closeCallback={userCloseCallBack}
      ></UserDialog>
    </>
  );
};

export default GetUsers;
