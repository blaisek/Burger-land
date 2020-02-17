import React from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {

        const ingredientsSummary = Object.keys(props.ingredients) 
              .map(igKey => {
              return <li key={igKey}>
                  <span style={{textTransform: 'capitalize'}}>{igKey}
                  </span>: {props.ingredients[igKey]}
                  </li>
              });  

    return (
        <Aux>   
            <h3>Your Order</h3>  
            <p> Tasty Burger with the following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <strong><p>Price: {props.price.toFixed(2)} CHF</p></strong> 
            <p>Continue to CheckOut</p>
            <Button btnType="Danger" clicked={props.Cancel}>CANCEL</Button>
            <Button btnType="Success" clicked={props.Continue}>CONTINUE</Button>
        </Aux>
    )


};


export default orderSummary;