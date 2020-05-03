import React, { useEffect } from 'react';
import Order from '../../component/Order/Order';
import axios from '../../axios-orders';
import withErrorHandling from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as action from '../../store/action/index';
import Spinner from '../../component/UI/Spinner/Spinner';

const Orders = props => {
    const {onFetchOrder} = props;
    useEffect(() => {
        onFetchOrder(props.token, props.userId);
    }, [onFetchOrder]);

    let orders = <Spinner></Spinner>
    if (!props.loading) {
        orders = props.orders.map(order => (
            <Order
                key={order.id}
                ingredients={order.ingredients}
                price={+order.price} />
        ))
    }
    return (
        <div>
            {orders}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrder: (token, userId) => dispatch(action.fetchOrder(token, userId))
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(Orders, axios));

