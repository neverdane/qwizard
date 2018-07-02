import React from "react";
import CardsAdmin from "./CardsAdmin";
import Sidebar from "../../components/Layout/Sidebar";
import AskedQuestionsEvolution from "../Stats/AskedQuestionsEvolution";
import CoveredQuestionsCount from "../Stats/CoveredQuestionsCount";
import CorrectAnswersCount from "../Stats/CorrectAnswersCount";
import MostUsedLabelsDistribution from "../Stats/MostUsedLabelsDistribution";

export default () => (
  <React.Fragment>
    <Sidebar>
      <AskedQuestionsEvolution />
      <CoveredQuestionsCount />
      <CorrectAnswersCount />
      <MostUsedLabelsDistribution />
    </Sidebar>
    <CardsAdmin />
  </React.Fragment>
);
