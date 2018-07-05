import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import AddPet from './components/AddPet';
import AddVet from './components/AddVet';
import Home from './components/Home';

class App extends Component {

  render() {
    return (
     <BrowserRouter>
         <div>
             <header className="App-header">
                <h1 className="App-title">Welcome to Pet Store</h1>
             </header>
             <div className="App">
                <Route exact path="/" component={Home} />
                <Route path="/addPet/:ownerId" component={AddPet} />
                <Route path="/addVet" component={AddVet} />
             </div>
         </div>
      </BrowserRouter>
    );
  }
}

export default App;
