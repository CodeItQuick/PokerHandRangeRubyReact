import { setIsIP } from '../../../src/containers/MainPage/ProgressIndicator/action';
import progressIndicatorReducer from '../../../src/containers/MainPage/ProgressIndicator/reducer';
import { initialState } from '../../../src/containers/MainPage/reducer';

describe('MainPage reducer', () => {
	test('should return the initial state', function() {
		expect(progressIndicatorReducer(undefined, { type: {} })).toEqual(initialState);
	});

	test('When it is given the change IP action it changes state', () => {
		//Given

		//When
		const reducerObj = progressIndicatorReducer(undefined, {
			data: {
				position: true,
				newRangeOOP: undefined,
				newRangeIP: undefined,
				newRanges: undefined
			}
		});

		//Then
		expect(reducerObj.mode.isIP).toEqual(true);
	});
});
