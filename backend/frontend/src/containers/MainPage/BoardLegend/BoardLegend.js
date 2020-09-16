import React, { Fragment, useState, useEffect, memo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import { Header, Table, Tab, Button } from 'semantic-ui-react';
import _ from 'lodash';
import useInjectReducer from '../../../HOC/useInjectReducer';

import reducer from '../reducer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectDeadcards, makeSelectMode, makeSelectSelectedStreet } from '../selectors';

import { CardHandSuitBuilder } from '../EngineClasses/CardHandSuitBuilder';

const StyledContainer = styled(Container)`
  font-size: 1rem;
`;

const StyledColorRow = styled(Table.Cell)`
  color: white;
  background-color: ${(props) => [ '#0f6125', '#a30b00', '#005e8a', '#8e00bd', '#003d3e', '#713400' ][props.index]};
`;
const StyledInvertedRow = styled(Table.Row)`
  color: white;
  background-color: black;
`;
//TODO: Make a board legend for Preflop/Flop/Turn/River

const generatedLegendTable = (streetActions, numberOfCombos, index) => {
	return (
		<Table.Row>
			<StyledColorRow index={index}>
				<strong>{streetActions[index]}</strong>
			</StyledColorRow>
			<Table.Cell>{numberOfCombos[index]}</Table.Cell>
			<Table.Cell id="Raise4BetValueTutorial">
				{numberOfCombos.reduce((acc, curr, idx) => acc + curr, 0) !== 0 ? (
					(100 * numberOfCombos[index] / numberOfCombos.reduce((acc, curr, idx) => acc + curr, 0)).toFixed(2)
				) : (
					'0'
				)}
			</Table.Cell>
			<Table.Cell>{(numberOfCombos[0] / 1326 * 100).toFixed(2)}</Table.Cell>
		</Table.Row>
	);
};

const legendTable = (numberOfCombos, indexOfActions = [ 0, 1, 2, 3 ], streetActions) => (
	<Table unstackable fixed>
		<Table.Body>
			<StyledInvertedRow>
				<Table.HeaderCell>Name</Table.HeaderCell>
				<Table.HeaderCell>Range # Combos</Table.HeaderCell>
				<Table.HeaderCell>% of Range</Table.HeaderCell>
				<Table.HeaderCell>% of Hands</Table.HeaderCell>
			</StyledInvertedRow>
			{indexOfActions.map((index) => generatedLegendTable(streetActions, numberOfCombos, index))}
		</Table.Body>
	</Table>
);

export const countHandCombo = (wholeRange, chosenStreet, board) => {
	let wholeRangeNum = wholeRange.map((rangeObject) =>
		rangeObject.allHandsOneArray().reduce((acc, hand) => {
			return acc + comboCounter(hand.getHand(), chosenStreet, board);
		}, 0)
	);

	return wholeRangeNum;
};

const comboCounter = (hands, chosenStreet, board) => {
	if (!hands) return 0;

	let hand;

	if (hands.length === 2) hand = new CardHandSuitBuilder().build(hands.substr(0, 1), hands.substr(1, 1));
	if (hands.length === 3)
		hand = new CardHandSuitBuilder().build(hands.substr(0, 1), hands.substr(1, 1), hands ? hands.substr(2, 1) : '');
	else if (hands.length === 4)
		hand = new CardHandSuitBuilder().build(hands.substr(0, 2), hands.substr(2, 2), ''); //FIXME: UGLY
	if (hands.length > 3) {
		let transformedCardHand = [ hand.getHand().substr(0, 2), hand.getHand().substr(2, 2) ];
		if (board.includes(transformedCardHand[0]) || board.includes(transformedCardHand[1])) return 0;
		return 1;
	}
	//Suited Combos

	if (hands.includes('s')) return suitedComboCounter(hand, board, 's');
	else if (hands.includes('o'))
		//Offsuit Combos
		return offsuitComboCounter(hand, board, 'o');
	else
		//Pair Combos
		return pairComboCounter(hand, board);
};
const offsuitComboCounter = (hand, board) => {
	const numOccurances = _.countBy(_.split(board, ''));
	const subtractFirstCard = numOccurances[hand.getHand().charAt(0)] || 0;
	const subtractSecondCard = numOccurances[hand.getHand().charAt(1)] || 0;
	const numCards = (4 - subtractFirstCard) * (4 - subtractSecondCard);
	return numCards;
};

const suitedComboCounter = (hand, board) => {
	const numHandCardsInBoard = board.filter(
		(boardCard) => boardCard.includes(hand.getHandArray()[0]) || boardCard.includes(hand.getHandArray()[1])
	);
	if (numHandCardsInBoard.length === 2) {
		const suitOfMatchedCards = numHandCardsInBoard.map((boardCard) => boardCard.substr(1, 1));
		const suitsDoMatch = suitOfMatchedCards[0] === suitOfMatchedCards[1];
		return suitsDoMatch ? 3 : 2;
	}
	return 4 - numHandCardsInBoard.length;
};

const pairComboCounter = (hand, board) => {
	//Pair Combos
	let numOccurances = _.countBy(_.split(board, '', 12));
	let subtractFirstCard = numOccurances[hand.getHand().charAt(0)] || 0;
	let subtractSecondCard = numOccurances[hand.getHand().charAt(1)] || 0;

	let numCards = (4 - subtractFirstCard) * (3 - subtractSecondCard) / 2;
	return numCards;
};

const BoardLegend = ({ wholeRange, onHandleStreetHandlerButtons, mode: { street, useTwoFlopSizes }, deadcards }) => {
	const streetActions = {
		Preflop: [ 'Raise4BetCall', 'Raise4BetFold', 'RaiseCall', 'RaiseFold' ],
		Flop: [ 'Valuebet', 'Bluff', 'CheckCall', 'CheckFold', 'SmallValuebet', 'SmallBluff' ],
		Turn: [ 'Valuebet', 'Bluff', 'CheckCall', 'CheckFold' ],
		River: [ 'Valuebet', 'Bluff', 'CheckCall', 'CheckFold' ]
	};
	const [ indexOfActions, updateIndexOfActions ] = useState([ 0, 1, 2, 3 ]);
	const [ numberOfCombos, updateNumberOfCombos ] = useState([ 0, 0, 0, 0 ]);

	useEffect(
		() => {
			if (useTwoFlopSizes && street === 'Flop') updateIndexOfActions([ 0, 1, 2, 3, 4, 5 ]);
			else updateIndexOfActions([ 0, 1, 2, 3 ]);
		},
		[ useTwoFlopSizes, street ]
	);

	//TODO: potential bug? method outside useEffect
	useEffect(
		() => {
			updateNumberOfCombos(countHandCombo(wholeRange, street, deadcards));
		},
		[ wholeRange, street, deadcards ]
	);

	const nameOfAction = (comboNumber) => {
		if (street && wholeRange[street] !== undefined) return Object.keys(wholeRange[street])[comboNumber];
		else return '';
	};

	return <StyledContainer>{legendTable(numberOfCombos, indexOfActions, streetActions[street])}</StyledContainer>;
};

const mapStateToProps = () => {
	const getDeadcards = makeSelectDeadcards();
	const getMode = makeSelectMode();
	const getSelectedRange = makeSelectSelectedStreet();

	const mapState = (state) => {
		return {
			deadcards: getDeadcards(state),
			mode: getMode(state),
			wholeRange: getSelectedRange(state)
		};
	};
	return mapState;
}; //?

const withConnect = connect(mapStateToProps, null);
export default compose(withConnect, memo)(BoardLegend);
