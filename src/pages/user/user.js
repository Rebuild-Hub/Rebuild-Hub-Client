import React, { useEffect, useState } from "react";
import "./dashboard.css";
import {
  NewBarChart,
  NewPieChart,
  Requests,
  Sidebar,
  Topbar,
} from "../../commons";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBCol,
  MDBRow,
} from "mdb-react-ui-kit";
import DonateModal from "./donateModal.js/donateModal";
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

  const getWasteDonations = async (wasteName) => {
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

  function getCategoryDonation() {
    var res = [];
    var labels = [];

    pieChartData.forEach((ele) => {
      res.push(ele.donated);
      labels.push(ele.category);
    });

    return { res, labels };
  }

  function getWasteDonationsData() {
    var res = [];
    var labels = [];

    barChartData.forEach((ele) => {
      res.push(ele.donated);
      labels.push(ele.waste);
    });

    return { res, labels };
  }

  useEffect(() => {
    var categoryDonation = [];
    var wasteDonation = [];

    categories.forEach((category) => {
      Requests.getUserCategoryDonations(category.name, props.userData.token)
        .then((categoryResponse) => {
          categoryDonation.push({
            category: category.name,
            donated: categoryResponse.data,
          });
        })
        .catch((err) => {
          categoryDonation.push({
            category: category.name,
            donated: 0,
          });
        });

      category.wastes.map((waste) => {
        Requests.getUserWasteDonations(waste.key, props.userData.token)
          .then((res) => {
            wasteDonation.push({
              waste: waste.name,
              donated: res.data,
            });
          })
          .catch((err) => {});
      });
    });

    setBarChartData(wasteDonation);
    setPieChartData(categoryDonation);
  }, []);

  const GetCard = (waste, category) => {
    const [loading, setLoading] = useState(true);
    const [donated, setDonated] = useState(0);

    useEffect(() => {
      setLoading(true);
      async function donations() {
        const res = await getWasteDonations(waste.key, setDonated.bind(this));
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
            <NewPieChart data={getCategoryDonation()}></NewPieChart>
          </MDBCol>
          <MDBCol md="9">
            <MDBCard>
              <MDBCardHeader>
                <h4 className="fw-bold">Statistics</h4>
              </MDBCardHeader>
              <MDBCardBody className="text-center">
                <NewBarChart data={getWasteDonationsData()}></NewBarChart>
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
