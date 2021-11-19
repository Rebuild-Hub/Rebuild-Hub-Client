import "./topbar.css";
import React from "react";

export default function Topbar(props) {
  console.log(props.userData)
  return (
    <div className="topbar">
      <div className="row">
        <div className="col-10">
          <h3 className='fw-bold'>{props.userData.email}</h3>
        </div>
      </div>
    </div>
  );
}
