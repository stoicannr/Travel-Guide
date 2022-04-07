import React from "react";
import axios from "axios";

const userService = {
  currentUser: null,
  request: null,
  loadCurrentUser: async () => {
    const response = new Promise(async (success) => {
      if (userService.currentUser) {
        success(userService.currentUser);
        return;
      }
      if (!userService.request) {
        userService.request = axios.get("/api/auth/user");
      }
      userService.request
        .then((response) => {
          userService.currentUser = response.data;
        })
        .catch((response) => {
          userService.currentUser = null;
        })
        .finally(() => {
          success(userService.currentUser);
        });
    });
    return response;
  },
};

export default userService;
