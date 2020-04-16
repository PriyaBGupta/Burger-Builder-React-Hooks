import React, { Component } from 'react';
import Order from '../../component/Order/Order';
import axios from '../../axios-orders';
import withErrorHandling from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as action from '../../store/action/index';
import Spinner from '../../component/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrder();
    }
    render() {
        let orders = <Spinner></Spinner>
        if (!this.props.loading) {
            orders = this.props
                .orders.map((order) => (
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
}

const mapStateToProps = state => {
    return{
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onFetchOrder: () => dispatch(action.fetchOrder())
    }

}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandling(Orders, axios));

