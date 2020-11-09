const orderedCard = [ 'A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2' ];

export default class CardHandSuit {
	constructor(cardOne, cardTwo, suit = '') {
		this.cardOne = cardOne;
		this.cardTwo = cardTwo;
		this.suit = suit;
		this.equity = 'n/a'; //FIXME: REMOVE
	}

	getHand() {
		if (this.suit.length > 1) return this.cardOne + this.suit.substr(0, 1) + this.cardTwo + this.suit.substr(1, 1);
		else return this.cardOne + this.cardTwo + this.suit;
	}

	getHandArray() {
		return [ this.cardOne, this.cardTwo, this.suit ];
	}

	isInRange(rangeObj) {
		let filteredRangeObj = [];

		if (rangeObj === [] || rangeObj === [ [], [], [], [] ]) return false;

		filteredRangeObj = rangeObj.filter((cardHandSuitObj) => {
			let numObjects = (cardHandSuit) =>
				cardHandSuit.filter((hand) => hand.getHand() == this.cardOne + this.cardTwo + this.suit);
			return numObjects(cardHandSuitObj).length > 0;
		});

		return filteredRangeObj.length > 0;
	}

	isSuit(suit) {
		return this.suit === suit;
	}

	indexsOf(arrayOfCardHandSuit) {
		let Index = -1;
		arrayOfCardHandSuit.forEach((cardHandSuits, idx) => {
			if (this.isInRange([ cardHandSuits ])) Index = idx;
		});

		return Index;
	}
}
