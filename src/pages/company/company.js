import React, { useState } from "react";
import { Sidebar, Topbar } from "../../commons";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBProgress,
  MDBProgressBar,
  MDBRow,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from "mdb-react-ui-kit";
import RequestModal from "./requestModal/requestModal";
import BarchartComponent from "../../commons/barChart";
import { userBarChart } from "../../utils/userSampleData";
import PieChartComponent from "../../commons/pieChart";
import { connect } from "react-redux";

const wasteCategories = [
  {
    name: "Papers",
    wastes: [
      { name: "NewsPapers", donated: 500, target: 1000 },
      { name: "Books", donated: 600, target: 1000 },
      { name: "Magazines", donated: 400, target: 1000 },
    ],
  },
  {
    name: "Metals",
    wastes: [
      { name: "Aluminium", donated: 30, target: 50 },
      { name: "Steel", donated: 30, target: 50 },
      { name: "Zinc", donated: 30, target: 100 },
    ],
  },
  {
    name: "Papers",
    wastes: [
      { name: "NewsPapers", donated: 500, target: 1000 },
      { name: "Books", donated: 600, target: 1000 },
    ],
  },

  {
    name: "Papers",
    wastes: [
      { name: "NewsPapers", donated: 500, target: 1000 },
      { name: "Books", donated: 600, target: 1000 },
      { name: "Magazines", donated: 400, target: 1000 },
    ],
  },
];

function Company(props) {
  const [showModal, setShowModal] = useState(false);
  const [requestWaste, setRequestWaste] = useState("");
  const toggleShow = () => setShowModal(!showModal);
  return (
    <div>
      <Sidebar></Sidebar>
      <div className="dashboard">
        <Topbar {...props} />
        <MDBRow className="m-0">
          {wasteCategories.map((category) => {
            return (
              <MDBCol md="3">
                <MDBCard className="mb-2 square border">
                  <MDBCardBody className='m-0 py-1'>
                    <h5 className='d-flex align-items-center fw-bolder'>{category.name}</h5>
                  </MDBCardBody>
                  {category.wastes.map((waste) => {
                    return (
                      <MDBCardBody className="pt-2">
                        <MDBRow middle className='mb-1 align-items-center'>
                          <MDBCol className="fw-light">{waste.name}</MDBCol>
                          <MDBCol md="4">
                            <MDBBtn
                              size="sm"
                              className="m-1"
                              color="light"
                              onClick={() => {
                                toggleShow();
                                setRequestWaste(waste.name);
                              }}
                            >
                              Request
                            </MDBBtn>
                          </MDBCol>
                        </MDBRow>
                        <MDBProgress height="20" className="rounded-5">
                          <MDBProgressBar
                            bgColor="primary"
                            width={100 * (waste.donated / waste.target)}
                            valuemin={0}
                            valuemax={waste.target}
                          >
                            {waste.donated + "/" + waste.target}
                          </MDBProgressBar>
                        </MDBProgress>
                      </MDBCardBody>
                    );
                  })}
                </MDBCard>
              </MDBCol>
            );
          })}
          <MDBCol md={12}>
            <MDBCard>
              <MDBCardHeader>Orders</MDBCardHeader>
              <MDBCardBody>
                <MDBTable>
                  <MDBTableHead dark>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Waste</th>
                      <th scope="col">Quantity (Kg's)</th>
                      <th scope="col">Date</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    <tr>
                      <th scope="row">1</th>
                      <td>Newspapers</td>
                      <td>600</td>
                      <td>
                        {() => {
                          const date = new Date();
                          return date.toLocaleString();
                        }}
                      </td>
                    </tr>
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md={12}>
            <MDBCard>
              <MDBCardHeader>Statistics</MDBCardHeader>
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md={3}>
                    <PieChartComponent></PieChartComponent>
                  </MDBCol>
                  <MDBCol md={9}>
                    <BarchartComponent data={userBarChart}></BarchartComponent>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
      <RequestModal
        waste={requestWaste}
        showModal={showModal}
        toggleShow={toggleShow}
      ></RequestModal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(Company);
