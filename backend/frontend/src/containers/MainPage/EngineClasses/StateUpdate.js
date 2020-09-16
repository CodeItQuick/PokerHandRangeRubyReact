import React from 'react';
import { StyledCol, ColorCard, StyledRow } from '../Board/Styles.js';

import { CardHandSuitBuilder } from './CardHandSuitBuilder';
import TableGridColumn from './TableGridColumn';
import RangeObject from './RangeObject';

import { initialState } from '../reducer.js';
import { Table } from 'semantic-ui-react';

export default class BoardOfHands {
	constructor(bind) {
		this.orderedCard = [ 'A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2' ];
		this.hands = this.generateCardGrid();
		this.PreflopRangesOnly = initialState.ranges
			.filter(({ Street, BetType }) => {
				if (Street === 'Flop') return Street === 'Preflop';
				if (Street === 'Turn') return Street === 'Flop' && (BetType === 'Valuebet' || BetType === 'Bluff');
				if (Street === 'River') return Street === 'Turn' && (BetType === 'Valuebet' || BetType === 'Bluff');
			})
			.map(({ Street, BetType, hands }) => new RangeObject(Street, BetType, hands));
		this.bind = bind;
	}

	generateCardGrid() {
		let cardGrid = this.orderedCard.map((cardOne) =>
			this.orderedCard.map((cardTwo) => new CardHandSuitBuilder().build(cardOne, cardTwo))
		);
		return cardGrid;
	}

	updateCardGrid(PreflopRanges, RangesSelected) {
		let cardClone;

		cardClone = RangesSelected.reduce((acc, RangeObject) => {
			if (RangeObject.displayInfo() === {}) return acc;
			else return { ...acc, ...RangeObject.displayInfo() };
		}, {});

		this.PreflopRangesOnly = PreflopRanges;
		this.cards = cardClone;
	}

	view() {
		let allPreflopHands = this.PreflopRangesOnly.map((rangeObject) => rangeObject.allHandsOneArray());

		let setNewManyHands = this.hands.map((row, idx) => {
			let columnJSX = row.map((cardHand) => {
				return (
					<TableGridColumn
						cardHand={cardHand}
						bind={this.bind}
						allPreflopHands={allPreflopHands}
						cards={this.cards}
					/>
				);
			});
			return <StyledRow>{columnJSX}</StyledRow>;
		});
		return <Table.Body id="cardgridtable">{setNewManyHands}</Table.Body>;
	}
}

export const orderedCard = [ 'A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2' ];

export const generateCardGrid = (PreflopRanges, Position) => {
	let cardClone = {};

	PreflopRanges.forEach(({ hands }, idx) => {
		hands.forEach((hand) => {
			cardClone = {
				...cardClone,
				[hand.getHand()]: {
					colorCards: [ '#0F6125', '#ed87a7', '#3ac0ff', '#dc73ff', '#003d3e', '#8A4000' ][idx],
					equity: 'n/a'
				}
			};
		});
	});

	return cardClone;
};
