import React from "react";
import { Link } from "react-router-dom";
import "./index.css";


const NavContainer = props => {
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
        aria-label="First item"
        type="firstItem"
        className="item"
        onClick={() => props.handlePageChoice("home")}
        to="/"
      >
        <strong>ClimbOn</strong>
      </Link>
      <div
        className={props.username.length > 8 ? `space-2-large` : "space-2"}
        aria-current="true"
        aria-disabled="false"
      ></div>{" "}
      <input
        aria-current="false"
        aria-disabled="false"
        aria-label="First item"
        type="firstItem"
        className="search item"
        placeholder="Enter Climb"
      />
      {/* above will eventually need its own component for search */}
      <div
        className={props.username.length > 8 ? `space-large` : "space"}
        aria-current="true"
        aria-disabled="false"
      ></div>
      {props.username ? (
        <>
          <Link
            aria-current="false"
            aria-disabled="false"
            aria-label="pageItem"
            type="firstItem"
            className={`item ${
              props.username.length > 12 ? "user-link-large" : "user-link"
            }`}
            to="/profile"
            onClick={() => props.handlePageChoice("profile")}
          >
            {props.username}
          </Link>

          <Link
            aria-current="false"
            aria-disabled="false"
            aria-label="First item"
            type="firstItem"
            className="item"
            to="/addClimb"
            onClick={() => props.handlePageChoice("addClimb")}
          >
            Add Climb
          </Link>
        </>
      ) : (
        <div
          className="space-3"
          aria-current="true"
          aria-disabled="false"
        ></div>
      )}
    </div>
  );
};

export default NavContainer;
