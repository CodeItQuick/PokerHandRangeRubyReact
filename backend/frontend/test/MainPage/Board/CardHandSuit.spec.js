import { initialState } from '../../../src/containers/MainPage/reducer';
import history from '../../../src/utils/history';
import configureStore from '../../../src/configureStore.js';

import CardHandSuit, { CardHandSuitBuilder } from '../../../src/containers/MainPage/EngineClasses/CardHandSuitBuilder';

describe('CardHandSuit Class', () => {
	test('can be constructed with two cards, and no suit entered', () => {
		//Given
		const cardOne = 'A';
		const cardTwo = 'K';

		//When
		const cardSuitHand = new CardHandSuitBuilder().build(cardOne, cardTwo);

		const result = cardSuitHand.getHand();

		//Then
		expect(result).toEqual('AKs');
	});

	test('can be constructed with two cards, and a suit entered', () => {
		const cardOne = 'A';
		const cardTwo = 'K';
		const suit = 's';

		const cardSuitHand = new CardHandSuitBuilder().build(cardOne, cardTwo, suit);

		const result = cardSuitHand.getHand();

		expect(result).toEqual('AKs');
	});

	test('can be constructed with two cards (reverse order), and a suit entered returns a CardHandSuit Object in normalized order', () => {
		const cardOne = 'K';
		const cardTwo = 'A';
		const suit = 'o';

		const cardSuitHand = new CardHandSuitBuilder().build(cardOne, cardTwo, suit);

		const result = cardSuitHand.getHand();

		expect(result).toEqual('AKo');
	});
	test('CardHandSuitBuilder can build a CardHandSuit given a cardOne of Q, cardTwo of J, and suited', () => {
		//Given
		const cardOne = 'Q';
		const cardTwo = 'J';
		const suit = 's';

		//When
		const resultBuilder = new CardHandSuitBuilder();
		const resultCardHandSuit = resultBuilder.build(cardOne, cardTwo, suit);
		const result = resultCardHandSuit.getHand();

		//Then
		expect(result).toBe('QJs');
	});

	test('CardHandSuitBuilder can build a CardHandSuit given a cardOne of Q, cardTwo of J, and suited', () => {
		//Given
		const cardOne = 'A';
		const cardTwo = 'T';

		//When
		const resultBuilder = new CardHandSuitBuilder();
		const resultCardHandSuit = resultBuilder.build(cardOne, cardTwo);
		const result = resultCardHandSuit.getHand();

		//Then
		expect(result).toBe('ATs');
	});
	test('CardHandSuitBuilder can build a CardHandSuit given a cardOne of Q, cardTwo of J, and suit of cs', () => {
		//Given
		const cardOne = 'A';
		const cardTwo = 'T';
		const suit = 'cs';

		//When
		const resultBuilder = new CardHandSuitBuilder();
		const resultCardHandSuit = resultBuilder.build(cardOne, cardTwo, suit);
		const result = resultCardHandSuit.getHand();

		//Then
		expect(result).toBe('AcTs');
	});
	test('CardHandSuitBuilder can build a CardHandSuit given a cardOne of Th, cardTwo of 8s, and suit of cs', () => {
		//Given
		const cardOne = 'Th';
		const cardTwo = '8s';
		const suit = '';

		//When
		const resultBuilder = new CardHandSuitBuilder();
		const resultCardHandSuit = resultBuilder.build(cardOne, cardTwo, suit);
		const result = resultCardHandSuit.getHand();

		//Then
		expect(result).toBe('Th8s');
	});
});
