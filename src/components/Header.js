import React from 'react';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Navbar from 'react-bootstrap/Navbar'
import logo from './img/logo.png';

class Header extends React.Component {

  render(){
    return (
      <div className="Header">
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
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

        <Jumbotron>
          <h1>Welcome!</h1>
          <p>
            This project simulates the behaviour of a BlockChain.
          </p>
        </Jumbotron>
      </div>
    );
  }
}

export default Header;

