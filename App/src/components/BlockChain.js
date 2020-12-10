import React from 'react';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import BlockList from './BlockList';
import SetDifficulty from './SetDifficulty';
import AddBlock from './AddBlock';
import Handler from './api/Handler';

class BlockChain extends React.Component {
  state = { Difficulty: -1, BlockChain: null };

  componentDidMount(){
    this.getBlockChain();
  }

  getBlockChain = async () => { 
    Handler.get(
      'getBlockchain'
    )
    .then((response) => {
      this.setState({BlockChain: response.data});
    }, (error) => {
    if (error) {
        console.log(error);
    }
    });
  }

  onSetDifficulty = (value) => {
    this.setState({Difficulty: value});
    this.getBlockChain();
  }

  render(){

    const DisplayBlocks = (value) => { 
      
      if(value.shouldDisplay !== null) {
        return (
          <div className="row">
              <BlockList getBlockChain={this.getBlockChain} blocks={this.state.BlockChain.Blocks}/>
          </div>
        );
      } else {
        return (
        <Alert variant="success">
        <Alert.Heading>No Blocks to display!</Alert.Heading>
        <p>
         Add a block to the blockchain.
        </p>
        </Alert>
      );
      }
    }

    if(this.state.Difficulty === -1) {
      return <div className="p-4"><SetDifficulty onSetDifficulty={this.onSetDifficulty} /></div>
    }
    
    else{

      return (
        <div className="BlockChain" style={{paddingBottom: "10%"}}>
          <Card className="p-4" border="light">
            <Card.Body>
              <Card.Title>Current Difficulty set to {this.state.Difficulty}</Card.Title>
              <Button variant="primary" href="./App">Reset</Button>
            </Card.Body>
          </Card>
           
          <AddBlock getBlockChain={this.getBlockChain} />

          <div className="p-4"><DisplayBlocks shouldDisplay={this.state.BlockChain}/></div>
          
   
         </div>
       );
     }
    }
    
}

export default BlockChain;
