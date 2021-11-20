import "./topbar.css";
import React from "react";
import { connect } from "react-redux";
import { logout } from "../../store/actions";

function Topbar(props) {
  console.log(props);

  return (
    <div className="topbar">
      <div className="row justify-content-between">
        <div className="col-10">
          <h3 className="fw-bold">{props.userData && props.userData.name}</h3>
        </div>
        <div className="col-2 text-end">
          <button className="btn btn-danger" onClick={props.logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapActionToProps)(Topbar);
