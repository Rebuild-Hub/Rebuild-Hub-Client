import { connect } from "react-redux";
import { Requests } from "../commons";
import { updateUserData } from "../store/actions";
import { categories } from "./categories";

const LoadUserStats = (token) => {
  console.log("Loading Stats");

  var sum = 0;
  var stats = [...categories];

  //   get donation of user for a waste
  const getDonationsForWaste = (waste) => {
    Requests.userDonations(waste, token).then((res) => {
      const donations = res.data.wasteDonation;

      donations.forEach((element) => {
        sum = sum + element.weight;
      });
    });

    return sum;
  };

  categories.forEach((category, i) => {
    category.wastes.forEach(async (waste, j) => {
      stats[i].wastes[j].donated = await getDonationsForWaste(waste);
    });
  });

  return stats;
};

const mapStateToProps = (state) => {
  return state.userData;
};

const mapActionToProps = (dispatch) => {
  return {
    update: (data) => dispatch(updateUserData(data)),
  };
};

export default LoadUserStats;
