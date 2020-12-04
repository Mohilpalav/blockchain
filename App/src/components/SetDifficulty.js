import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Handler from './api/Handler'


class SetDifficulty extends React.Component {

  state = { Difficulty:0 };

  sendRequest = async (Difficulty) => {
    Handler.get(  
    'setDifficulty', {
    params: {difficulty: Difficulty},
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  onSetDifficulty = (event) => {
    event.preventDefault();
    this.sendRequest(this.state.Difficulty);
    this.props.onSetDifficulty(this.state.Difficulty);
  }

  onChange = (event) => {
    this.setState({Difficulty: event.target.value});
  }

  render(){
    return (
  
      <div className="SetDifficulty" style={{ height: '390px'}}> 
        <Form onSubmit={this.onSetDifficulty} style={{ width: '25rem' }}>
                <Form.Group as ={Row} controlId="selectDifficulty">    
                    <Col>
                      <Form.Label size="lg" column >
                          Select Difficulty:
                      </Form.Label>
                    </Col> 
                    <Col>
                      <Form.Control onChange={this.onChange} min="0" max="10" type="number" size="lg" />
                    </Col>
                    <Button variant="primary" type="submit">
                            Select
                    </Button>
                </Form.Group>
        </Form>
      </div>
    );
  }
}

export default SetDifficulty;

