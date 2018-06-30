import React from "react";
import CardsAdmin from "./CardsAdmin";
import Sidebar from "../../components/Layout/Sidebar";
import QuestionsChart from "../Stats/QuestionsChart";

export default () => (
  <React.Fragment>
    <Sidebar>
      <QuestionsChart />
    </Sidebar>
    <CardsAdmin />
  </React.Fragment>
);
