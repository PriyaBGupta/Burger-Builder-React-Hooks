import React from 'react';
import CheckoutSummary from '../../component/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Checkout = (props) => {


    // constructor(props) {
    //     super(props);

    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients = {};
    //     let price = 0;
    //     //iterable over array
    //     for (let param of query.entries()) {
    //         if(param[0] === 'price'){
    //             price = param[1]
    //         }else{
    //             //+ unary operator makes string into number
    //             ingredients[param[0]] = +param[1];
    //         }
    //     }

    //     this.state ={
    //         ingredients: ingredients,
    //         totalPrice: price
    //     }
    // }
    const checkoutCancelledHandler = () => {
        props.history.goBack();
    }
    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/" />
    const purchaseSummary = props.purchased ? <Redirect to="/"></Redirect> : null
    if (props.ings) {
        summary = (<div>
            {purchaseSummary}
            <CheckoutSummary
                ingredients={props.ings}
                checkoutCancelled={checkoutCancelledHandler}
                checkoutContinued={checkoutContinuedHandler} />
            <Route
                path={props.match.path + '/contact-data'} component={ContactData} />
        </div>)
    }

    return summary

}
const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}
export default connect(mapStateToProps)(Checkout);