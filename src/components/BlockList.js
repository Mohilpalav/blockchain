import React from 'react';
import Block from './Block';

class BlockList extends React.Component {

    getBlockChain = () => {
        this.props.getBlockChain();
    }

    render() {
        
        const Blocks = () => this.props.blocks.map((block, index) => {
            return <div key={index} className="col-sm-4"><Block index={index} getBlockChain={this.getBlockChain} block={block}/></div>
        });

    return <Blocks />

    }
}

export default BlockList;
