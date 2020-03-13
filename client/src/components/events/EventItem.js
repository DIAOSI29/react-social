import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addJoin, removeJoin, deleteEvent } from "../../actions/event";

//material UI
// import { makeStyles } from "@material-ui/core/styles";
// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/ßcore/CardContent";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";

// const useStyles = makeStyles({
//   root: {
//     minWidth: 275
//   },
//   bullet: {
//     display: "inline-block",
//     margin: "0 2px",
//     transform: "scale(0.8)"
//   },
//   title: {
//     fontSize: 14
//   },
//   pos: {
//     marginBottom: 12
//   }
// });

const EventItem = ({
  addJoin,
  removeJoin,
  deleteEvent,
  auth,
  event: {
    _id,
    about,
    maxnumber,
    avatar,
    hour,
    minute,
    eventdate,
    location,
    user,
    name,
    joins,
    comments,
    date
  },
  showActions
}) => (
  <div className="event bg-eventItem p-1 my-1">
    <div>
      <Link to={`/profile/${user}`}>
        <img className="round-img" src={avatar} alt="" />
        <h4>{name}</h4>
      </Link>
    </div>
    <div>
      <span className="event-detail-box red">
        <p className="event-detail">
          <span className="blackText">
            Host: {"     "}
            {name}
          </span>
        </p>
      </span>
      <span className="event-detail-box red">
        <p className="event-detail">
          <span className="redText">
            Location: {"     "}
            {location}
          </span>
        </p>{" "}
      </span>
      <span className="event-detail-box red">
        <p className="event-detail">
          <span className="greenText">
            Date: {"     "}
            {eventdate}
          </span>
        </p>{" "}
      </span>
      <span className="event-detail-box red">
        <p className="event-detail">
          <span className="yellowText">
            {"  "}Time: {"     "}
            {hour}:{minute}{" "}
          </span>
        </p>{" "}
      </span>
      <span className="event-detail-box red">
        {" "}
        <p className="event-detail">
          <span className="blueText">
            {" "}
            Context: {"     "}
            {about}
            {"  "}
          </span>
        </p>{" "}
      </span>
      <span className="event-detail-box red">
        <p className="event-detail">
          <span className="orangeText">
            {" "}
            Event size: {"     "}
            {maxnumber}
          </span>
        </p>{" "}
      </span>

      <span className="event-detail-box red">
        {" "}
        <p className="event-detail">
          <span className="pinkText">
            {" "}
            Event created on: {"     "}
            <Moment format="YYYY/MM/DD">{date}</Moment>
          </span>
        </p>{" "}
      </span>
      <br></br>
      {showActions && (
        <Fragment>
          <button
            onClick={() => addJoin(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-user-plus"></i>{" "}
            <span>{joins.length > 0 && <span>{joins.length}</span>}</span>
          </button>
          <button
            onClick={() => removeJoin(_id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-door-open" />
          </button>
          <Link to={`/events/${_id}`} className="btn btn-primary">
            Discussion{" "}
            {comments.length > 0 && (
              <span className="comment-count">{comments.length}</span>
            )}
          </Link>
          {!auth.loading && user === auth.user._id && (
            <div>
              <button
                onClick={() => deleteEvent(_id)}
                type="button"
                className="btn btn-danger"
              >
                <i className="fas fa-times" />
              </button>
              <div className="events">
                {joins.map(join => (
                  <div>
                    {join.name}:{join.mobile}
                  </div>
                ))}
              </div>
            </div>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

EventItem.defaultProps = {
  showActions: true
};

EventItem.propTypes = {
  event: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addJoin: PropTypes.func.isRequired,
  removeJoin: PropTypes.func.isRequired,
  deleteEvent: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addJoin, removeJoin, deleteEvent })(
  EventItem
);
