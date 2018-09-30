import React from "react";
import { Transition, animated } from "react-spring";

const Apparition = ({ from, children, delay, config, keys=['default'] }) => (
  <Transition
    native
    keys={keys}
    from={from || { opacity: 0, x: 50 }}
    enter={{ opacity: 1, x: 0 }}
    config={config || { tension: 280, friction: 120 }}
    delay={delay}
  >
    {[
      ({ x, opacity }) =>
        children({
          opacity,
          transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
        })
    ]}
  </Transition>
);

export default Apparition;

export const ApparitionDiv = ({ children, className, ...props, keys=['default'] }) => (
  <Apparition {...props} keys={keys}>
    {style => (
      <animated.div key={keys[0]} style={style} className={className} children={children} />
    )}
  </Apparition>
);
