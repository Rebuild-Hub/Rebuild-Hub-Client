import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRow,
  MDBCol,
  MDBProgress,
  MDBProgressBar,
} from "mdb-react-ui-kit";
import { Field, Formik } from "formik";
import { connect } from "react-redux";
import { Requests, Toasts } from "../../../commons";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";

function DonateModal(props) {
  const [sendingRequest, setSendingRequest] = useState(false);
  const [companiesAvailable, setcompaniesAvailable] = useState([]);
  const [loadingCompanies, setLodingCompanies] = useState(true);

  const getCompanies = () => {
    setLodingCompanies(true);
    Requests.getCompaniesForWaste(props.wasteData.category, props.wasteData.key)
      .then((res) => {
        setcompaniesAvailable(res.data);
        setLodingCompanies(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCompanies();
  }, [props.wasteData]);

  return (
    <MDBModal
      closeOnEsc
      show={props.showModal}
      getOpenState={() => props.showModal}
      tabIndex="-1"
    >
      <MDBModalDialog>
        <MDBModalContent>
          <MDBModalHeader>
            <MDBModalTitle>Donate {props.wasteData.name}</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={props.toggleShow}
            ></MDBBtn>
          </MDBModalHeader>
          {loadingCompanies ? (
            <MDBModalBody className="w-100 text-center">
              <ClipLoader size={50}></ClipLoader>
            </MDBModalBody>
          ) : (
            <Formik
              initialValues={{
                weight: "",
                company: "",
                image:
                  "https://espoletta.com/wp-content/uploads/2019/12/laptop-malfunction-3-600x318.jpg",
              }}
              validationSchema={Yup.object({
                weight: Yup.number()
                  .min(0, "Enter a positive number")
                  .required("Weight is required"),
              })}
              onSubmit={(values) => {
                // new donation data
                const data = {
                  ...values,
                  rate: props.wasteData.rate,
                  name: props.wasteData.key,
                  category: props.wasteData.category,
                };

                setSendingRequest(true);

                // calling the backend api
                Requests.newDonation(data, props.token)
                  .then((res) => {
                    Toasts.successToast("Donated Successfully");
                    setTimeout(() => {
                      props.toggleShow();
                      setSendingRequest(false);
                      window.location.reload();
                    }, 3000);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              {(formik) => {
                return (
                  <>
                    <MDBModalBody>
                      <MDBRow>
                        <MDBCol className="mb-2" md="12">
                          <label className="w-100">Weight</label>
                          <input
                            type="number"
                            name="weight"
                            className="w-100 rounded-2 border p-2"
                            placeholder="Quantity (in Kg's)"
                            value={formik.values.weight}
                            onChange={formik.handleChange}
                          ></input>
                          <span className="w-100 text-danger">
                            {formik.errors.weight}
                          </span>
                        </MDBCol>
                        <MDBCol className="mb-2" md="12">
                          <label className="w-100">Image</label>
                          <input
                            name="image"
                            value={formik.values.image}
                            onChange={formik.handleChange}
                            placeholder="Image (URL)"
                            className="w-100 rounded-2 border p-2 mb-2"
                          ></input>
                          <div className="w-100 text-center">
                            <img
                              className="w-50 rounded-3"
                              src={formik.values.image}
                              alt="..."
                            ></img>
                          </div>
                        </MDBCol>
                        <MDBCol>
                          <label className="mt-3 mb-1 d-block fw-bolder">
                            Select Company
                          </label>
                          {companiesAvailable.length > 0 ? (
                            companiesAvailable.map((company) => {
                              return (
                                <div className="my-1 row align-items-center">
                                  <div className="col-1">
                                    <Field
                                      className="form-check-input"
                                      type="radio"
                                      name="company"
                                      value={company.name}
                                    />
                                  </div>
                                  <div className="col-11">
                                    <div className="row">
                                      <div className="col-12">
                                        {company.name}
                                      </div>
                                      <div className="col-12">
                                        <label className="text-center w-100">
                                          <MDBProgress
                                            height="20"
                                            className="rounded-2 shadow"
                                          >
                                            <MDBProgressBar
                                              bgColor="dark"
                                              width={
                                                100 *
                                                (company.fullfilled /
                                                  company.target)
                                              }
                                              valuemin={0}
                                              valuemax={company.target}
                                            >
                                              {company.fullfilled +
                                                "/" +
                                                company.target}
                                            </MDBProgressBar>
                                          </MDBProgress>
                                        </label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="text-danger">
                              No Companies Available
                            </div>
                          )}
                        </MDBCol>
                      </MDBRow>
                    </MDBModalBody>
                    <MDBModalFooter>
                      <MDBBtn color="dark" onClick={props.toggleShow}>
                        Close
                      </MDBBtn>
                      <MDBBtn
                        disabled={
                          companiesAvailable.length === 0 || sendingRequest
                        }
                        onClick={formik.handleSubmit}
                      >
                        {sendingRequest ? <ClipLoader size={15}></ClipLoader> : "Donate"}
                      </MDBBtn>
                    </MDBModalFooter>
                  </>
                );
              }}
            </Formik>
          )}
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state.userData,
  };
};

export default connect(mapStateToProps)(DonateModal);
