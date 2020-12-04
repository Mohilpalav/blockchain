import React from 'react';
import Navbar from 'react-bootstrap/Navbar'

class Footer extends React.Component {

  render(){
    return (
      <div className="Footer">
        <Navbar sticky="bottom" bg="dark" variant="dark">
          <Navbar.Text className="mx-auto">
              Developed by Mohil Palav, Marc Ivan and Aditya Chaudhari.
          </Navbar.Text>
        </Navbar>
      </div>
    );
  }
}

export default Footer;
