import { Formik } from "formik";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./auth.css";
import { login } from "../../store/actions";
import { connect } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";
import { Requests } from "../../commons";

function AuthRegister(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <div className="auth">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Please enter our name"),
          email: Yup.string()
            .email("Enter correct email!")
            .required("Email is required"),
          password: Yup.string().required("This field is required"),
          confirmPassword: Yup.string().oneOf(
            [Yup.ref("password")],
            "Both password need to be the same"
          ),
        })}
        onSubmit={async (values) => {
          setLoading(true);
          setLoading(false);
          Requests.requestRegister(values)
            .then((res) => {
              props.login({ ...values, token: res.data.token });
              navigate("/user", { replace: false });
            })
            .catch((err) => {
              console.log(err);
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
              <div className="title">Create your account</div>
              <div className="input-box">
                <label name="name">Name</label>
                <input
                  type="name"
                  name="name"
                  placeholder="Steve Rogers"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                <div className="text-danger text-start">
                  {formik.errors.name}
                </div>
              </div>
              <div className="input-box">
                <label name="email">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="steverogers@email.com"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <div className="text-danger text-start">
                  {formik.errors.email}
                </div>
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
                <div className="text-danger text-start">
                  {formik.errors.password}
                </div>
              </div>
              <div className="input-box">
                <label>Password</label>
                <input
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  type="password"
                  placeholder="********"
                />
                <div className="text-danger text-start">
                  {formik.errors.confirmPassword}
                </div>
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
                    Register
                  </MDBBtn>
                  <Link to="/">
                    <MDBBtn color="light" className="fw-bold p-4 py-3 m-2">
                      Login
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
export default connect(mapStateToProps, mapActionsToProps)(AuthRegister);
