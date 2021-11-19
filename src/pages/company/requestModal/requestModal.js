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
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

export default function RequestModal(props) {
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
            <MDBModalTitle>Request for {props.waste}</MDBModalTitle>
            <MDBBtn
              className="btn-close"
              color="none"
              onClick={props.toggleShow}
            ></MDBBtn>
          </MDBModalHeader>
          <MDBModalBody>
            <MDBRow>
              <MDBCol md='12'>
                <MDBInput label="Amount (in kg's)"></MDBInput>
              </MDBCol>
              <MDBCol md='12'>
                <label className='mt-3 mb-1'>Expected Date</label>
                <input type='date' className='w-100 mb-3 px-2 py-1 rounder-5'></input>
              </MDBCol>
            </MDBRow>
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="secondary" onClick={props.toggleShow}>
              Close
            </MDBBtn>
            <MDBBtn>Send Request</MDBBtn>
          </MDBModalFooter>
        </MDBModalContent>
      </MDBModalDialog>
    </MDBModal>
  );
}
