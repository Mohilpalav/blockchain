import React from 'react';

import Header from './Header';
import BlockChain from './BlockChain';
import Footer from './Footer';


class App extends React.Component {

  render(){
    return (
      <div className="App">
        <Header />
        <BlockChain />
        <Footer />
      </div>
    );
  }
}

export default App;
