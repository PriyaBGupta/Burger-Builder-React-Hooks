import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import * as action from '../../../store/action/index';

const Logout = (props) => {
    const {onLogout} = props;
    useEffect(()=>{
        onLogout();
    },[onLogout])

    return(
        <Redirect to='/'></Redirect>
    )
}
 const mapDispatchToProps = (dispatch) =>{
     return{
         onLogout : () => dispatch(action.authLogout())
     }
 }

export default connect(null, mapDispatchToProps)(Logout)