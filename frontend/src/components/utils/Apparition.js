import React from "react";
import { Transition, animated } from "react-spring";

const Apparition = ({ from, children, delay }) => (
  <Transition
    native
    from={from || { opacity: 0, x: 50 }}
    enter={{ opacity: 1, x: 0 }}
    config={{ tension: 280, friction: 120 }}
    delay={delay}
  >
    {({ x, opacity }) =>
      children({
        opacity,
        transform: x.interpolate(x => `translate3d(${x}%,0,0)`)
      })
    }
  </Transition>
);

export default Apparition;

export const ApparitionDiv = ({ children, className, ...props }) => (
  <Apparition {...props}>
    {style => <animated.div style={style} className={className} children={children} />}
  </Apparition>
);
