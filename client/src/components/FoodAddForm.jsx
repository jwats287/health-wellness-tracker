import React, { Component } from 'react';
import axios from 'axios';

class FoodAddForm extends Component {

    constructor() {
        super();
        this.state = {
            foodItem: {
                name: '',
                calories: 0
            }
        }
    }
    _handleChange = (e) => {
        const attributeName = e.target.name;;
        const attributeValue = e.target.value;
        const foodItem = {...this.state.foodItem};
        foodItem[attributeName] = attributeValue;
        this.setState({ foodItem })
    }
    _handleSubmit = (e) => {
        e.preventDefault();
        const payload = this.state;
        axios.post(`/api/food/create`, payload)
        .then((res) => {
            console.log("success")
            this.props.getFoodItems();
            this.setState({foodItem: {name: '', calories: 0}})
        }).catch(err => console.log(err));
    }

    render() {
        return (
            <div className="addNewFood">
            <div className="row">
                <h2>Add new food:</h2>
                <form className="addNewFoodForm" onSubmit={this._handleSubmit}>
                <div className="form-field">
                    <label htmlFor="name">Food Name: </label>
                        <input 
                            type="text" 
                            onChange={this._handleChange} 
                            value={this.state.foodItem.name} 
                            name="name"
                            placeholder="New Food Name"
                        />
                </div>
                <div className="form-field">
                <label htmlFor="calories">Food Calories: </label>
                        <input 
                            type="text" 
                            onChange={this._handleChange} 
                            value={this.state.foodItem.calories} 
                            name="calories"
                            placeholder="New Food Calories"
                        />
                </div>
                <button className="primary">Add new Food to Database</button>
                </form>
            </div>
            </div>
        );
    }
}

export default FoodAddForm;