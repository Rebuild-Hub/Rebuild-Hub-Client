import React from "react";
import "./card.css";

function Card(props) {
  return <div className="card-template">{props.children}</div>;
}
