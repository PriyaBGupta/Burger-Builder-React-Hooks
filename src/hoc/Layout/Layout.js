import React, { useState } from 'react';
import styles from './Layout.module.css';
import Auxillary from '../Auxillary/Auxillary';
import Toolbar from '../../component/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../component/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    }
    const sideDrawerToggleHandler = () => {
       setShowSideDrawer(!showSideDrawer);
    }
        return (
            <Auxillary>
                <Toolbar 
                    drawerToggleClicked={sideDrawerToggleHandler}
                    isAuth = {props.isAuthenticate} />
                <SideDrawer
                    open={showSideDrawer}
                    closed={sideDrawerClosedHandler}
                    isAuth = {props.isAuthenticate} />
                <main className={styles.content}>
                    <div>{props.children}</div>
                </main>
            </Auxillary>
        );
    }
//we would have connected state to navigation item which is presentation component but that is not the best way to do. 
//It is better to connect state only in containers.  Even though layout is not container but still wrapping component
const mapStateToProps = (state) => {
    return {
        isAuthenticate: state.auth.token !== null
    }
}
export default connect(mapStateToProps)(Layout);

