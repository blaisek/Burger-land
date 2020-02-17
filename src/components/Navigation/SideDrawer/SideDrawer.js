import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import styles from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {


    return (

        <Aux>
                           
            <Backdrop show={props.open} clicked={props.closed}/>
                    <div className={styles.SideDrawer} style={{transform: props.open ? 'translateX(0)': 'translateX(-100vh)' }}>
                    <div className={styles.Logo}><Logo /></div> 
                            <nav>
                                <NavigationItems />
                            </nav>
                    </div>

        </Aux>
        
    );

}






export default sideDrawer;