import React from "react";
import Navbar from "react-bootstrap/Navbar";

function TopBar() {
  return (
    <Navbar bg="primary" expand="lg" variant="dark">
      <Navbar.Brand href="#home">Chat App</Navbar.Brand>
    </Navbar>
  );
}

export default TopBar;