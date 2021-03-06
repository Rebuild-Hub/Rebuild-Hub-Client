import { Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./auth.css";
import { login } from "../../store/actions";
import { connect } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";
import { Requests } from "../../commons";
import { getUserDetailsByToken } from "../../utils/functions";

function Auth(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  return (
    <div className="auth">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Enter correct email!")
            .required("Email is required"),
          password: Yup.string().required("This field is required"),
        })}
        onSubmit={(values) => {
          setLoading(true);

          Requests.requestLogin(values)
            .then(async (res) => {
              const token = res.data.token;

              // getting user details using token
              const userDetails = await getUserDetailsByToken(token);
              props.login({ ...userDetails, token });

              navigate(userDetails.isCompany ? "company" : "/user", {
                replace: false,
              });

              // storing the token in local storage
              localStorage.setItem("rebuild-hub-token", res.data.token);
              setLoading(false);
            })
            .catch((err) => {
            });
        }}
      >
        {(formik) => {
          return (
            <div className="form-box">
              <div className="header">
                <img
                  src="https://www.recycling.com/wp-content/uploads/2016/06/recycling-symbol-icon-twotone-dark-green.png"
                  alt="..."
                ></img>
                <div className="title">Rebuild Hub</div>
              </div>
              <div className="title">Enter your login creadentials</div>
              <div className="input-box">
                <label name="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="steverogers@email.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <div className="text-danger">{formik.errors.email}</div>
              </div>
              <div className="input-box">
                <label>Password</label>
                <input
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  type="password"
                  placeholder="********"
                />
                <div className="text-danger">{formik.errors.password}</div>
              </div>
              <br />
              {loading ? (
                <div className="d-flex justify-content-center mt-5">
                  <div className="spinner-border" role="status"></div>
                </div>
              ) : (
                <div className="button-container">
                  <MDBBtn
                    color="dark"
                    className="fw-bolder p-4 py-3 m-2"
                    onClick={formik.handleSubmit}
                  >
                    Login
                  </MDBBtn>
                  <Link to="/register">
                    <MDBBtn color="light" className="fw-bold p-4 py-3 m-2">
                      Register
                    </MDBBtn>
                  </Link>
                </div>
              )}
            </div>
          );
        }}
      </Formik>
    </div>
  );
}

const mapStateToProps = (state) => null;
const mapActionsToProps = (dispatch) => {
  return {
    login: (data) => dispatch(login(data)),
  };
};
export default connect(mapStateToProps, mapActionsToProps)(Auth);
