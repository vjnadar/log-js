import React from 'react';
import { Col, Card, CardTitle, CardText, Button, UncontrolledTooltip } from 'reactstrap';

const post = (props) => {
    return (
        <Col sm="12" md={{ size: '12' }} lg={{ size: '8', offset: '2' }}>
            <Card body onClick={(event) => props.clicked(event, props.id)} id={props.id}>
                <UncontrolledTooltip target={props.id} placement="top" color="primary">
                    <b>Tap to edit</b>
                </UncontrolledTooltip>
                <CardTitle>{props.time}</CardTitle>
                <CardText>{props.post}</CardText>
                <Button id="Delete" color="danger" size="sm" style={{ width: '70px', height: '30px' }} onClick={props.postDelete}>
                    Delete
                </Button>
            </Card>
        </Col>
    );
};

export default post;
