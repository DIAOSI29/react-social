const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");

const Event = require("../../models/Event");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route    POST api/events
// @desc     Create an event
// @access   Private
router.post(
  "/",
  [
    auth,
    [
      check("location", "Location is required")
        .not()
        .isEmpty(),
      check("eventdate", "Date is required")
        .not()
        .isEmpty(),
      check("hour", "Please enter a valid time using 24H format")
        .not()
        .isEmpty()
        .isNumeric()
        .isLength({ min: 2, max: 2 }),

      check("about", "Brief description of your event is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      let newEvent = new Event({
        location: req.body.location,
        hour: req.body.hour,
        minute: req.body.minute,
        about: req.body.about,
        maxnumber: req.body.maxnumber,
        eventdate: req.body.eventdate,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      });

      const event = await newEvent.save();

      res.json(event);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/events
// @desc     Get all events
// @access   Private
router.get("/", auth, async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    GET api/events/:id
// @desc     Get event by ID
// @access   Private
router.get("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    // Check for ObjectId format and event
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    res.json(event);
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/events/:id
// @desc     Delete an event
// @access   Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    // Check for ObjectId format and event
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/) || !event) {
      return res.status(404).json({ msg: "Event not found" });
    }

    // Check user
    if (event.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await event.remove();

    res.json({ msg: "Event removed" });
  } catch (err) {
    console.error(err.message);

    res.status(500).send("Server Error");
  }
});

// @route    PUT api/events/join/:id
// @desc     Like an event
// @access   Private
router.put("/join/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    // Check if the event has already been joined
    if (
      event.joins.filter(join => join.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "You already joined" });
    }

    const user = await User.findById(req.user.id).select("-password");
    event.joins.unshift({
      user: req.user.id,
      name: user.name,
      mobile: user.mobile
    });

    await event.save();

    res.json(event.joins);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/events/quit/:id
// @desc     quit an event
// @access   Private
router.put("/quit/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    // Check if the event has already been joined
    if (
      event.joins.filter(join => join.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Event has not yet been joined" });
    }

    // Get remove index
    const removeIndex = event.joins
      .map(join => join.user.toString())
      .indexOf(req.user.id);

    event.joins.splice(removeIndex, 1);

    await event.save();

    res.json(event.joins);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route    POST api/events/comment/:id
// @desc     Comment on an event
// @access   Private
router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");
      const event = await Event.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id
      };

      event.comments.unshift(newComment);

      await event.save();

      res.json(event.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    DELETE api/events/comment/:id/:comment_id
// @desc     Delete comment
// @access   Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    // Pull out comment
    const comment = event.comments.find(
      comment => comment.id === req.params.comment_id
    );
    // Make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }
    // Check user
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    event.comments = event.comments.filter(
      ({ id }) => id !== req.params.comment_id
    );

    await event.save();

    return res.json(event.comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
