import React from 'react';
import styles from './Toolbar.module.css';
import Logo from '../../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleMenu from '../SideDrawer/DrawerToggle/ToggleMenu';

const toolbar = (props) => (


    <header className={styles.Toolbar}>
        
        <ToggleMenu clicked={props.ToggleMenuClicked} /> 
            <div className={styles.Logo}>
                <Logo />
            </div>
            <nav className={styles.DesktopOnly}>
                <NavigationItems />
            </nav>
    </header>
);



export default toolbar ;