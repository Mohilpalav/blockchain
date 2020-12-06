import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import Handler from './api/Handler'

class AddBlock extends React.Component {

    state = { Data: null }
    
    sendRequest = async () => {
        Handler.get(  
          'addBlock', {
          params: {data: this.state.Data},
        })
        .catch(function (error) {
            console.log(error);
        });
        this.props.getBlockChain();
      }

    onBlockAdd = (event) => {
        event.preventDefault();
        this.sendRequest();
    }

    onChange = (event) => {
        this.setState({Data: event.target.value});
    }

    render(){
        return (
        <div className="AddBlock">
            <Card border="light">
            <Card.Body>
            <Form onSubmit= {this.onBlockAdd} style={{ width: '40rem' }}>
            <Form.Group as ={Row} controlId="addBlock">    
                        <Col>
                            <Form.Label size="lg" column >
                                Add a Block:
                            </Form.Label>
                        </Col> 
                        <Col>
                            <Form.Control onChange={this.onChange} as ="textarea" rows={3} size="lg" />
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">
                                    Add
                            </Button>
                        </Col>            
            </Form.Group>
            </Form>
            </Card.Body>
            </Card>
        </div>
        );
    }
}

export default AddBlock;
