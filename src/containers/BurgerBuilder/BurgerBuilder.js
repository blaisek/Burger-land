import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import instance from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.5,
    bacon: 1.0
}
class BurgerBuilder extends Component {

    // old style
    // constructor(props) {
    //     super(props);
    //     this.state = {}
    // }

    state = {

        ingredients: null,
        totalPrice: 1.5,
        purchasable: false,
        orderNow: false,
        loading: false,
        error: false
    }

    componentDidMount () {
        instance.get('https://burger-factory-c7518.firebaseio.com/ingredients.json')
        .then(response => {
            this.setState({ingredients: response.data})            
        })
        .catch(error => this.setState({error: true})
        )
    }

    updatePurchaseState = (ingredients) => {
         
        const sum = Object.keys(ingredients)
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum,el) => {
            return sum + el;
        },0);
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return ;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceSoustraction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSoustraction;

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    orderHandler () {
        this.setState({orderNow:true});
    }

    removeOrderHandler () {
        this.setState({orderNow:false});
    }

    orderContinueHandler () {
        //alert('continue !')
        this.setState({loading: true});
        const order = {
            ingredients : this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'blaze',
                address: {
                    street: 'rue des Maraichers',
                    zipCode: '1205',
                    country: 'switzerland'
                },
                email: 'test@test.com'
            },
            deliveryMethod: 'fastest'
        }

        instance.post('/orders.json',order)
            .then(resp => {this.setState({loading:false , orderNow:false})})
            .catch(error => {this.setState({loading:false , orderNow:false})});
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0 ;
        }
        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                        <BuildControls price={this.state.totalPrice} ingredientAdded={this.addIngredientHandler}
                            ingredientRemoved={this.removeIngredientHandler}
                            disabled={disabledInfo}
                            purchasable={this.state.purchasable}
                            ordered={() => this.orderHandler()} />
                </Aux>
            );
        orderSummary = <OrderSummary 
        price={this.state.totalPrice}
        ingredients={this.state.ingredients}
        Cancel={()=> this.removeOrderHandler()}
        Continue={()=> this.orderContinueHandler()} />
        }
        if(this.state.loading) {
            orderSummary = <Spinner />
        }
        
        return (
            <Aux>
                <Modal show={this.state.orderNow} modalClosed={() => this.removeOrderHandler()}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}

export default WithErrorHandler(BurgerBuilder,instance) ;