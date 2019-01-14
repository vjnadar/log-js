import React,{Component} from 'react';

import {Nav,NavItem,NavLink,Navbar,NavbarBrand,NavbarToggler,Collapse,UncontrolledTooltip} from 'reactstrap';

import {NavLink as RouterLink} from 'react-router-dom';

import logo from '../../../../assets/images/logo.PNG';

// import styles from './FullNavBar.module.css';

import {connect} from 'react-redux';

import {authLogout} from '../../../../store/actions/authAction'

class FullNavBar extends Component{

    state={

        isOpen:false

    }

    toggle=()=>{

        this.setState(prevState=>{return{isOpen:!prevState.isOpen}})

    }

    logout=()=>{

        this.props.onLogout()
    }

    render(){
        let links=null;
        
        if(!this.props.isAuth){

            links=(

                <>

                    <NavItem>

                        <NavLink to="/" tag={RouterLink} style={{color:'grey'}} exact>Sign in</NavLink>

                    </NavItem>

                </>

            )

        }

        else if(this.props.isAuth){

            links=(

                <>
{/* 
                    <NavItem>

                        <NavLink to="/Notes" tag={RouterLink} style={{color:'grey'}} exact>Notes</NavLink>

                    </NavItem> */}

                    <NavItem>

                        <NavLink style={{color:'grey'}} href="#" onClick={()=>{this.props.onLogout()}} >Sign out</NavLink>

                    </NavItem>

                </>

            )

        }

        return(

            <>

                <Navbar color="white" light expand="md">

                <NavbarToggler onClick={this.toggle}/>

                <NavbarBrand href="https://github.com/vjnadar"><span id="logo" style={{color:'grey'}}><img src={logo} alt="Log" style={{width:'45px',height:'45px'}}/>Log</span></NavbarBrand>

                <UncontrolledTooltip target="logo" placement="top"><b>Log</b></UncontrolledTooltip>

                <Collapse isOpen={this.state.isOpen} navbar>

                    <Nav className="ml-auto">

                        {links}

                    </Nav>


                </Collapse>

                </Navbar>

            </>

        )

    }

}

const mapStateToProps=state=>{

    return{

        isAuth:state.authReducer.token!==null

    }

}

const mapDispatchToProps=dispatch=>{

    return{

        onLogout:()=>{dispatch(authLogout())}

    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(FullNavBar);