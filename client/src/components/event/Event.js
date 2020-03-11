import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import EventItem from "../events/EventItem";
import CommentForm from "../event/CommentForm";
import CommentItem from "../event/CommentItem";
import { getEvent } from "../../actions/event";

const Event = ({ getEvent, event: { event, loading }, match }) => {
  useEffect(() => {
    getEvent(match.params.id);
  }, [getEvent, match.params.id]);

  return loading || event === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/events" className="btn">
        Back To Events
      </Link>
      <EventItem event={event} showActions={false} />
      <CommentForm eventId={event._id} />
      <div className="comments">
        {event.comments.map(comment => (
          <CommentItem
            key={comment._id}
            comment={comment}
            eventId={event._id}
          />
        ))}
      </div>
    </Fragment>
  );
};

Event.propTypes = {
  getEvent: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  event: state.event
});

export default connect(mapStateToProps, { getEvent })(Event);
