import React from "react";
import PropTypes from "prop-types"; // TypeScript alternative

// alt solution:
// function Header(porps) {}
// you can pass in the actual props ie
// ({tagline, prop2}) then use {tagline} inside

//implicit return
const Header = props => (
  <header className="top">
    <h1>Catch
      <span className="ofThe">
        <span className="of">of</span>
        <span className="the">The</span>
      </span>
      Day
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
);

// gives warning in console (dev environment only)
// 
Header.propTypes = {
  tagline: PropTypes.string.isRequired
}

export default Header;