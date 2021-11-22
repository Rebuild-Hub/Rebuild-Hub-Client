import React from "react";
import { Doughnut, Bar } from "react-chartjs-2";

const NewBarChart = (props) => {
  const res = props.data.res;
  const labels = props.data.labels;
  const data = {
    labels,
    datasets: [
      {
        label: "Waste Donations",
        data: res,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(180, 205, 86)",
          "rgba(153, 102, 255)",
        ],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div>
      <Bar
        height={100}
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: true,
        }}
      />
    </div>
  );
};

export default NewBarChart;
