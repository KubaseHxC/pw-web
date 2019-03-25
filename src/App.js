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

    async createIngredient(ingredient) {
        const newIngredient = await IngredientsService.create(ingredient);
        if(newIngredient instanceof Error) {
            
        } else {
            this.setState({
                ingredients: this.state.ingredients.concat([newIngredient])
            });
        }
    }

    onIngredientClick(ingredient) {
        console.log(ingredient);
    }

    render() {
        return (
            <div className='App'>
                <Header className='App-header' />
                <Pizza />
                <Ingredients ingredients={this.state.ingredients} onIngredientClick={this.onIngredientClick.bind(this)} onCreateClick={this.createIngredient.bind(this)} />
                <Price />
            </div>
        );
    }
}

export default App;
