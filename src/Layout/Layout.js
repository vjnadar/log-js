import React, { Component } from 'react';
import FullNavbar from '../components/UI/Navigation/FullNavBar/FullNavBar';
import Background from '../components/UI/Background/Background';
import Footer from '../components/UI/Footer/Footer';
class Layout extends Component {
    render() {
        return (
            <>
                <Background />
                <FullNavbar />
                <main style={{ marginTop: '30px' }}>{this.props.children}</main>
                <Footer />
            </>
        );
    }
}

export default Layout;
