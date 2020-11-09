import { transformHandRange } from '../../src/containers/MainPage/actions';

describe('the transformHandRange function ', () => {
	test('should be able to transform the sample data', () => {
		const data = [
			{
				BetType: 'Raise4BetCall',
				Board: '2d,2h,Jh,9h',
				HandName: 'rangeRepoIP',
				PokerHands: '',
				PokerUser: 'Evan',
				Street: 'Preflop',
				created_at: '2020-10-06T02:25:40.721Z',
				id: 229,
				range_object_collection_id: 19,
				range_object_id: 229,
				updated_at: '2020-10-06T02:25:40.721Z'
			}
		];

		expect(transformHandRange(data, 'rangeRepoIP')).toStrictEqual([
			{ BetType: 'Raise4BetCall', Street: 'Preflop', hands: [] }
		]);
	});
	test('should be able to transform the sample data', () => {
		const data = [
			{
				BetType: 'Raise4BetCall',
				Board: '2d,2h,Jh,9h',
				HandName: 'rangeRepoIP',
				PokerHands: 'AA',
				PokerUser: 'Evan',
				Street: 'Preflop',
				created_at: '2020-10-06T02:25:40.721Z',
				id: 229,
				range_object_collection_id: 19,
				range_object_id: 229,
				updated_at: '2020-10-06T02:25:40.721Z'
			}
		];

		expect(transformHandRange(data, 'rangeRepoIP')).toStrictEqual([
			{ BetType: 'Raise4BetCall', Street: 'Preflop', hands: [ 'AA' ] }
		]);
	});
});
