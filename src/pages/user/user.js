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
import { categories } from "../../utils/categories";
import { connect } from "react-redux";
import { ClipLoader } from "react-spinners";
import { setStats } from "../../store/actions";

function User(props) {
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [donateWasteData, setDonateWasteData] = useState({
    name: "",
    category: "",
  });
  const toggleShow = () => setShowModal(!showModal);

  const getDonations = async (wasteName) => {
    var sum = 0;

    await Requests.userDonations(wasteName, props.userData.token)
      .then((res) => {
        const donations = res.data.wasteProducts;
        donations.forEach((element) => {
          sum = sum + element.weight;
        });
      })
      .catch((err) => {});

    return sum;
  };

  async function getCategoryDonation(category) {
    var sum = 0;
    await Requests.getDonationsByCategory(category, props.userData.token)
      .then((res) => {
        const donations = res.data.wasteProducts;
        donations.forEach((element) => {
          sum = sum + element.weight;
        });
      })
      .catch((err) => {});

    return sum;
  }

  useEffect(() => {
    async function getUserStats() {
      var tempWasteStats = [];
      var tempCategoryStats = [];

      categories.forEach(async (category) => {
        const cat = await getCategoryDonation(category.name);
        category.wastes.forEach(async (waste) => {
          const res = await getDonations(waste.key);
          tempWasteStats.push({
            name: waste.name,
            donated: res,
          });
        });
        tempCategoryStats.push({
          name: category.name,
          donated: cat,
        });
      });

      console.log(tempWasteStats, tempCategoryStats);
      // updating the states for piechart and bar-chart data
      setPieChartData(tempCategoryStats);
      setBarChartData(tempWasteStats);

      props.updateStats({
        categories: tempCategoryStats,
        wastes: tempWasteStats,
      });
    }

    getUserStats();
  }, []);

  const GetCard = (waste, category) => {
    const [loading, setLoading] = useState(true);
    const [donated, setDonated] = useState(0);

    useEffect(() => {
      setLoading(true);

      async function donations() {
        const res = await getDonations(waste.key, setDonated.bind(this));
        setDonated(res);
        setLoading(false);
      }
      donations();
    }, []);

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
                setDonateWasteData({ ...waste, category });
                toggleShow();
              }}
            >
              Donate
            </MDBBtn>
          </MDBCol>
          <MDBCol xs="12">
            {loading ? (
              <div className="w-100 text-center">
                <ClipLoader color="#36D7B7" size={20}></ClipLoader>
              </div>
            ) : donated > 0 ? (
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
          <MDBCol md="3" className="text-center">
            {/* {pieChartData.length ? ( */}
              <PieChartComponent data={pieChartData} />
            {/* ) : (
              <ClipLoader size={20}></ClipLoader>
            )} */}
          </MDBCol>
          <MDBCol md="9">
            <MDBCard>
              <MDBCardHeader>
                <h4 className="fw-bold">Statistics</h4>
              </MDBCardHeader>
              <MDBCardBody className="text-center">
                {barChartData.length > 0 ? (
                  <BarchartComponent data={barChartData}></BarchartComponent>
                ) : (
                  <ClipLoader size={20}></ClipLoader>
                )}
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

const mapActionsToProps = (dispatch) => {
  return {
    updateStats: (data) => {
      dispatch(setStats(data));
    },
  };
};

export default connect(mapStateToProps, mapActionsToProps)(User);
