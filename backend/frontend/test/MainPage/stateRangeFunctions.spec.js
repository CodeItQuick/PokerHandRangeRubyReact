import React from 'react';
import MainPage from '../../src/containers/MainPage';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { mapNewHandRange } from '../../src/containers/MainPage/stateRangeFunctions';
import { sampleData } from '../../src/containers/MainPage/sampleData';
import { initialState } from '../../src/containers/MainPage/reducer';
import CardHandSuit from '../../src/containers/MainPage/EngineClasses/CardHandSuit';
import RangeObject from '../../src/containers/MainPage/EngineClasses/RangeObject';

describe('MainPage reducer', () => {
	test('should return the initial state', function() {
		const oldHandRange = initialState.ranges.map(
			({ Street, BetType, hands }) => new RangeObject(Street, BetType, hands)
		);
		const draftModeStreet = 'Flop';
		const draftModeStreetAction = 'Bluff';
		const actionDataCards = [ 'AA' ];

		let newHandRange = JSON.parse(JSON.stringify(initialState.ranges)).map(({ Street, BetType, hands }, idx) => {
			if (idx === 5) return { Street: draftModeStreet, BetType, hands: [ 'AA' ] };
			else return new RangeObject(Street, BetType, []).getRangesObject();
		});

		expect(mapNewHandRange(oldHandRange, draftModeStreet, draftModeStreetAction, actionDataCards)).toStrictEqual(
			newHandRange
		);
	});
});
