import CardHandSuit from './CardHandSuit';

const orderedCard = [ 'A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2' ];

export class CardHandSuitBuilder {
	build(cardOnePar, cardTwoPar, suitPar = '') {
		let suit, createdSuitHand;
		suit = this.assignSuit(suitPar, cardOnePar, cardTwoPar);

		// cardOne = Ac cardTwo = Td
		if (cardOnePar.length === 2) {
			createdSuitHand = this.buildWithCardOneTwoAndNoSuit(cardOnePar, cardTwoPar);
		}
		// cardOne = K, cardTwo = 9, suit= cd
		if (suitPar.length === 2 && cardOnePar.length === 1) {
			createdSuitHand = this.buildWithCardOneAndSuitCardTwoAndSuit(cardOnePar, cardTwoPar, suitPar);
		}
		// cardOne = T, cradTwo = J
		if (suitPar.length === 0 && cardOnePar.length === 1) {
			createdSuitHand = this.buildWithCardOneCardTwoAndSpecificHand(cardOnePar, cardTwoPar);
		}

		// cardOne = T, cardTwo = J, suit = s
		if ((suitPar.length === 1) & (cardOnePar.length === 1)) {
			const cardOrder = this._getCards(cardOnePar, cardTwoPar);
			createdSuitHand = new CardHandSuit(cardOrder[0], cardOrder[1], suitPar);
		}

		return createdSuitHand;
	}

	assignSuit(suitPar, cardOnePar, cardTwoPar) {
		let suit;
		if (suitPar.length === 1) suit = suitPar;
		if (suitPar.length < 1) suit = this._displayCardSuit(cardOnePar, cardTwoPar);
		if (suitPar === 0) suit = '';
		return suit;
	}

	buildWithCardOneCardTwoAndSpecificHand(cardOnePar, cardTwoPar) {
		const cardOne = this._getCards(cardOnePar, cardTwoPar)[0];
		const cardTwo = this._getCards(cardOnePar, cardTwoPar)[1];
		const suit = this._displayCardSuit(cardOnePar, cardTwoPar);
		return new CardHandSuit(cardOne, cardTwo, suit);
	}

	buildWithCardOneAndSuitCardTwoAndSuit(cardOnePar, cardTwoPar, suitPar) {
		const optionalCardSuitOne = suitPar.length > 1 ? suitPar.substring(0, 1) : '';
		const optionalCardSuitTwo = suitPar.length > 1 ? suitPar.substring(1, 2) : '';
		const suit = optionalCardSuitOne + optionalCardSuitTwo;
		const cardOne = cardOnePar;
		const cardTwo = cardTwoPar;
		return new CardHandSuit(cardOne, cardTwo, suit);
	}
	buildWithCardOneTwoAndNoSuit(cardOne, cardTwo) {
		const combinedSingleHandSuit = cardOne.substr(1, 1) + cardTwo.substr(1, 1);
		const cardOneRank = cardOne.substr(0, 1);
		const cardTwoRank = cardTwo.substr(0, 1);
		return new CardHandSuit(cardOneRank, cardTwoRank, combinedSingleHandSuit);
	}
	//TODO: Make public method of CardHandSuit
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
	//TODO: Make public method of CardHandSuit
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
}
