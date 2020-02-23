import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import styled from 'styled-components';
import { Header, Table } from 'semantic-ui-react';


const StyledContainer = styled(Container)`
    font-size: 1rem;
`;

const StyledRedRow = styled(Table.Row)`
    color: white;
    background-color: red;
`;

const StyledVioletRow = styled(Table.Row)`
    color: white;
    background-color: purple;
`;

const StyledBlueRow = styled(Table.Row)`
    color: white;
    background-color: blue;
`;

const StyledGreenRow = styled(Table.Row)`
    color: white;
    background-color: green;
`;

const StyledInvertedRow = styled(Table.Header)`
    color: white;
    background-color: white;
    color: black;
`;

const BoardLegend = (props) => {
    return (
        <StyledContainer>
            <Table>
                <StyledInvertedRow>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Range # Combos</Table.HeaderCell>
                        <Table.HeaderCell>% of Range</Table.HeaderCell>
                        <Table.HeaderCell>% of Hands</Table.HeaderCell>
                    </Table.Row>
                </StyledInvertedRow>
                <Table.Body>
                    <StyledRedRow>
                        <Table.Cell>Raise/4bet/Call</Table.Cell>
                        <Table.Cell>{props.range0Combos}</Table.Cell>
                        <Table.Cell>{props.range0Percent}</Table.Cell>
                        <Table.Cell>{props.range0PercentAll}</Table.Cell>
                    </StyledRedRow>
                    <StyledVioletRow>
                        <Table.Cell>Raise/4bet/Fold</Table.Cell>
                        <Table.Cell>{props.range1Combos}</Table.Cell>
                        <Table.Cell>{props.range1Percent}</Table.Cell>
                        <Table.Cell>{props.range1PercentAll}</Table.Cell>
                    </StyledVioletRow>
                    <StyledBlueRow>
                        <Table.Cell>Raise/Call</Table.Cell>
                        <Table.Cell>{props.range2Combos}</Table.Cell>
                        <Table.Cell>{props.range2Percent}</Table.Cell>
                        <Table.Cell>{props.range2PercentAll}</Table.Cell>
                    </StyledBlueRow>
                    <StyledGreenRow>
                        <Table.Cell>Raise/Fold</Table.Cell>
                        <Table.Cell>{props.range3Combos}</Table.Cell>
                        <Table.Cell>{props.range3Percent}</Table.Cell>
                        <Table.Cell>{props.range3PercentAll}</Table.Cell>
                    </StyledGreenRow>
                </Table.Body>
            </Table>
        </StyledContainer>
    )
}

export default BoardLegend;