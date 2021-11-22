import React, { useEffect, useState } from "react";
import { Requests, Sidebar, Topbar } from "../../commons";
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
import { categories } from "../../utils/categories";
import { ClipLoader } from "react-spinners";

function Company(props) {
  const [showModal, setShowModal] = useState(false);
  const [requestWasteData, setRequestWasteData] = useState({
    category: "",
    wasteName: "",
  });
  const toggleShow = () => setShowModal(!showModal);

  const [loadingStats, setLoadingStats] = useState(true);
  const [statistics, setStatastics] = useState({
    PAPERS: {},
    METALS: {},
    PLASTICS: {},
    "E-WASTE": {},
  });

  useEffect(() => {
    setLoadingStats(true);
    const { token } = props.userData;
    Requests.getCompanyStats(token)
      .then((res) => {
        console.log(res.data);
        setStatastics(res.data);
        setLoadingStats(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Sidebar></Sidebar>
      <div className="dashboard">
        <Topbar {...props} />
        <MDBRow className="m-0">
          {categories.map((category) => {
            return (
              <MDBCol md="3">
                <MDBCard className="mb-2">
                  <MDBCardHeader className="text-center">
                    <h4 className="fw-bold">{category.name}</h4>
                  </MDBCardHeader>

                  {category.wastes.map((waste) => {
                    const target =
                      statistics[category.name][waste.key] &&
                      statistics[category.name][waste.key].target;
                    const fullfilled =
                      statistics[category.name][waste.key] &&
                      statistics[category.name][waste.key].fullfilled;

                    return (
                      <MDBCardBody className="pt-2">
                        <MDBRow middle className="mb-1 align-items-center">
                          <MDBCol className="fw-light">{waste.name}</MDBCol>
                          <MDBCol md="4">
                            <MDBBtn
                              size="sm"
                              className="m-1"
                              color="light"
                              onClick={() => {
                                toggleShow();
                                setRequestWasteData({
                                  category: category.name,
                                  wasteName: waste.key,
                                });
                              }}
                            >
                              Request
                            </MDBBtn>
                          </MDBCol>
                        </MDBRow>
                        {loadingStats ? (
                          <ClipLoader></ClipLoader>
                        ) : (
                          <MDBProgress height="20" className="rounded-5">
                            <MDBProgressBar
                              bgColor="primary"
                              width={100 * (fullfilled / target)}
                              valuemin={0}
                              valuemax={target}
                            >
                              {fullfilled + "/" + target}
                            </MDBProgressBar>
                          </MDBProgress>
                        )}
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
        waste={requestWasteData}
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
