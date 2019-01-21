import React,{Component} from 'react';

import {Input,Form,FormGroup,Label,Row,Col,Container,Button,FormText,UncontrolledAlert} from 'reactstrap';

import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';

import {checkValidity} from '../../../utility/utility';

import Spinner from '../../UI/Spinner/Spinner';

class Login extends Component{

    state={

        email:{

            elementConfig:{
                
                type:'text',

                placeholder:'Enter email'
            },

            value:'',

            valid:false,

            validation:{

                required:true,

                email:true,

            },
            touched:false

        },

        password:{

            elementConfig:{
                
                type:'password',

                placeholder:'Password'
            },

            value:'',

            valid:false,

            validation:{

                required: true,

                minLength:8

            },

            touched:false

        },

        rememberMe:{

            elementConfig:{

                type:'checkbox'

            },

            checked:false
        },

        isSignUp:true

    }

    componentDidMount(){
        
        this.props.onClearingErrorMessage();
        
    }

    redirectTo=(event)=>{

        if(event.target.id==='signin'){

            this.props.history.push('/');

        }

    }

    isFormValid=()=>{

        let formValid=false;
        
        if(this.state.email.valid&&this.state.password.touched){

            formValid=true;

            return formValid;

        }
        
    }

    formChangeHandler=(event)=>{
        
        event.persist()
        
        if(event.target.type==='text'){

            this.setState(prevState=>{

                return {

                    email:{

                        ...prevState.email,

                        value:event.target.value,

                        valid:checkValidity(event.target.value,{...this.state.email['validation']}),

                        touched:true

                    }

                }

            })

        }

         if(event.target.id==='password'){

            this.setState(prevState=>{

                return{

                    password:{

                        ...prevState.password,

                        value:event.target.value,

                        valid:checkValidity(event.target.value,{...this.state.password['validation']}),

                        touched:true

                    }

                }

            })
            
        }
        
    }

    sendpost=()=>{

        const credentials={

            email:this.state.email.value,

            password:this.state.password.value
        
        }

        this.props.onSendingCredentials(credentials,this.state.isSignUp);
        
    }

    signUpError=(error)=>{

        switch(error.trim()){

            case ('EMAIL_EXISTS'):

                return 'Sorry. That user name is taken. Try another email id.';
                  
            default:
            
                return ''

        }

    }

    render(){

        let pageContent=(

            <>

            <Row>
    
                <Col>
    
                <h3 className="text-center" style={{color:'	#3689EF'}} >Sign up</h3>
    
                </Col>
                
            </Row>    
    
            <Form className="mt-3" onSubmit={this.sendpost}>
    
                <Container>
    
                <Row>
                
                    <Col xs={{size:10,offset:1}} sm={{size:11,offset:1}} md={{size:11,offset:1}} lg={{size:4,offset:4}}>
                        <FormGroup>
    
                            <Label for="email">Email</Label>
    
                            <Input id="email" type={this.state.email.elementConfig['type']} placeholder={this.state.email.elementConfig['placeholder']} value={this.state.email.value} 
                            onChange={(event)=>{this.formChangeHandler(event)}} invalid={!this.state['email'].valid&&this.state['email'].touched}/>
    
                            {!this.state['email'].valid&&this.state['email'].touched?<FormText>Please enter a valid email</FormText>:null}
    
                        </FormGroup>
    
                    </Col>
    
                </Row>
    
                <Row>
    
                    <Col xs={{size:10,offset:1}} sm={{size:11,offset:1}} md={{size:11,offset:1}} lg={{size:4,offset:4}}>    
    
                        <FormGroup>
    
                            <Label for="password">Password</Label>
    
                            <Input id="password" type={this.state.password.elementConfig['type']} placeholder={this.state.password.elementConfig['placeholder']} value={this.state.password.value} 
                            onChange={(event)=>{this.formChangeHandler(event)}} invalid={!this.state['password'].valid&&this.state['password'].touched}/>
    
                            {!this.state['password'].valid&&this.state['password'].touched?<FormText>The password must atleast have 8 characters</FormText>:null}

                        </FormGroup>
    
                    </Col>
    
                </Row>
    
                <Row>
                    
                    <Col xs={{size:10,offset:1}} sm={{size:11,offset:1}} md={{size:11,offset:1}} lg={{size:4,offset:4}}>    
    
                        <FormGroup check row> 
    
                            <Button id ="signup" color="primary" size="md"  disabled={!(this.isFormValid())}>Sign up</Button>
    
                        </FormGroup>
    
                    </Col>
                  
                </Row>
    
                <Row className="mt-1">
    
                    <Col xs={{size:10,offset:1}} sm={{size:11,offset:1}} md={{size:11,offset:1}} lg={{size:4,offset:4}}>
    
                    <FormText color="muted" className="mb-1">
                        Already have an account? Sign in.
                    </FormText>    
    
                        <FormGroup check row> 
    
                            <Button id="signin" outline color="success" size="md" onClick={this.redirectTo}>Sign in</Button>
    
                        </FormGroup>
    
                    </Col>
                  
                </Row>

                {this.props.error!==''?

                    <Row className="mt-1">
    
                        <Col xs={{size:10,offset:1}} sm={{size:11,offset:1}} md={{size:11,offset:1}} lg={{size:4,offset:4}}>
    
                            <UncontrolledAlert color="warning" fade={true}>{this.signUpError(this.props.error)}</UncontrolledAlert>

                        </Col>
                  
                    </Row>

                    :null

                }
    
                </Container>
    
            </Form>

            </>

        );

        if(this.props.loading){

            pageContent=<Spinner/>;

        }

        return(

            <>

                {pageContent}

            </>

        )
        
    }

}

const mapStateToProps=state=>{

    return{

        isAuth:state.authReducer.token!==null,

        loading:state.authReducer.loading,

        error:state.authReducer.error

    }

}

const mapDispatchToProps=dispatch=>{

    return{

        onSendingCredentials:(credentials,isSignUp)=>{dispatch(actions.auth(credentials,isSignUp))},

        onClearingErrorMessage:()=>{dispatch(actions.errorMessageClear())}


    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Login) ;