import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import styled from 'styled-components';


function Hand(props) {

    return (
        <Grid.Column><Button onClick={props.handOnClick} name={props.cardOne + props.cardTwo + props.suit} className={props.classColor(props.cardOne, props.cardTwo, props.suit)}>{props.cardOne}{props.cardTwo}{props.suit}</Button></Grid.Column>
    );
}

export default Hand;