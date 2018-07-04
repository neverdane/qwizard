import React from "react";
import CardsAdmin from "./CardsAdmin";
import Sidebar from "../../components/Layout/Sidebar";
import AskedQuestionsEvolution from "../Stats/AskedQuestionsEvolution";
import CoveredQuestionsCount from "../Stats/CoveredQuestionsCount";
import CorrectAnswersCount from "../Stats/CorrectAnswersCount";
import MostUsedLabelsDistribution from "../Stats/MostUsedLabelsDistribution";
import TotalQuestionsCount from "../Stats/TotalQuestionsCount";
import Content, { Section, Title } from "../../components/Layout/Content";

export default () => (
  <React.Fragment>
    <Sidebar>
      <AskedQuestionsEvolution />
      <CoveredQuestionsCount />
      <CorrectAnswersCount />
      <MostUsedLabelsDistribution />
      <TotalQuestionsCount flex={1} />
    </Sidebar>
    <Content>
      <Section>
        <Title>New Question</Title>
        <CardsAdmin />
      </Section>
    </Content>
  </React.Fragment>
);
