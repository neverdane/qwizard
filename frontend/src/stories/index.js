import React from "react";

import { storiesOf } from "@storybook/react";

import ThemeWrapper from "../components/ThemeWrapper";
import Input, { InputAdornment } from "../components/Form/Input";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/fontawesome-pro-light";
import theme from "../theme";
import Autocomplete from "../components/Form/Autocomplete";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import CardEditor from "../components/Card/CardEditor";
import CardSummary from "../components/Card/CardSummary";
import QuestionsChart from "../components/Chart/QuestionsChart";
import { DateTime } from "luxon";
import Tag from "../components/Card/Tag";

storiesOf("Card", module)
  .addDecorator(story => <ThemeWrapper>{story()}</ThemeWrapper>)
  .add("creation", () => (
      <CardEditor
        mode="creation"
        selectableLabelsOptions={[
          { label: "histoire", value: "histoire" },
          { label: "géographie", value: "géographie" },
          { label: "musique", value: "musique" },
          { label: "cinéma", value: "cinéma" }
        ]}
      />
  ))
  .add("edition", () => (
      <CardEditor
        mode="edition"
        question="En quelle année a eu lieu la bataille de Marignan ?"
        response="1515"
        labels={[{ label: "histoire", value: "histoire" }]}
        selectableLabelsOptions={[
          { label: "histoire", value: "histoire" },
          { label: "géographie", value: "géographie" },
          { label: "musique", value: "musique" },
          { label: "cinéma", value: "cinéma" }
        ]}
      />
  ))
  .add("summary", () => (
      <CardSummary
        question="En quelle année a eu lieu la bataille de Marignan ?"
        response="1515"
        labels={[{ name: "histoire" }]}
      />
  ));

storiesOf("Input", module)
  .addDecorator(story => <ThemeWrapper>{story()}</ThemeWrapper>)
  .add("default", () => (
    <Input
      startAdornment={
        <InputAdornment position="start">
          <FontAwesomeIcon
            icon={faQuestionCircle}
            color={theme.colors.primary}
            size="xs"
          />
        </InputAdornment>
      }
      value="Test"
    />
  ))
  .add("autocomplete", () => (
    <Autocomplete
      startAdornment={
        <InputAdornment position="start">
          <FontAwesomeIcon
            icon={faQuestionCircle}
            color={theme.colors.primary}
            size="xs"
          />
        </InputAdornment>
      }
      value="Test"
    />
  ));

storiesOf("Button", module)
  .addDecorator(story => <ThemeWrapper>{story()}</ThemeWrapper>)
  .add("default", () => <Button>Add Question</Button>);

storiesOf("Tag", module)
  .addDecorator(story => <ThemeWrapper>{story()}</ThemeWrapper>)
  .add("default", () => <Tag>histoire</Tag>);

storiesOf("Chart", module)
  .addDecorator(story => <ThemeWrapper>{story()}</ThemeWrapper>)
  .add("questions", () => {
    const dates = [...Array(30).keys()].reverse().map(numberOfDays => {
      return DateTime.local()
        .minus({ days: numberOfDays })
        .valueOf();
    });

    const data = [
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      12,
      15,
      35,
      13,
      25,
      26,
      16,
      37,
      57,
      0,
      34,
      24,
      14,
      36,
      24,
      34,
      0,
      2,
      0,
      35,
      46,
      24
    ].map((value, index) => ({
      x: dates[index],
      y: value
    }));

    return (
      <div style={{ background: theme.colors.dark }}>
        <QuestionsChart series={[{ data }]} />
      </div>
    );
  });
