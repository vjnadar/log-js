import React, { Component } from 'react';
import Layout from './Layout/Layout';
import Notes from './components/Pages/Notes/Notes';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import Signup from './components/Pages/Signup/Signup';
import Login from './components/Pages/Login/Login';
import styles from './App.module.css';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {
    componentDidMount() {
        this.props.onReload();
    }
    render() {
        let routes = null;
        if (!this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path="/" component={Login} exact />

                    <Route path="/Signup" component={Signup} />

                    <Redirect to="/" />
                </Switch>
            );
        } else if (this.props.isAuth) {
            routes = (
                <Switch>
                    <Route path="/Notes" component={Notes} exact />

                    <Redirect to="/Notes" />
                </Switch>
            );
        }
        return (
            <div className={styles.app}>
                <Layout>{routes}</Layout>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        isAuth: state.authReducer.token !== null,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        onReload: () => {
            dispatch(actions.automaticLogout());
        },
    };
};
export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(App)
);
