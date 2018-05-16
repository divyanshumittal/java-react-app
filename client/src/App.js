import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import AddPet from './components/AddPet';
import Home from './components/Home';

class App extends Component {

  render() {
    return (
     <BrowserRouter>
         <div>
             <header className="App-header">
                <h1 className="App-title">Welcome to Pet Store</h1>
             </header>
             <Route exact path="/" component={Home} />
             <Route path="/addPet/:orderId" component={AddPet} />
         </div>
      </BrowserRouter>
    );
  }
}

export default App;
