import axios from "axios";
import { setAlert } from "./alert";
import {
  GET_EVENTS,
  GET_MY_EVENTS,
  EVENT_ERROR,
  UPDATE_JOINS,
  DELETE_EVENT,
  ADD_EVENT,
  GET_EVENT,
  ADD_COMMENT,
  REMOVE_COMMENT
} from "./types";

export const createEvent = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await axios.post("/api/events", formData, config);

    dispatch({
      type: ADD_EVENT,
      payload: res.data
    });

    dispatch(setAlert(edit ? "Event Updated" : "Event Created", "success"));

    if (!edit) {
      history.push("/dashboard");
    }
  } catch (err) {
    dispatch(setAlert(err.msg, "danger"));

    // const errors = err.response;

    // if (errors) {
    //   errors.forEach(error => dispatch(setAlert(error, "danger")));
    // }

    // dispatch({
    //   type: EVENT_ERROR,
    //   payload: { msg: err.response.statusText, status: err.response.status }
    // });
  }
};

// Get events
export const getEvents = () => async dispatch => {
  try {
    const res = await axios.get("/api/events");

    dispatch({
      type: GET_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get my events
export const getMyEvents = id => async dispatch => {
  try {
    const res = await axios.get(`/api/events/me/${id}`);

    dispatch({
      type: GET_MY_EVENTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add join
export const addJoin = id => async dispatch => {
  try {
    const res = await axios.put(`/api/events/join/${id}`);

    dispatch({
      type: UPDATE_JOINS,
      payload: { id, joins: res.data }
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Remove join
export const removeJoin = id => async dispatch => {
  try {
    const res = await axios.put(`/api/events/unjoin/${id}`);

    dispatch({
      type: UPDATE_JOINS,
      payload: { id, joins: res.data }
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete event

export const deleteEvent = id => async dispatch => {
  try {
    await axios.delete(`/api/events/${id}`);

    dispatch({
      type: DELETE_EVENT,
      payload: id
    });

    dispatch(setAlert("Event Removed", "success"));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add event
export const addEvent = formData => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post("/api/events", formData, config);

    dispatch({
      type: ADD_EVENT,
      payload: res.data
    });

    dispatch(setAlert("Event Created", "success"));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Get event
export const getEvent = id => async dispatch => {
  try {
    const res = await axios.get(`/api/events/${id}`);

    dispatch({
      type: GET_EVENT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add comment
export const addComment = (eventId, formData) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  try {
    const res = await axios.post(
      `/api/events/comment/${eventId}`,
      formData,
      config
    );

    dispatch({
      type: ADD_COMMENT,
      payload: res.data
    });

    dispatch(setAlert("Comment Added", "success"));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Delete comment
export const deleteComment = (eventId, commentId) => async dispatch => {
  try {
    await axios.delete(`/api/events/comment/${eventId}/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert("Comment Removed", "success"));
  } catch (err) {
    dispatch({
      type: EVENT_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
