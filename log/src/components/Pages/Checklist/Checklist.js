import React,{Component} from 'react';

import {Input,Label,Button,Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'

import List from './List'

class Checklist extends Component{

    state={

        items:[],

        inputItems:[],

        checklists:[],

        isOpen:false,

        dummy:0

    }

    componentDidMount(){

        

    }

    keyMaker=()=>{

        return Math.floor(Math.random()*10000)+1;
    }

    addListItems=()=>{        

        let inputElementCopy=[...this.state.inputItems];

        inputElementCopy.push({element:<Label key={this.keyMaker()}><Input type="textbox"/>Add item</Label>,value:''});

        console.log(inputElementCopy)

        this.stateSet()

        this.setState({dummy:1})
            
     

        console.log(this.state.dummy)

    }

    stateSet=(stateVar,newVar)=>{

        this.setState()
    }

    addChecklist=()=>{
       
        let newChecklist=[<List empty={true}/>];

        this.setState({checklists:newChecklist});




    }

    addItems=()=>{




    }

    changeModalStateHandler=()=>{


        this.setState(prevState=>{

            return{

                isOpen:!prevState.isOpen,

                inputItems:[]

            }
        })

    }

    render(){

        let inputItemsCopy=[];

        if(this.state.isOpen){

            inputItemsCopy=this.state.inputItems.element;

        }

        let modal=(

        <Modal isOpen={this.state.isOpen} toggle={this.changeModalStateHandler} className={this.props.className}>

            <ModalHeader>New checklist</ModalHeader>

            <ModalBody>

                {inputItemsCopy}

            </ModalBody>

            <ModalFooter>

                <Button color="primary" onClick={this.addListItems}>Add more items</Button>

            </ModalFooter>

        </Modal>
            )



        
        return(
        
        <div>

            <h1>Checklist</h1>

            {modal}

            {/* <List empty={true}/> */}
            {/* [<List empty={true}/>] */}


            <Button color="info" onClick={this.changeModalStateHandler}>Add checklist</Button>


        </div>)
    }

}
export default Checklist;