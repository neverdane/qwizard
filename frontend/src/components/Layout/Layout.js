import React from "react";
import Sidebar from "./Sidebar";
import {Flex} from "grid-styled";

const Layout = Flex.extend`
  height: 100%;
`;

export default ({children, ...props}) => {
  return <Layout {...props}>
    <Sidebar/>
    {children}
  </Layout>;
};
