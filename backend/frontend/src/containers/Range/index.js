import React from 'react';
import { Select, Button } from 'semantic-ui-react';
import styled from 'styled-components';


export const Range = (props) => {

    return (
        <Select placeholder="Select your betting option" options={props.bettingOptions} onChange={props.onChangeHandler}/>
             
    );
};

export default Range;