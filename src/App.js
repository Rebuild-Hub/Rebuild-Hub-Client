import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate, Link, useNavigate } from "react-router-dom";
import { Requests } from "./commons";
import { AuthLogin, AuthRegister, Company, User } from "./pages";
import { login } from "./store/actions";
import loadUserStats from "./utils/loadUserStats";

function App(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const userToken = localStorage.getItem("rebuild-hub-token");

    // auto login using jwt stored in localstorage
    userToken &&
      Requests.userDetails(userToken)
        .then((res) => {
          props.login({ ...res.data, token: userToken });
          navigate("user", { replace: false });
          console.log(loadUserStats(userToken));
        })
        .catch((err) => {
          console.log(err);
        });

    setLoading(false);
  }, [props.loggedIn]);

  return (
    <Routes>
      {/* protected Routes */}
      <>
        <Route
          path="user"
          element={props.loggedIn ?  loading ? <div>Loading</div> : <User /> : <Navigate to="/" />}
        />
        <Route
          path="company"
          element={props.loggedIn ? <Company /> : <Navigate to="/" />}
        />
      </>
      <Route path="/" element={<AuthLogin />} />
      <Route path="register" element={<AuthRegister />} />
      <Route path="*" render={<Link to="/"></Link>}></Route>
    </Routes>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
  };
};

export default connect(mapStateToProps, mapActionsToProps)(App);
