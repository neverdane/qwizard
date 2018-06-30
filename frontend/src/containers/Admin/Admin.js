import React from "react";
import CardsAdmin from "./CardsAdmin";
import Sidebar from "../../components/Layout/Sidebar";
import AskedQuestionsEvolution from "../Stats/AskedQuestionsEvolution";

export default () => (
  <React.Fragment>
    <Sidebar>
      <AskedQuestionsEvolution />
    </Sidebar>
    <CardsAdmin />
  </React.Fragment>
);
