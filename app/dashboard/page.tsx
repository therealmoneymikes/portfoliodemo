"use client";
import React, { useState } from "react";
import MainDashboardComponent from "./MainDashboardComponent";


// interface Props {
//   params: { id: string };
// }

// const fallbackImage =
//   "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop";
// const dashboardOptions = ["Overview", "Products", "Settings"];
//make sure the component is captailised otherwise it's regular function
const Dashboard = () => {

  return (
      <MainDashboardComponent/>
  );
};

export default Dashboard;
