import { connect } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import { Auth, Company, User } from "./pages";

function App(props) {
  return (
    <BrowserRouter>
      <Routes>
        {/* protected Routes */}
        <>
          <Route
            path="/user"
            element={props.loggedIn ? <User /> : <Navigate to="/" />}
          />
          <Route
            path="/company"
            element={props.loggedIn ? <Company /> : <Navigate to="/" />}
          />
        </>
        <Route path="/" element={<Auth />} />
        <Route path="*" render={<Link to="/"></Link>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps)(App);
