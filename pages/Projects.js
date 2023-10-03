import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import authWrapper from "../helper/authWrapper";
import FundRiserCard from "../components/Projectcard";

const Dashboard = () => {
  const projectsList = useSelector((state) => state.projectReducer.projects);

  return (
    <div className="px-2 py-4 flex flex-col lg:px-12 lg:flex-row ">
      <div className="lg:w-7/12 my-2 lg:my-0 lg:mx-2">
        {projectsList !== undefined ? (
          projectsList.length > 0 ? (
            projectsList.map((data, i) => (
              <FundRiserCard props={data} key={i} />
            ))
          ) : (
            <h1 className="text-2xl font-bold text-orange-700 text-center font-sans">
              No fund project has been raised
            </h1>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default authWrapper(Dashboard);
