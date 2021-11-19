import { Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import "./auth.css";
import { login } from "../../store/actions";
import { connect } from "react-redux";
import { MDBBtn } from "mdb-react-ui-kit";

function Auth(props) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  return (
    <div className="login">
      <Formik
        initialValues={{
          email: "vedant@gmail.com",
          password: "vedant",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Enter correct email!")
            .required("Email is required"),
          password: Yup.string().required("This field is required"),
        })}
        onSubmit={async (values) => {
          setLoading(true);
          props.login(values);
          setLoading(false);
          navigate("/company", { replace: false });
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
                <div class="d-flex justify-content-center mt-5">
                  <div class="spinner-border" role="status"></div>
                </div>
              ) : (
                <div className="button-container">
                  <MDBBtn color='dark' className='fw-bolder p-4 py-3 m-2' onClick={formik.handleSubmit}>Login</MDBBtn>
                  <MDBBtn color='light' className='fw-bold p-4 py-3 m-2'>Register</MDBBtn>
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
