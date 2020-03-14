import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createEvent } from "../../actions/event";
import { getCurrentProfile } from "../../actions/profile";

const CreateEvent = ({ createEvent, profile: { profile } }) => {
  const name = profile.user.name;
  const avatar = profile.user.avatar;
  const [formData, setFormData] = useState({
    location: "",
    eventdate: "",
    hour: "",
    minute: "",
    about: "",
    maxnumber: ""
  });

  const { location, eventdate, hour, minute, about, maxnumber } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    createEvent({
      location,
      eventdate,
      hour,
      minute,
      about,
      maxnumber,
      name,
      avatar
    });
    setFormData({
      location: "",
      eventdate: "",
      hour: "",
      minute: "",
      about: "",
      maxnumber: ""
    });
  };

  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return (
    <Fragment>
      <h1 className="large text-primary">Host Yourself</h1>
      <p className="lead">
        <i className="fas fa-user" /> Tell others what hangout you have in mind
      </p>

      <h3>Please fill all fields</h3>

      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Event date"
            name="eventdate"
            value={eventdate}
            onChange={onChange}
          />
          <small className="form-text">Please set date for the hangout</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={onChange}
          />
          <small className="form-text">Set location</small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Please set the hour (01-24)"
            name="hour"
            value={hour}
            onChange={onChange}
          />
          <small className="form-text">Set time --- hour</small>
          <p>:</p>

          <input
            type="text"
            placeholder="Please set the minute (01-60) "
            name="minute"
            value={minute}
            onChange={onChange}
          />
          <small className="form-text">Set time --- minute</small>
        </div>

        <div className="form-group">
          <textarea
            placeholder="Whis is this event all about"
            name="about"
            value={about}
            onChange={onChange}
          />
          <small className="form-text">A brief description of your idea </small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Max size for this event"
            name="maxnumber"
            value={maxnumber}
            onChange={onChange}
          />
          <small className="form-text">Set a limit of participants</small>
        </div>

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

CreateEvent.propTypes = {
  createEvent: PropTypes.func.isRequired,

  event: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  profile: state.profile
});
export default connect(mapStateToProps, { createEvent, getCurrentProfile })(
  CreateEvent
);
