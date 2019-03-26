import React, { Component } from 'react';
import { Header, Pizza, Price, Ingredients } from './components';
import * as IngredientsService from './services/backend/ingredients.service';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: [],
      pizza: {},
      price: {}
    };
  }

  async componentDidMount() {
    const ingredients = await IngredientsService.get();
    this.setState({ ingredients });
    console.log(ingredients);
  }

  onIngredientClick(ingredient) {
    console.log(ingredient);
  }

  render() {
    return (
      <div className="pw-app">
        <Header className="pw-header" />
        <div className="pw-body">
          <Pizza />
          <Ingredients
            ingredients={this.state.ingredients}
            onIngredientClick={this.onIngredientClick.bind(this)}
          />
        </div>
        <div className="pw-footer">
          <Price />
        </div>
      </div>
    );
  }
}

export default App;
