import React from "react";
import Message from "../Message";
// import "../style.css";

function Nav(props) {
  return (
    <nav className="navbar">
      <ul>
        <li className="brand">
          <a href="/">Disney Princess Clicky Game!</a>
        </li>
        <Message score={props.score} topScore={props.topScore} />
        <li>
          Score: {props.score} || Top Score: {props.topScore}
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
