import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import EventItem from "./EventItem";
import { getMyEvents } from "../../actions/event";

const myEvents = ({
  // getMyEvents, user,
  events: { events, loading }
}) => {
  // useEffect(() => {
  //   getMyEvents(user);
  // }, []);

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

myEvents.propTypes = {
  // loadUser: PropTypes.func.isRequired,
  getMyEvents: PropTypes.func.isRequired,
  events: PropTypes.array.isRequired,
  user: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  events: state.events,
  user: state.auth.user
});

export default connect(mapStateToProps, { getMyEvents })(myEvents);
