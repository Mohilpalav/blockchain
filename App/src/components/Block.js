import React from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import Handler from './api/Handler'

class Block extends React.Component {

    constructor(props) {
        super(props);
        this.state = {blockID: props.block.BlockID, previousHash: props.block.PrevHash, blockData: props.block.Data, blockNonce: props.block.Nonce, blockHash:props.block.Hash, blockMined: props.block.Mined};
    }

    setColor(value) {
        
        if (value){ 
            return  'success'
        } else {  
            return  'danger'
        }
    }

    sendChangeRequest = async (index,data) => {
        Handler.get(  
            'changeData', {
            params: {index: index, data: data},
        })
        .then(() => {
            this.props.getBlockChain();
        }, (error) => {
        if (error) {
            console.log(error);
        }
        });
    }

    sendMineRequest = async () => {
        Handler.get(  
            'mine', {
            params: {index: this.props.index},
        })
        .then(() => {
            this.props.getBlockChain();
        }, (error) => {
        if (error) {
            console.log(error);
        }
        });
    }

    onChange = (event) => {
        this.setState({blockData: event.target.value});
        setTimeout(() => {
            this.sendChangeRequest(this.props.index, event.target.value);  
          }, 3000);
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.sendMineRequest();
    }

    render() {
		return (
            <div className="Block">
            
                <Card border={this.setColor(this.state.blockMined)}>
                <Card.Body>
                <Form onSubmit= {this.onSubmit}>
                    <Form.Group as ={Row} controlId="blockID">            
                        <Col>
                            <Form.Label size="sm" column>
                                Block ID
                            </Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" value={this.state.blockID} size="sm" readOnly />
                        </Col>
                    </Form.Group>

                    <Form.Group as ={Row} controlId="blockParent">            
                        <Col>
                            <Form.Label size="sm" column>
                                Parent
                            </Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" value={this.state.previousHash} size="sm" readOnly />
                        </Col>
                    </Form.Group>

                    <Form.Group as ={Row} controlId="blockData">            
                        <Col>
                            <Form.Label size="sm" column>
                                Block Data
                            </Form.Label>
                        </Col>
                        <Col>
                            <Form.Control as ="textarea" value={this.state.blockData} onChange={this.onChange} rows={3} size="sm" />
                        </Col>
                        
                    </Form.Group>

                    <Form.Group as ={Row} controlId="blockNonce">            
                        <Col>
                            <Form.Label size="sm" column>
                                Nonce
                            </Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" value={this.state.blockNonce} size="sm" readOnly />
                        </Col>
                    </Form.Group>

                    <Form.Group as ={Row} controlId="blockHash">            
                        <Col>
                            <Form.Label size="sm" column>
                                Hash
                            </Form.Label>
                        </Col>
                        <Col>
                            <Form.Control type="text" value={this.state.blockHash} size="sm" readOnly />
                        </Col>
                    </Form.Group>

                    <Form.Group as ={Row} controlId="blockMine">    
                        <Col>
                            <Form.Label size="sm" column >
                            
                            </Form.Label>
                        </Col> 
                        <Col>
                            <Button variant="primary" type="submit">
                                Mine
                            </Button>
                        </Col>
                    </Form.Group>
                    
                </Form>
                </Card.Body>
                </Card>
            
            </div>
            
		)
	}
}

export default Block;