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
} from "mdb-react-ui-kit";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import { ClipLoader } from "react-spinners";
import { Requests, Toasts } from "../../../commons";
import { connect } from "react-redux";

function RequestModal(props) {
  const [requesting, setRequesting] = useState(false);

  useEffect(() => {
    setRequesting(false);
  }, [props.waste]);
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
            <MDBModalTitle>Request for {props.waste.wasteName}</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={props.toggleShow}
            ></MDBBtn>
          </MDBModalHeader>
          <Formik
            initialValues={{
              amount: "",
            }}
            validationSchema={Yup.object({
              amount: Yup.number()
                .typeError("Should be a number")
                .min(0, "Should be greater than 0")
                .required("This field is required"),
            })}
            onSubmit={(values) => {
              setRequesting(true);
              Requests.requestForWaste(
                {
                  category: props.waste.category,
                  wasteName: props.waste.wasteName,
                  amount: +values.amount,
                },
                props.userData.token
              )
                .then((res) => {
                  setRequesting(false);
                  Toasts.successToast("Request Sent");
                  setTimeout(() => {
                    props.toggleShow();
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
                <div>
                  <MDBModalBody>
                    <MDBRow>
                      <MDBCol md="12">
                        <label>Enter amount in Kg's</label>
                        <Field
                          name="amount"
                          type="number"
                          className="w-100 px-2 py-1 rounder-5"
                        ></Field>
                        <span className="text-danger mb-3">
                          {formik.errors.amount}
                        </span>
                      </MDBCol>
                    </MDBRow>
                  </MDBModalBody>
                  <MDBModalFooter>
                    <MDBBtn color="dark" onClick={props.toggleShow}>
                      Close
                    </MDBBtn>
                    <MDBBtn onClick={formik.handleSubmit}>
                      {requesting ? (
                        <ClipLoader width={20}></ClipLoader>
                      ) : (
                        "Send Request"
                      )}
                    </MDBBtn>
                  </MDBModalFooter>
                </div>
              );
            }}
          </Formik>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(RequestModal);
