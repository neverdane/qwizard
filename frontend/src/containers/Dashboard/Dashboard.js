import React from "react";
import CardCreator from "../Card/CardCreator";
import Sidebar from "../../components/Layout/Sidebar";
import AskedQuestionsEvolution from "../Stats/AskedQuestionsEvolution";
import CoveredQuestionsCount from "../Stats/CoveredQuestionsCount";
import CorrectAnswersCount from "../Stats/CorrectAnswersCount";
import MostUsedLabelsDistribution from "../Stats/MostUsedLabelsDistribution";
import TotalQuestionsCount from "../Stats/TotalQuestionsCount";
import Content, { Section, Title } from "../../components/Layout/Content";
import LastCardsSummaries from "../Card/LastCardsSummaries";
import QuizCreator from "../Quiz/QuizCreator";

export default () => (
  <React.Fragment>
    <Sidebar>
      <AskedQuestionsEvolution />
      <CoveredQuestionsCount />
      <CorrectAnswersCount />
      <MostUsedLabelsDistribution flex={1} />
      <TotalQuestionsCount style={{ height: "8em" }} />
    </Sidebar>
    <Content>
      <Section>
        <Title>New Question</Title>
        <CardCreator />
      </Section>
      <Section flex={1}>
        <Title>Last Questions</Title>
        <LastCardsSummaries />
      </Section>
      <Section backgroundMode="gradient" style={{ height: "8em" }}>
        <Title>New Quiz</Title>
        <QuizCreator />
      </Section>
    </Content>
  </React.Fragment>
);
