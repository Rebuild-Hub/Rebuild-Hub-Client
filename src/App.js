import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Routes, Navigate, Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Requests } from "./commons";
import PageLoader from "./commons/pageLoader";
import { AuthLogin, AuthRegister, Company, User } from "./pages";
import { login } from "./store/actions";

function App(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = localStorage.getItem("rebuild-hub-token");
    // auto login using jwt stored in localstorage
    if (userToken) {
      setLoading(true);

      Requests.userDetails(userToken)
        .then((res) => {
          props.login({ ...res.data, token: userToken });
          navigate(res.data.isCompany ? "company" : "user", {
            replace: false,
          });
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    }
  }, [props.loggedIn]);

  return (
    <>
      <ToastContainer />
      <Routes>
        {/* protected Routes */}
        <>
          <Route
            path="user"
            element={
              props.loggedIn ? (
                loading ? (
                  <PageLoader />
                ) : (
                  <User />
                )
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="company"
            element={props.loggedIn ? <Company /> : <Navigate to="/" />}
          />
        </>
        <Route path="/" element={loading ? <PageLoader /> : <AuthLogin />} />
        <Route path="register" element={<AuthRegister />} />
        <Route path="*" render={<Link to="/"></Link>}></Route>
      </Routes>
    </>
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
