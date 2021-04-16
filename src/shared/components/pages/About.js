import React from "react";
import { connect } from "react-redux";
import { Helmet } from "react-helmet-async";
const About = (props) => {
  return (
    <h1>
      Hello About
      <Helmet>
        <title>About</title>
      </Helmet>
    </h1>
  );
};

export default connect()(About);
