import axios from "axios";
import React, { useEffect, useState } from "react";
import { login } from "../store/userSlice";
import { useSelector } from "react-redux";
import UserService from "../services/UserService";

const Home = () => {
  const user = useSelector((s) => s.user.user?.firstName);

  return (
    <div>
      <h3>
        {user
          ? "Welcome, you are authenticated !"
          : "You are not authenticated !"}
      </h3>
    </div>
  );
};

export default Home;
