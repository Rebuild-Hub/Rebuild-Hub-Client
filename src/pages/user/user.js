import React, { useState } from "react";
import "./dashboard.css";
import { Sidebar, Topbar } from "../../commons";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import DonateModal from "./donateModal.js/donateModal";
import BarchartComponent from "../../commons/barChart";
import PieChartComponent from "../../commons/pieChart";
import { userBarChart } from "../../utils/userSampleData";

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

export default function User() {
  const [showModal, setShowModal] = useState(false);
  const [donateWasteName, setDonateWasteName] = useState("");
  const toggleShow = () => setShowModal(!showModal);
  // static demoUrl = 'https://codesandbox.io/s/simple-bar-chart-tpz8r';

  return (
    <div>
      <Sidebar></Sidebar>
      <div className="dashboard">
        <Topbar />
        <MDBRow className="m-0">
          {wasteCategories.map((category) => {
            return (
              <MDBCol md="3">
                <MDBCard className="mb-2">
                  <MDBCardHeader className="text-center">
                    <h4 className="fw-bold">{category.name}</h4>
                  </MDBCardHeader>
                  {category.wastes.map((waste) => {
                    return (
                      <MDBCardBody className="pt-2">
                        <MDBRow between>
                          <MDBCol>
                            <b>{waste.name}</b>
                          </MDBCol>
                          <MDBCol end className="text-end">
                            <MDBBtn
                              size="sm"
                              color="info"
                              rounded
                              onClick={() => {
                                setDonateWasteName(waste.name);
                                toggleShow();
                              }}
                            >
                              Donate
                            </MDBBtn>
                          </MDBCol>
                          <MDBCol xs="12">
                            <div
                              end
                              md="6"
                              className="text-success d-inline me-2"
                            >
                              {waste.donated} Kg's
                            </div>
                            <label>Donated</label>
                          </MDBCol>
                        </MDBRow>
                      </MDBCardBody>
                    );
                  })}
                </MDBCard>
              </MDBCol>
            );
          })}
          <MDBCol md="3">
            <PieChartComponent />
          </MDBCol>
          <MDBCol md="9">
            <MDBCard>
              <MDBCardHeader>
                <h4 className="fw-bold">Statistics</h4>
              </MDBCardHeader>
              <MDBCardBody>
                <BarchartComponent data={userBarChart}></BarchartComponent>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </div>
      <DonateModal
        showModal={showModal}
        toggleShow={toggleShow}
        name={donateWasteName}
      ></DonateModal>
    </div>
  );
}
