import React from "react";
import { Flex } from "grid-styled";

export const Sentence = Flex.extend``;

export const SentencePart = Flex.extend`
  color: ${props => props.theme.colors.transparentBlack};
  margin-right: 0.3em;
  text-transform: uppercase;
  font-size: 1.5em;
`;

export const SentenceInput = SentencePart.extend`
  color: ${props => props.theme.colors.white};
`;
