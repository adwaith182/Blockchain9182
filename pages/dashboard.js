import React from "react";
import authWrapper from "../helper/authWrapper";
import FundRiserForm from "../components/FundRiserForm";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const projectsList = useSelector((state) => state.projectReducer.projects);

  return (
    <div className="px-2 py-4 flex flex-col lg:px-12 lg:flex-row ">
      <div className="card lg:w-5/12 h-fit my-4">
        <FundRiserForm />
      </div>
    </div>
  );
};

export default authWrapper(Dashboard);
