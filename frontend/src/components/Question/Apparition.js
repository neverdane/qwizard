import React from "react";
import {Transition, interpolate} from "react-spring";

const Apparition = ({from, children, delay, config, stagePosition, keys = ['default']}) => (
  <Transition
    native
    keys={keys}
    from={from || {opacity: 0, rotateX: -90, y: 50, top: 0}}
    enter={{opacity: 1, rotateX: 0, y: 0, top: 0}}
    leave={{opacity: 0, rotateX: 90, y: -50, top: -180}}
    config={config || {tension: 280, friction: 60}}
    delay={delay}
  >
    {[
      ({y, rotateX, top, opacity}) => {
        return children({
          opacity,
          transform: interpolate([y, rotateX], (y, rotateX) => `perspective(1500px) rotateX(${rotateX}deg) translate3d(0, ${y}%, 0)`),
          top: interpolate([top], (top) => `${top}px`),
        });
      }
    ]}
  </Transition>
);

export default Apparition;
