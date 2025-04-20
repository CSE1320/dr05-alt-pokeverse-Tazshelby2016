import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/Navbar";
import {Container} from 'semantic-ui-react'

const Layout = () => {
  return (
    <>
      <Container style={{ height: '100%' }}>
        <Navbar />
        <Outlet />
      </Container>
    </>
  );
};

export default Layout;