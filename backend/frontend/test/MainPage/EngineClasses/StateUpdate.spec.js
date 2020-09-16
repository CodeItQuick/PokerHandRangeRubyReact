import React from 'react';
import MainPage from '../../../src/containers/MainPage/index.js';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Provider } from 'react-redux';
import { initialState } from '../../../src/containers/MainPage/reducer';
import history from '../../../src/utils/history';
import configureStore from '../../../src/configureStore.js';
import BoardOfHands, {
	generateCardGrid,
	orderedCard
} from '../../../src/containers/MainPage/EngineClasses/StateUpdate';
import CardHandSuit, { CardHandSuitBuilder } from '../../../src/containers/MainPage/EngineClasses/CardHandSuitBuilder';
import { ranges } from '../../../src/containers/MainPage/sampleData.js';
import { bind } from '../../../src/containers/MainPage/Board/index.js';
import Board from '../../../src/containers/MainPage/Board';
import { Table } from 'semantic-ui-react';

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);

function setup() {
	let enzymeWrapper = (
		<Provider store={store}>
			<Board />
		</Provider>
	);

	return enzymeWrapper;
}

describe('State Update Functions', () => {
	test(' generate CardGrid generates an empty object when given an empty range', () => {
		const PreflopRanges = JSON.parse(JSON.stringify(initialState.ranges));
		const Position = initialState.mode.isIP;
		const newCardGrid = generateCardGrid(PreflopRanges, Position);

		expect(newCardGrid).toStrictEqual({});
	});

	test(' generate CardGrid generates an AA object when given an AA range', () => {
		let PreflopRanges = JSON.parse(JSON.stringify(initialState.ranges)).filter(({ Street }) => Street == 'Preflop');
		let AAHandObj = new CardHandSuitBuilder().build('A', 'A');
		PreflopRanges[0].hands = [ AAHandObj ];
		const Position = initialState.mode.isIP;
		const newCardGrid = generateCardGrid(PreflopRanges, Position);

		expect(newCardGrid).toStrictEqual({
			AA: {
				colorCards: [ '#0F6125', '#ed87a7', '#3ac0ff', '#dc73ff', '#003d3e', '#8A4000' ][0],
				equity: 'n/a'
			}
		});
	});

	test(' generate CardGrid generates an AA object when given an AA range', () => {
		let PreflopRanges = JSON.parse(JSON.stringify(initialState.ranges)).filter(({ Street }) => Street == 'Preflop');
		let AAHandObj = new CardHandSuitBuilder().build('A', 'A');
		PreflopRanges[1].hands = [ AAHandObj ];
		const Position = initialState.mode.isIP;
		const newCardGrid = generateCardGrid(PreflopRanges, Position);

		expect(newCardGrid).toStrictEqual({
			AA: {
				colorCards: [ '#0F6125', '#ed87a7', '#6b6c7c', '#d3d3d3' ][1],
				equity: 'n/a'
			}
		});
	});

	test(' generate CardGrid generates an AA object when given an AA range', () => {
		let PreflopRanges = JSON.parse(JSON.stringify(initialState.ranges)).filter(({ Street }) => Street == 'Preflop');
		let AAHandObj = new CardHandSuitBuilder().build('A', 'A');
		PreflopRanges[2].hands = [ AAHandObj ];
		const Position = initialState.mode.isIP;
		const newCardGrid = generateCardGrid(PreflopRanges, Position);

		expect(newCardGrid).toStrictEqual({
			AA: {
				colorCards: [ '#0F6125', '#ed87a7', '#3ac0ff', '#dc73ff', '#003d3e', '#8A4000' ][2],
				equity: 'n/a'
			}
		});
	});

	test(' generate CardGrid generates an AA object when given an AA range', () => {
		let PreflopRanges = JSON.parse(JSON.stringify(initialState.ranges)).filter(
			({ Street }) => Street === 'Preflop'
		);
		let AAHandObj = new CardHandSuitBuilder().build('A', 'A');
		PreflopRanges[3].hands = [ AAHandObj ];
		const Position = initialState.mode.isIP;
		const newCardGrid = generateCardGrid(PreflopRanges, Position);

		expect(newCardGrid).toStrictEqual({
			AA: {
				colorCards: [ '#0F6125', '#ed87a7', '#3ac0ff', '#dc73ff', '#003d3e', '#8A4000' ][3],
				equity: 'n/a'
			}
		});
	});
});
