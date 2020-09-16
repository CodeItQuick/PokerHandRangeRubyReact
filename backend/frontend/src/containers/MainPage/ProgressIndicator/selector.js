import { createSelector } from 'reselect';
import { initialState } from '../reducer';
import RangeObject from '../EngineClasses/RangeObject';
import { CardHandSuitBuilder } from '../EngineClasses/CardHandSuitBuilder';

const copyHands = (hands) =>
	hands.map((hand) =>
		new CardHandSuitBuilder().build(
			hand.length <= 3 ? hand.substr(0, 1) : hand.substr(0, 2),
			hand.length <= 3 ? hand.substr(1, 1) : hand.substr(2, 2),
			hand.length <= 3 ? hand.substr(2, hand.length - 1) : ''
		)
	);

const selectGlobal = (state) => state.global || initialState; //??

const makeSelectIsIp = () => createSelector(selectGlobal, (globalState) => globalState.mode.isIP);
const makeSelectStreet = () => createSelector(selectGlobal, (globalState) => globalState.mode.Street);

const makeSelectRangeRepoIP = () =>
	createSelector(selectGlobal, (globalState) =>
		globalState.rangeRepoIP.map(({ Street, BetType, hands }) => new RangeObject(Street, BetType, copyHands(hands)))
	);

const makeSelectRangeRepoOOP = () =>
	createSelector(selectGlobal, (globalState) =>
		globalState.rangeRepoOOP.map(({ Street, BetType, hands }) => new RangeObject(Street, BetType, copyHands(hands)))
	);
const makeSelectRange = () =>
	createSelector(selectGlobal, (globalState) =>
		globalState.ranges.map(({ Street, BetType, hands }) => new RangeObject(Street, BetType, copyHands(hands)))
	);
export { makeSelectIsIp, makeSelectStreet, makeSelectRangeRepoIP, makeSelectRangeRepoOOP, makeSelectRange };
