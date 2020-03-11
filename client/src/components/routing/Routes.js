import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "../auth/Register";
import Login from "../auth/Login";
import Alert from "../layout/Alert";
import Dashboard from "../dashboard/Dashboard";
import CreateProfile from "../profile-forms/CreateProfile";
import EditProfile from "../profile-forms/EditProfile";
import CreateEvent from "../event-forms/CreateEvent";
import EditEvent from "../event-forms/EditEvent.js";
import Profile from "../profile/Profile";
import Events from "../events/events";
import Event from "../event/Event";
import NotFound from "../layout/NotFound";
import PrivateRoute from "./PrivateRoute";
import myEvents from "../events/myEvents";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />

        <Route exact path="/profile/:id" component={Profile} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/create-event" component={CreateEvent} />
        <PrivateRoute exact path="/edit-event" component={EditEvent} />
        <PrivateRoute exact path="/events" component={Events} />
        <PrivateRoute exact path="/events/me" component={myEvents} />
        <PrivateRoute exact path="/events/:id" component={Event} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
