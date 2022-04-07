import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";
import { useDispatch } from "react-redux";
import { Route } from "react-router";
import { Layout } from "./components/Layout";
import Users from "./components/IndexUsers";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import TravelGuideMap from "./components/TravelGuideMap";
import LocationsGrid from "./components/LocationsGrid";
import Home from "./components/Home";
import Header from "./components/Header";
import { useSelector } from "react-redux";
import UserService from ".//services/UserService";
import axios from "axios";
import { setUser } from "./store/userSlice";

const App = () => {
  const LoggedUser = useSelector((state) => state.user.user?.firstName);
  const dispatch = useDispatch();

  useEffect(() => {
    UserService.loadCurrentUser().then((response) => {
      dispatch(setUser(response));
    });
  }, []);

  return (
    <div>
      <Layout>
        <Route path="/" exact component={() => <Home />} />
        <Route path="/SignIn" component={SignIn} />
        <Route path="/Register" component={Register} />
        {LoggedUser ? (
          <>
            <Route exact path="/user" component={Users} />
            <Route exact path="/LocationsGrid" component={LocationsGrid} />
          </>
        ) : (
          ""
        )}
      </Layout>
      <Route exact path="/GoogleMaps" component={TravelGuideMap} />
    </div>
    // <Layout>

    //   <Route path="/" exact component={() => <Home />} />
    //   <Route path="/SignIn" component={SignIn} />
    //   <Route path="/Register" component={Register} />
    //   {LoggedUser ? (
    //     <>
    //       <Route exact path="/user" component={Users} />
    //       <Route exact path="/LocationsGrid" component={LocationsGrid} />
    //     </>
    //   ) : (
    //     ""
    //   )}

    //   <Route exact path="/GoogleMaps" component={TravelGuideMap} />
    // </Layout>
  );
};

export default App;
