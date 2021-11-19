import React from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBInput,
  MDBRow,
  MDBCol,
  MDBFile,
  MDBRadio,
} from "mdb-react-ui-kit";

export default function DonateModal(props) {
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
            <MDBModalTitle>Donate {props.name}</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={props.toggleShow}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              <MDBCol className="mb-2" md="12">
                <MDBInput label="Quantity (in Kg's)"></MDBInput>
              </MDBCol>
              <MDBCol md="12">
                <MDBFile label="Upload Image" id='imageUpload' labelClass="fw-bold"></MDBFile>
              </MDBCol>
              <MDBCol>
                <label className="mt-3 mb-1 d-block fw-bolder">
                  Select Company
                </label>
                <MDBRadio inline name="company" label="Samsung"></MDBRadio>
                <MDBRadio inline name="company" label="HCL"></MDBRadio>
                <MDBRadio inline name="company" label="Tata"></MDBRadio>
                <MDBRadio inline name="company" label="Maruti Suzuki"></MDBRadio>
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="dark" onClick={props.toggleShow}>
              Close
            </MDBBtn>
            <MDBBtn>Donate</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
