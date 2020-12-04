import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import logo from './img/logo.png';

class Header extends React.Component {

  render(){
    return (
      <div className="Header">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="./App">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            BlockChain Demo
          </Navbar.Brand>
        </Navbar>
        
        <Jumbotron fluid>
          <Container>
          <h1>SE-575 BlockChain Demo.</h1>
            <p>
              This project simulates the behaviour of a BlockChain. To start, please select the difficulty.
            </p>
          </Container>
        </Jumbotron>
      </div>
    );
  }
}

export default Header;

