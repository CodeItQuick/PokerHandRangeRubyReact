import CardHandSuit from "../../../src/containers/MainPage/EngineClasses/CardHandSuit"
import RangeObject from "../../../src/containers/MainPage/EngineClasses/RangeObject";
import { RangeObjectCollection } from "../../../src/containers/MainPage/EngineClasses/RangeObjectCollection";
const data = [
	{ Street: 'Preflop', BetType: 'Raise4BetCall', hands: ['AA'] },
	{ Street: 'Preflop', BetType: 'Raise4BetFold', hands: [] },
	{ Street: 'Preflop', BetType: 'RaiseCall', hands: [] },
	{ Street: 'Preflop', BetType: 'RaiseFold', hands: [] },
	{ Street: 'Flop', BetType: 'Valuebet', hands: [] },
	{ Street: 'Flop', BetType: 'Bluff', hands: [] },
	{ Street: 'Flop', BetType: 'CheckCall', hands: [] },
	{ Street: 'Flop', BetType: 'CheckFold', hands: [] },
	{ Street: 'Turn', BetType: 'Valuebet', hands: [] },
	{ Street: 'Turn', BetType: 'Bluff', hands: [] },
	{ Street: 'Turn', BetType: 'CheckCall', hands: [] },
	{ Street: 'Turn', BetType: 'CheckFold', hands: [] },
	{ Street: 'River', BetType: 'Valuebet', hands: [] },
	{ Street: 'River', BetType: 'Bluff', hands: [] },
	{ Street: 'River', BetType: 'CheckCall', hands: [] },
	{ Street: 'River', BetType: 'CheckFold', hands: [] }
];
describe('CardHandSuit can ', () => {
    test('can return its own value', () => {
        const newCardHand = new CardHandSuit('A', 'A', '');
        expect(newCardHand.getHand()).toBe("AA")
        expect(newCardHand.getHandArray()).toStrictEqual(["A", "A", ""])
    })
    test('can return its own value', () => {
        const newCardHand = new CardHandSuit('A', 'K', 'o');
        expect(newCardHand.getHand()).toBe("AKo")
        expect(newCardHand.getHandArray()).toStrictEqual(["A", "K", "o"])

    })
    test('can return its own value', () => {
        const newCardHand = new CardHandSuit('K', 'Q', 's');
        expect(newCardHand.getHand()).toBe("KQs")
        expect(newCardHand.getHandArray()).toStrictEqual(["K", "Q", "s"])

    })
})