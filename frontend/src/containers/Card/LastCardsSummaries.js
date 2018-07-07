import React from "react";
import { animated, Transition } from "react-spring";
import CardSummary, { List } from "../../components/Card/CardSummary";
import CardsQuery from "../Apollo/CardsQuery";

export default () => (
  <CardsQuery>
    {({ data: { cards: cardsNodes }, client, loadingCards }) => {
      if (loadingCards || !cardsNodes) return "loading";

      const cards = cardsNodes.edges.map(
        ({ node: { id, sentence, answer, labels } }) => ({
          id,
          question: sentence,
          response: answer,
          labels: labels.edges
            ? labels.edges.map(({ node: label }) => label)
            : []
        })
      );

      return (
        <List>
          <Transition
            native
            config={{ tension: 120, friction: 30 }}
            keys={cards.map(({ id }) => `card-${id}`)}
            from={{ opacity: 0, transform: "scaleY(0)" }}
            enter={{ opacity: 1, transform: "scaleY(1)" }}
            leave={{ opacity: 0, pointerEvents: "none" }}
          >
            {cards.map(({ id, question, response, labels }) => styles => {
              return (
                <animated.div key={`card-${id}`} style={styles}>
                  <CardSummary
                    key={id}
                    question={question}
                    response={response}
                    labels={labels}
                  />
                </animated.div>
              );
            })}
          </Transition>
        </List>
      );
    }}
  </CardsQuery>
);
