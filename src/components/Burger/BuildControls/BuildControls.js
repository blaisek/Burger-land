import React from 'react';
import Styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'}
];


const buildControls = (props) => (

    <div className={Styles.BuildControls}>
        <p><strong>Current Price: {props.price.toFixed(2)} CHF</strong></p>
        {controls.map(ctrl => (
            <BuildControl key={ctrl.label} label={ctrl.label}
            added={() => props.ingredientAdded(ctrl.type)}
            removed={()=> props.ingredientRemoved(ctrl.type)}
            disabled={props.disabled[ctrl.type]}/>
        ))}
        <button className={Styles.OrderButton}
                disabled={!props.purchasable} onClick={props.ordered}>ORDER NOW</button>
    </div>


);




export default buildControls;