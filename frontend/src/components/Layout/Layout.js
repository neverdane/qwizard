import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import {Flex} from "grid-styled";

const Layout = Flex.extend`
  height: 100%;
`;

export default ({children, ...props}) => {
  return <Layout {...props}>
    <Navbar/>
    <Sidebar/>
    {children}
  </Layout>;
};
