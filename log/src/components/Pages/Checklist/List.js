import React from 'react';

import {Row,Col,Card,CardTitle,CardText,Button,Input,Label} from 'reactstrap';

import Aux from '../../../hoc/Aux';

const list=(props)=>{
    
    return (

        <Col sm="12" md={{size:"12"}} lg={{size:"8",offset:"2"}}>

            <Card body onClick>

                <CardTitle>

                    {props.empty?"New checklist":props.title}

                </CardTitle>

                <CardText>

                    {props.empty?"New":props.checklist}

                </CardText>

                <Row>
                    <Col>
                        <Button id="Add" color="info" size="sm" style={{width:"70px",height:"30px"}} onClick>Add</Button>
                    </Col>
                    <Col>
                <Button id="Add" color="info" size="sm" style={{width:"70px",height:"30px"}} onClick>Delete</Button>
                </Col>
                </Row>    
            </Card>

        </Col>

    );

}

export default list;