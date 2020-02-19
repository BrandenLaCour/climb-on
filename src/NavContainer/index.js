import React from "react";
import { Link } from "react-router-dom";
import { pagination, Button } from "semantic-ui-react";
import "./index.css";

const NavContainer = () => {
  return (
    <div
      aria-label="Pagination Navigation"
      role="navigation"
      className="ui pagination menu"
      id="navbar"
    >
      {" "}
      <Link
        aria-current="false"
        aria-disabled="false"
        tabindex="0"
        value="1"
        aria-label="First item"
        type="firstItem"
        className="item"
        to="/"
      >
        <strong>ClimbOn</strong>
      </Link>
      <div className="space-2" aria-current="true" aria-disabled="false"></div>{" "}
      <input
        aria-current="false"
        aria-disabled="false"
        tabindex="0"
        value=""
        aria-label="First item"
        type="firstItem"
        className="search item"
        placeholder="Enter Climb"
      />
      {/* above will eventually need its own component for search */}
      <div className="space" aria-current="true" aria-disabled="false"></div>
      <Link
        aria-current="false"
        aria-disabled="false"
        tabindex="0"
        value="1"
        aria-label="First item"
        type="firstItem"
        className="item"
        to="/addClimb"
      >
        Add Climb
      </Link>
      <Link
        aria-current="false"
        aria-disabled="false"
        tabindex="0"
        value="1"
        aria-label="First item"
        type="firstItem"
        className="item"
        to="/profile"
      >
        Profile
      </Link>
    </div>
  );
};

export default NavContainer;
