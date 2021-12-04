import React from "react";
import { ClipLoader } from "react-spinners";

export default function pageLoader() {
  return (
    <div className="page-loader">
      <ClipLoader size="60" color='black'></ClipLoader>
    </div>
  );
}
