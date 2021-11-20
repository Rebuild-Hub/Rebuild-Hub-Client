import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { Requests, Sidebar, Topbar } from "../../commons";
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
import { categories } from "../../utils/categories";
import { connect } from "react-redux";

function User(props) {
  const [showModal, setShowModal] = useState(false);
  const [donateWasteData, setDonateWasteData] = useState({
    name: "",
    category: "",
  });
  const toggleShow = () => setShowModal(!showModal);

  const getDonations = (wasteName) => {
    var sum = 0;

    Requests.userDonations(wasteName, props.userData.token)
      .then((res) => {
        const donations = res.data.wasteDonation;

        var sum = 0;

        donations.forEach((element) => {
          sum = sum + element.weight;
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return sum;
  };

  const GetCard = (waste, category) => {
    const [loading, setLoading] = useState(true);
    const [donated, setDonated] = useState(0);

    useEffect(() => {
      async function donations() {
        const res = await getDonations(waste.name);
        setDonated(res);
      }
      donations();
      setLoading(false);
    }, []);

    return loading ? (
      <div>Loading</div>
    ) : (
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
                setDonateWasteData({ ...waste, category });
                console.log({ ...waste, category });
                toggleShow();
              }}
            >
              Donate
            </MDBBtn>
          </MDBCol>
          <MDBCol xs="12">
            {donated ? (
              <>
                <div end md="6" className="text-success d-inline me-2">
                  {donated} Kg's
                </div>
                <label>Donated</label>
              </>
            ) : (
              <div>No Donations</div>
            )}
          </MDBCol>
        </MDBRow>
      </MDBCardBody>
    );
  };

  return (
    <div>
      <Sidebar></Sidebar>
      <div className="dashboard">
        <Topbar />
        <MDBRow className="m-0">
          {categories.map((category) => {
            return (
              <MDBCol md="3">
                <MDBCard className="mb-2">
                  <MDBCardHeader className="text-center">
                    <h4 className="fw-bold">{category.name}</h4>
                  </MDBCardHeader>

                  {category.wastes.map((waste) => {
                    return GetCard(waste, category.name);
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
        wasteData={donateWasteData}
      ></DonateModal>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    ...state,
  };
};

export default connect(mapStateToProps)(User);
