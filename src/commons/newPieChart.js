import React from "react";
import { Doughnut, Pie } from "react-chartjs-2";

const NewPieChart = (props) => {
  const res = props.data.res;
  const labels = props.data.labels;

  const data = {
    labels,
    datasets: [
      {
        label: "Category Donations",
        data: res,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(180, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div>
      <Pie
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: true,
        }}
      />
    </div>
  );
};

export default NewPieChart;
