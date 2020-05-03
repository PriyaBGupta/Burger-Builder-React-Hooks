import React, { useState, useEffect } from 'react';
import Input from '../../component/UI/Input/Input';
import Button from '../../component/UI/Button/Button';
import classes from './Auth.module.css';
import { connect } from 'react-redux';
import * as action from '../../store/action/index';
import Spinner from '../../component/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = (props) => {

    const [control, setControl] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Your Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    })
    const [isSignup, setIsSignUp] = useState(true);
    const inputChangedHandler = (event, controlName) => {
        //we are not checking whole form validation 
        const updateControl = updateObject(control[controlName], {
            value: event.target.value,
            valid: checkValidity(event.target.value, control[controlName].validation),
            touched: true
        })
        const updatedControls = updateObject(control,
            { [controlName]: updateControl });
        setControl(updatedControls);
    }
    const submitHandler = (event) => {
        event.preventDefault();
        props.onSubmitHandler(control.email.value, control.password.value, isSignup);

    }
    const switchAuthModeHandler = () => {
        setIsSignUp(!isSignup);
    }
    useEffect(() => {
        if (!props.buildingBurger && props.authRedirectPath !== '/') {
            //to prevent checkout getting called even though burger is not built
            props.onSetAuthRedirectPath();
        }
    }, [])
    const formElementArray = [];
    for (let key in control) {
        formElementArray.push({
            id: key,
            config: control[key]
        })
    }
    let form = (<form onSubmit={submitHandler}>
        {formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => inputChangedHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched} />
        ))}
    </form>)
    if (props.loading) {
        form = <Spinner></Spinner>
    }
    let errorMessage = null;
    if (props.error) {
        errorMessage = <p>{props.error.message}</p>;
    }
    let authRedirect = null;
    if (props.isAuthenticated) {
        authRedirect = <Redirect to={props.authRedirectPath} />
    }
    return (
        <div className={classes.Auth}>
            {authRedirect}
            {errorMessage}
            {form}
            <Button
                btnType="Success"
                clicked={submitHandler}
            >SUMBIT</Button>
            <br></br>
            <Button
                btnType="Danger"
                clicked={switchAuthModeHandler}
            >Switch to{isSignup ? 'Sign In' : 'Sign Up'}</Button>
        </div>
    )

}

const mapDispatchToProps = dispatch => {
    return {
        onSubmitHandler: (email, password, isSignup) => dispatch(action.auth(email, password, isSignup)),
        onSetAuthRedirectPath: () => dispatch(action.setAuthRedirectPath('/'))
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authenticateRedirect
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);