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

storiesOf("Card", module)
  .addDecorator(story => <ThemeWrapper>{story()}</ThemeWrapper>)
  .add("creation", () => (
    <Card isZipDisplayed={false}>
      <CardEditor
        mode="creation"
        selectableLabelsOptions={[
          { label: "histoire", value: "histoire" },
          { label: "géographie", value: "géographie" },
          { label: "musique", value: "musique" },
          { label: "cinéma", value: "cinéma" }
        ]}
      />
    </Card>
  ))
  .add("edition", () => (
    <Card>
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
    </Card>
  ))
  .add("summary", () => (
    <Card>
      <CardSummary
        question="En quelle année a eu lieu la bataille de Marignan ?"
        response="1515"
        labels={[{ name: "histoire" }]}
      />
    </Card>
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
