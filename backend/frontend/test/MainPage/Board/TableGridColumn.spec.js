import React from 'react';

import { CardHandSuitBuilder } from '../../../src/containers/MainPage/EngineClasses/CardHandSuitBuilder';
import { colorCell } from '../../../src/containers/MainPage/EngineClasses/colorCellFn';

describe('Table Grid Column', () => {
	test(' the function colorCell returns the given colorCard suit for a pair', () => {
		const cards = { '77': { colorCards: '#198f35', equity: 'n/a' } };
		const cardHandSuit = new CardHandSuitBuilder().build('7', '7', '');

		const result = colorCell(cards, cardHandSuit);

		expect(result).toStrictEqual([ '#198f35' ]);
	});

	test(' the function colorCell returns the given colorCard suit for a suited hand', () => {
		const cards = { '76s': { colorCards: '#198f35', equity: 'n/a' } };
		const cardHandSuit = new CardHandSuitBuilder().build('7', '6', 's');

		const result = colorCell(cards, cardHandSuit);

		expect(result).toStrictEqual([ '#198f35' ]);
	});

	test(' the function colorCell returns blank when given a suited cards hand and an offsuit CardHandSuitBuilder().build', () => {
		const cards = { '76s': { colorCards: '#198f35', equity: 'n/a' } };
		const cardHandSuit = new CardHandSuitBuilder().build('7', '6', 'o');

		const result = colorCell(cards, cardHandSuit);

		expect(result).toStrictEqual([ '#DDD' ]);
	});

	test(' the function colorCell returns the given colorCard suit for a offsuit hand', () => {
		const cards = { '76o': { colorCards: '#198f35', equity: 'n/a' } };
		const cardHandSuit = new CardHandSuitBuilder().build('7', '6', 'o');

		const result = colorCell(cards, cardHandSuit);

		expect(result).toStrictEqual([ '#198f35' ]);
	});

	test(' the function colorCell returns the given colorCard suit for a specific offsuit hand', () => {
		const cards = { '7c6d': { colorCards: '#198f35', equity: 'n/a' } };
		const cardHandSuit = new CardHandSuitBuilder().build('7', '6', 'o');

		const result = colorCell(cards, cardHandSuit);

		expect(result).toStrictEqual([ '#198f35', '#DDD', '#DDD', '#DDD', '#DDD', '#DDD', '#DDD', '#DDD', '#DDD', '#DDD', '#DDD', '#DDD' ]);
	});

	test(' the function colorCell returns the given colorCard suit for a specific suited hand', () => {
		const cards = { '7c6c': { colorCards: '#198f35', equity: 'n/a' } };
		const cardHandSuit = new CardHandSuitBuilder().build('7', '6', 's');

		const result = colorCell(cards, cardHandSuit);

		expect(result).toStrictEqual([ '#198f35', '#DDD', '#DDD', '#DDD' ]);
	});

	test(' the function colorCell returns the given colorCard suit for two specific suited hand', () => {
		const cards = {
			'7c6c': { colorCards: '#198f35', equity: 'n/a' },
			'7s6s': { colorCards: '#198f35', equity: 'n/a' }
		};
		const cardHandSuit = new CardHandSuitBuilder().build('7', '6', 's');

		const result = colorCell(cards, cardHandSuit);

		expect(result).toStrictEqual([ '#198f35', '#198f35', '#DDD', '#DDD' ]);
	});
});
