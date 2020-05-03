import React, { useEffect, Suspense } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Logout from './container/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as action from './store/action/index';

//Lazy loading of modules  when they are required
const Checkout = React.lazy(() => {
	return import('./container/Checkout/Checkout');
})
const Order = React.lazy(() => {
	return import('./container/Orders/Orders');
})
const Auth = React.lazy(() => {
	return import('./container/Auth/Auth');
})

const App = (props) => {
	useEffect(() => {
		props.onTryAutoSignUp();
	}, [props])

	// Here Redirect component adds gaurds to all the route which are not present at that time
	let routes =
		(<Switch>
			<Route path="/auth" render={props => <Auth {...props} />} />
			<Route path="/" exact component={BurgerBuilder} />
			<Redirect to="/" />
		</Switch>)
	if (props.isAuthenticated) {
		routes = <Switch>
			<Route path="/checkout" render={props => <Checkout {...props} />} />
			<Route path="/orders" render={props => <Order {...props} />} />
			<Route path="/logout" component={Logout} />
			<Route path="/auth" render={props => <Auth {...props} />} />
			<Route path="/" exact component={BurgerBuilder} />
			<Redirect to="/" />
		</Switch>
	}
	return (
		<div className="App">
			<Layout>
				<Suspense fallback={<p>..Loading</p>}>{routes}</Suspense>
			</Layout>
		</div>
	);
}

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignUp: () => dispatch(action.authCheckState())
	}
}
const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null
	}
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
