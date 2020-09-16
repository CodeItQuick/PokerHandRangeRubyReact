const orderedCard = [ 'A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2' ];

export default class CardHandSuit {
	constructor(cardOne, cardTwo, suit = '') {
		this.cardOne = cardOne;
		this.cardTwo = cardTwo;
		this.suit = suit;
		this.equity = 'n/a'; //FIXME: REMOVE
	}

	//TODO: getCards and displayCardSuit should be an orderedCard object/class
	_getCards(cardOne, cardTwo) {
		let card1 = '',
			card2 = '';
		if (orderedCard.indexOf(cardOne) < orderedCard.indexOf(cardTwo)) {
			card1 = cardOne;
			card2 = cardTwo;
		} else if (cardOne === cardTwo) {
			card1 = cardOne;
			card2 = cardTwo;
		} else {
			card1 = cardTwo;
			card2 = cardOne;
		}
		return [ card1, card2 ];
	}

	_displayCardSuit(cardOne, cardTwo) {
		let displaySuit = '';
		if (orderedCard.indexOf(cardOne) < orderedCard.indexOf(cardTwo)) {
			displaySuit = 's';
		} else if (orderedCard.indexOf(cardOne) === orderedCard.indexOf(cardTwo)) {
			displaySuit = '';
		} else {
			displaySuit = 'o';
		}
		return displaySuit;
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
