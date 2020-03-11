import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({
  profile: {
    age,
    hobbies,
    location,
    gender,
    bio,
    skills,
    user: { name }
  }
}) => (
  <div className="profile-about bg-light p-2">
    {bio && (
      <Fragment>
        <h2 className="text-primary"> Bio</h2>
        <p>{bio}</p>
        <div className="line" />

        <h2 className="text-primary">Age</h2>
        <p>{age}</p>
        <div className="line" />
        <h2 className="text-primary">Gender</h2>
        <p>{gender}</p>
        <div className="line" />
      </Fragment>
    )}
    {hobbies && (
      <Fragment>
        <h2 className="text-primary">Hobbies</h2>
        <div className="hobbies">
          {hobbies.map((hobbie, index) => (
            <div key={index} className="p-1">
              <i className="fas fa-check" /> {hobbie}
            </div>
          ))}
        </div>
        <div className="line" />
      </Fragment>
    )}
    <h2 className="text-primary">Skill Set</h2>

    {skills && (
      <Fragment>
        <div className="skills">
          {skills.map((skill, index) => (
            <div key={index} className="p-1">
              <i className="fas fa-cog" /> {skill}
            </div>
          ))}
        </div>
        <div className="line" />
      </Fragment>
    )}
  </div>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired
};

export default ProfileAbout;
