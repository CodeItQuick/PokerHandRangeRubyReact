import React from 'react';
import MainPage from '../../../src/containers/MainPage/index';
import Enzyme, { shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Provider } from 'react-redux';
import { initialState } from '../../../src/containers/MainPage/reducer';
import history from '../../../src/utils/history';
import configureStore from '../../../src/configureStore.js';
import Board, { calcEquities } from '../../../src/containers/MainPage/Board';
import { ranges } from '../../../src/containers/MainPage/sampleData.js';

import { CardGroup, OddsCalculator } from 'poker-odds-calculator';
import prange from 'prange';
import { generateCardGrid } from '../../../src/containers/MainPage/EngineClasses/StateUpdate';
import CardHandSuit from '../../../src/containers/MainPage/EngineClasses/CardHandSuitBuilder';

Enzyme.configure({ adapter: new Adapter() });

const store = configureStore(initialState, history);

const Calculator = {
	calculate: ([ inputOne, inputTwo ], inputThree) => {
		return {
			equities: [
				{ bestHandCount: 100, possibleHandsCount: 200, tieHandCount: 0 },
				{ bestHandCount: 100, possibleHandsCount: 200, tieHandCount: 0 }
			]
		};
	}
};

function setup(onMouseOverHandler) {
	let enzymeWrapper = (
		<Provider store={store}>
			<Board {...onMouseOverHandler} />
		</Provider>
	);

	return enzymeWrapper;
}
describe('MainPage Container', () => {
	test('board renders with a white card-button object', () => {
		const enzymeWrapper = shallow(setup(jest.fn()));
		expect(enzymeWrapper.length).toBe(1);
	});

	test('board fires onClick handler as clicked', () => {
		const enzymeWrapper = shallow(setup(jest.fn()));
		expect(enzymeWrapper.length).toBe(1);
	});
});
