import React, {Component} from 'react';

import {Row,Col,Input,Button,Modal, ModalHeader, ModalBody, ModalFooter,FormText} from 'reactstrap';

import {connect} from 'react-redux';

import * as actions from '../../../store/actions/index';

import Spinner from '../../UI/Spinner/Spinner';

import Post from './Post/Post';

import {checkValidity} from '../../../utility/utility'

class About extends Component{

    state={

        postNote:{

            elementConfig:{

                id:'postNote',

                type:'textarea',

                placeholder:'Write something...',
            },

            fromDB:{

                post:''

            },

            valid:false,

            touched:false,

            validation:{

                required:true
                
            }

        },    
        
        selectedPost:{

            elementConfig:{

                id:'update',

                type:'textarea',

                placeholder:'Write something...',
            },

            fromDB:{

                id:'',

                post:'',

                time:'',

            },

            valid:false,

            touched:false,

            validation:{

                required:true

            }

        },


        order:0,

        modal:false,

        id:0,

        edit:false

    }

    componentDidMount(){

        this.refreshPosts();

    }

    changeHandler=(event)=>{
        
        if(event.target.id==='postNote'){

            event.persist();

            this.setState(prevState=>{

                return {

                    postNote:{

                        ...prevState.postNote,

                        fromDB:{

                            ...prevState.postNote.fromDB,

                            post:event.target.value
    
                        },

                        valid:checkValidity(event.target.value,this.state.postNote.validation),

                        touched:true

                    }

                }

            })

        }

        else if(event.target.id==='update') {

            event.persist();

            this.setState(prevState=>{

                return{

                    selectedPost:{

                        ...prevState.selectedPost,

                        fromDB:{

                            ...prevState.selectedPost.fromDB,

                            post:event.target.value

                        },

                        valid:checkValidity(event.target.value,this.state.postNote.validation),

                        touched:true

                    }

                }

            })

        }

    }

    isTextNotValid=()=>{

        let textNotValid=true;

            if(this.state.postNote.valid&&this.state.postNote.touched){

                textNotValid=false;
    
                return textNotValid;
    
            }

            else{

                return textNotValid

            }

    }        

    isUpdatedTextNotValid=()=>{

        let updatedTextNotValid=true

        if(!this.state.edit){

            return

        }
        
        if(this.state.selectedPost.valid){

            updatedTextNotValid=false;

            return updatedTextNotValid;

        }

        else{

            return updatedTextNotValid

        }

    }

    sendPost=()=>{

        this.props.onSendingPost(this.state.postNote['fromDB'].post,this.props.token,this.props.userId);

        this.setState(prevState=>{

            return{

                postNote:{

                    ...prevState.postNote,

                    fromDB:{

                        post:''

                    }

                }
            }

            
        })

    }

    refreshPosts=()=>{

        this.props.onRetrievingPosts(this.props.token,this.props.userId);

    }

    getElement=(event,id)=>{

         event.persist();

        if(event.target.id==="Delete"){

            this.props.onDeleting(this.props.token,this.props.userId,id);

        }else{

            for(let index in this.props.posts){
    
                if(id===this.props.posts[index].id){
    
                    this.setState(prevState=>{
    
                        return{
    
                          selectedPost:{

                              ...prevState.selectedPost,
    
                            fromDB:{
    
                                id:this.props.posts[index].id,
    
                                post:this.props.posts[index].post,
        
                                time:this.props.posts[index].time
    
                            }

                          }  
    
                        }
    
                    });
    
                }
            }
    
            this.changeModalStateHandler();

        }

    }

    switchToEdit=()=>{

        this.setState(prevState=>{

            return{

                edit:!prevState.edit

            }

        })

    }

    changeModalStateHandler=()=>{

        this.setState(prevState=>{ 
            
            return{

                selectedPost:{

                    ...prevState.selectedPost,

                    touched:false

                },    

                modal:!prevState.modal,

                edit:false

            }

        })

    }

    updatePost=()=>{

        this.props.onUpdating(this.state.selectedPost['fromDB'],this.props.token,this.props.userId);

        this.changeModalStateHandler();

    }

    render(){


        let topContent=(

            <>

                <Input id={this.state.postNote.elementConfig.id} type={this.state.postNote.elementConfig.type} placeholder={this.state.postNote.elementConfig.placeholder} value={this.state.postNote.fromDB.post} onChange={(event)=>{this.changeHandler(event)}}/>

                <br/>

                <Button id="log" color="success" onClick={this.sendPost} disabled={this.isTextNotValid()}>Log</Button>

            </>

        );

        let postContents=[];

        let modal=null;

        if(this.props.posts.length>0){

        postContents=this.props.posts.map(data=><Post key={data.id} post={data.post} time={data.time} id={data.id} clicked={this.getElement} postDelete={(event)=>{this.getElement(event,data.id)}}/>)
           
            postContents.reverse();
            
            modal=(

                <Modal isOpen={this.state.modal} toggle={this.changeModalStateHandler} className={this.props.className} style={{fontFamily:'Montserrat, sans-serif'}}>

                    <ModalHeader>{this.state.selectedPost.fromDB.time}</ModalHeader>

                    <ModalBody>

                        <Input type={this.state.selectedPost.elementConfig.type} id={this.state.selectedPost.elementConfig.id} value={this.state.selectedPost.fromDB.post} onChange={(event)=>{this.changeHandler(event)}} disabled={!this.state.edit} />
                        {!this.state.selectedPost.valid&&this.state.edit?<FormText>This field cannnot be left blank.</FormText>:null}
                    </ModalBody>    

                    <ModalFooter>
                        
                        <Button id="edit" color={this.state.edit?'success':'info'} onClick={this.state.edit?this.updatePost:this.switchToEdit} disabled={this.isUpdatedTextNotValid(this.state.edit)}>{this.state.edit?'Submit':'Edit'}</Button>

                        <Button color="dark" onClick={this.changeModalStateHandler}>Cancel</Button>

                    </ModalFooter>

                </Modal>

            )

        }

        let pageContents=null;

        if(this.props.loading||this.props.authLoading){

            pageContents=<Spinner/>

        }else{

            pageContents=(

                <>
    
                    <Row className="mb-1">
    
                        <Col xs="12" sm="12" md={{size:6,offset:3}} lg={{size:6,offset:3}}>
    
                            {modal}
    
                            {topContent}
    
                        </Col>
    
                    </Row>
    
                <br/>
    
                    <Row>
    
                        {postContents}
    
                        <br/>
    
                    </Row>

                </>
    
            )

        }

        return(

            <div>

                {pageContents}

            </div>

        )

    }
    
}

const mapStateToProps=state=>{

    return{

        loading:state.mainReducer.loading,

        posts:state.mainReducer.posts,

        userId:state.authReducer.userId,

        token:state.authReducer.token,

        authLoading:state.authReducer.loading

    }

}

const mapDispatchToProps=dispatch=>{

    return{

        onSendingPost:(post,token,userId)=>{dispatch(actions.post(post,token,userId))},

        onRetrievingPosts:(token,userId)=>{dispatch(actions.get(token,userId))},

        onUpdating:(postUpdate,token,userId)=>{dispatch(actions.update(postUpdate,token,userId))},

        onDeleting:(token,userId,id)=>{dispatch(actions.deletePost(token,userId,id))}

    }

}

export default connect(mapStateToProps,mapDispatchToProps)(About);