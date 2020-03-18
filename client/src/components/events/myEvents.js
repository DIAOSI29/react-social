import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import EventItem from "./EventItem";
import { getMyEvents } from "../../actions/event";
import { loadUser } from "../../actions/auth";

const MyEvents = ({ getMyEvents, loadUser, user, events, loading }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  useEffect(() => {
    getMyEvents(user._id), [getMyEvents];
  });

  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">My Hosted/Joined Events</h1>
      <p className="lead">
        <i className="fas fa-user" /> Take a look at all the events that has
        your footprint{" "}
      </p>

      <div className="events">
        {events.map(event => (
          <EventItem key={event._id} event={event} />
        ))}
      </div>
    </Fragment>
  );
};

MyEvents.propTypes = {
  loadUser: PropTypes.func.isRequired,
  getMyEvents: PropTypes.func,
  events: PropTypes.array,
  user: PropTypes.object,
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  events: state.event.events,
  loading: state.event.loading,
  user: state.auth.user
});

export default connect(mapStateToProps, { loadUser, getMyEvents })(MyEvents);
