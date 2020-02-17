import React from 'react'; 
import styles from './ToggleMenu.module.css';

const toggleMenu = (props) => (

<div className={styles.DrawerToggle} onClick={props.clicked}>

    <div></div>
    <div></div>
    <div></div>
</div>
)


export default toggleMenu;