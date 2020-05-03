import React, { useState, useEffect } from 'react';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../component/Burger/Burger';
import BuildControls from '../../component/Burger/BuildControls/BuildControls';
import Modal from '../../component/UI/Modal/Modal';
import OrderSummary from '../../component/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../component/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as action from '../../store/action/index';

const BurgerBuilder = (props) => {

    const [purchasing, setPurchasing] = useState(false);
    const purschaseHandler = () => {
        if (props.isAuthenticate) {
            setPurchasing(true);
        }
        else {
            props.onSetAuthRedirectPath('/checkout')
            props.history.push('/auth');
        }
    }
    const purchaseCancelHandle = () => {
        setPurchasing(false);
    }
    const purchaseContinueHandle = () => {
        props.onInitPurchase();
        props.history.push('/checkout')
    }

    const updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }
    useEffect(() => {
        props.onInitIngredients();
    }, [])
    const disabledInfo = { ...props.ings };
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;
    let burger = props.error ? <p>Ingredients cant be loaded</p> : <Spinner />
    if (props.ings) {
        burger = (
            <Auxillary>
                <Burger ingredients={props.ings} />
                <BuildControls ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    purschasable={updatePurchaseState(props.ings)}
                    price={props.price}
                    ordered={purschaseHandler}
                    isAuth={props.isAuthenticate} />
            </Auxillary>
        );
        orderSummary = <OrderSummary
            ingredients={props.ings}
            purchaseCancelled={purchaseCancelHandle}
            purchaseContinued={purchaseContinueHandle}
            isAuth={props.isAuthenticate}
            price={props.price}></OrderSummary>;
    }
    return (
        <Auxillary>
            <Modal
                show={purchasing}
                modalClosed={purchaseCancelHandle}>
                {orderSummary}
            </Modal>
            {burger}
        </Auxillary>
    )
}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticate: state.auth.token != null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(action.addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(action.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(action.initIngredient()),
        onInitPurchase: () => dispatch(action.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(action.setAuthRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));