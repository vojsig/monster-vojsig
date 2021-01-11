import {Component} from 'react';
import './App.css';

import { CardList } from './components/card-list/card-list.component'
import { SearchBox } from './components/search-box/search-box.component'

// React.Component or source { Component } & Component
//class App extends React.Component {}

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    }
    //configure passing this context !
    // this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => this.setState({ monsters: users }));
  }
  handleChange = (e) => {
    const { searchField } = this.state;
    this.setState({ searchField: e.target.value }, () => {
      console.log(searchField);
    })
  }
  render() {
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>Monsters</h1>
        <SearchBox
          placeholder = 'search monster !' 
          handleChange = {this.handleChange}
        />
        <CardList monsters = {filteredMonsters} />
      </div>
    );
  }
}

export default App;
