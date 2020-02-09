import React from 'react';
import {Grid } from 'semantic-ui-react';
import Hand from '../hand/hand';

function Board(props) {
    const orderedCard = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"];
    
    const displayCard = (indexCardOne, indexCardTwo, cardOne, cardTwo) => {
        let display;
        
        if(indexCardOne < indexCardTwo) 
        {
            display = <Hand key={cardOne + cardTwo} cardOne={cardOne} cardTwo={cardTwo} suit={"s"} handOnClick={props.onHandClick} classColor={props.classColor}></Hand>;
        }
        else if (indexCardOne === indexCardTwo)
        {
            display = <Hand  key={cardOne + cardTwo} cardOne={cardOne} cardTwo={cardTwo} suit={""} handOnClick={props.onHandClick} classColor={props.classColor}></Hand>;
        }
        else
        {
            display = <Hand  key={cardOne + cardTwo} cardOne={cardTwo} cardTwo={cardOne} suit={"o"} handOnClick={props.onHandClick} classColor={props.classColor}></Hand>;
        }

        return display;
    };

    return (
        <Grid>
            <Grid.Row columns={13}>
                {orderedCard.map((cardOne, indexCardOne) => 
                    orderedCard.map((cardTwo, indexCardTwo) =>  
                        displayCard(indexCardOne, indexCardTwo, cardOne, cardTwo)
                    )
                )}
            </Grid.Row>
        </Grid>
    );
}

export default Board;