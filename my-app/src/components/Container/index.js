import React from "react";
import "./style.css";

function Container(props) {
  return <main className="container">{props.children}</main>;
}

export default Container;
