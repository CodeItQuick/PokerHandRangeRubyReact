import { SelectedStreet } from '../../../src/containers/MainPage/CurrentRanges/selector';
import { initialState } from '../../../src/containers/MainPage/reducer';

describe('SelectedStreet ', () => {
	test('can be constructed', () => {
		const selectedStreet = new SelectedStreet(initialState.ranges);
		expect(selectedStreet.ranges).toBe(initialState.ranges);
	});
	test('can be filtered', () => {
		const selectedStreet = new SelectedStreet(initialState.ranges, initialState.mode);
		const filteredStreet = selectedStreet.filterStreet();

		const result = initialState.ranges.filter(({ Street }) => Street === 'Preflop');
		expect(filteredStreet.ranges).toStrictEqual(result);
	});
	test('can be displayed', () => {
		const selectedStreet = new SelectedStreet(initialState.ranges, initialState.mode);
		const filteredStreet = selectedStreet.filterStreet();
		const displayedStreet = filteredStreet.displayStreetObject();

		const result = [
			{
				cardSuitHandArray: [],
				street: 'Preflop',
				streetAction: 'Raise4BetCall'
			},
			{
				cardSuitHandArray: [],
				street: 'Preflop',
				streetAction: 'Raise4BetFold'
			},
			{
				cardSuitHandArray: [],
				street: 'Preflop',
				streetAction: 'RaiseCall'
			},
			{
				cardSuitHandArray: [],
				street: 'Preflop',
				streetAction: 'RaiseFold'
			}
		];
		expect(displayedStreet).toEqual(result);
	});
});
