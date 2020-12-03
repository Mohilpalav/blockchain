import React from 'react';
import Alert from 'react-bootstrap/Alert'

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
    const response = await Handler.get(
        'getBlockchain'
    );
    
    this.setState({BlockChain: response.data});
  }

  onSetDifficulty = (value) => {
    this.setState({Difficulty: value});
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
        return <p> Add a block to dsiplay.</p>
      }
    }

    if(this.state.Difficulty === -1) {
      return <SetDifficulty onSetDifficulty={this.onSetDifficulty} />
    }
    
    else{

      return (
        <div className="BlockChain">
           <Alert  variant="info">
             <Alert.Heading>
               Difficulty Selected: {this.state.Difficulty}
             </Alert.Heading>
           </Alert>

           <AddBlock getBlockChain={this.getBlockChain} />
          
          <DisplayBlocks shouldDisplay={this.state.BlockChain}/>
   
         </div>
       );
     }
    }
    
}

export default BlockChain;
