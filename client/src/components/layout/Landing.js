import React from "react";
import { Link, Redirect } from "react-router-dom";
// import { connect } from 'react-redux';
// import PropTypes from 'prop-types';

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">
            It is all about gather together and having fun
          </h1>
          <p className="lead">
            Feel bored? Want some hangout? Come join this community and have a
            good time by meeting with people thinking the same like you!
          </p>
          <div className="buttons">
            <div className="row">
              <Link to="/register" className="btn btn-primary">
                Sign Up
              </Link>
              <Link to="/login" className="btn btn-light">
                Login
              </Link>
            </div>
            <div className="row mt-3" id="glanceBtn">
              <Link to="/events" className="btn btn-light">
                Take a glance!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// import React from "react";
// import { Link, Redirect } from "react-router-dom";
// import { connect } from "react-redux";
// import PropTypes from "prop-types";

// const Landing = ({ isAuthenticated }) => {
//   if (isAuthenticated) {
//     return <Redirect to="/dashboard" />;
//   }

//   return (
//     <section className="landing">
//       <div className="dark-overlay">
//         <div className="landing-inner">
//           <h1 className="x-large">Developer Connector</h1>
//           <p className="lead">
//             Create a developer profile/portfolio, share posts and get help from
//             other developers
//           </p>
//           <div className="buttons">
//             <Link to="/register" className="btn btn-primary">
//               Sign Up
//             </Link>
//             <Link to="/login" className="btn btn-light">
//               Login
//             </Link>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// Landing.propTypes = {
//   isAuthenticated: PropTypes.bool
// };

// const mapStateToProps = state => ({
//   isAuthenticated: state.auth.isAuthenticated
// });
export default Landing;
