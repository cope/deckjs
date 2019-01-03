#!/usr/bin/env node
"use strict";

export enum PrefDeckCardValue {
	SEVEN = 7, EIGHT = 8, NINE = 9, TEN = 10,
	JACK = 12, QUEEN = 13, KING = 14, ACE = 15
}

export enum PrefDeckCardSuit {
	SPADE = "Spade",
	DIAMOND = "Diamond",
	HEART = "Heart",
	CLUB = "Club"
}

export default class PrefDeckCard {
	private readonly _suit: PrefDeckCardSuit;
	private readonly _value: PrefDeckCardValue;
	private readonly _rank: number;
	private readonly _label: string;
	private readonly _ppn: string;

	constructor(suit: PrefDeckCardSuit, value: PrefDeckCardValue) {
		this._suit = suit;
		this._value = value;
		this._rank = value;

		this._label = PrefDeckCard.valueLabel(this._value) + "" + this._suit;
		this._ppn = PrefDeckCard.cardToPPN(suit, value);
	}

	public static valueLabel(value: PrefDeckCardValue): string {
		switch (value) {
			case PrefDeckCardValue.SEVEN:
				return '7';
			case PrefDeckCardValue.EIGHT:
				return '8';
			case PrefDeckCardValue.NINE:
				return '9';
			case PrefDeckCardValue.TEN:
				return 'X';
			case PrefDeckCardValue.JACK:
				return 'J';
			case PrefDeckCardValue.QUEEN:
				return 'Q';
			case PrefDeckCardValue.KING:
				return 'K';
			case PrefDeckCardValue.ACE:
				return 'A';
		}
	}

	public static compare(c1: PrefDeckCard, c2: PrefDeckCard, t?: PrefDeckCardSuit) {
		if (c1.suit === c2.suit) return c2.rank - c1.rank;
		if (t && c2.suit === t) return 1;
		return -1;
	}

	public static winner(c1: PrefDeckCard, c2: PrefDeckCard, t?: PrefDeckCardSuit) {
		return PrefDeckCard.compare(c1, c2, t) < 0 ? c1 : c2;
	}

	public beats(c: PrefDeckCard, t?: PrefDeckCardSuit) {
		return PrefDeckCard.compare(this, c, t) < 0;
	}

	get suit(): PrefDeckCardSuit {
		return this._suit;
	}

	get value(): number {
		return this._value;
	}

	get rank(): number {
		return this._value;
	}

	get label(): string {
		return this._label;
	}

	get ppn(): string {
		return this._ppn;
	}

	public static suitToUnicode(suit: PrefDeckCardSuit): string {
		switch (suit) {
			case PrefDeckCardSuit.SPADE:
				return "♠";
			case PrefDeckCardSuit.DIAMOND:
				return "♦";
			case PrefDeckCardSuit.HEART:
				return "♥";
			case PrefDeckCardSuit.CLUB:
				return "♣";
		}
		throw new Error("PrefDeckCard::suitToUnicode:Invalid suit: " + suit);
	}

	public static cardToPPN(suit: PrefDeckCardSuit, value: PrefDeckCardValue): string {
		switch (suit) {
			case PrefDeckCardSuit.SPADE:
				return this.spadeCardToPPN(value);
			case PrefDeckCardSuit.DIAMOND:
				return this.diamondCardToPPN(value);
			case PrefDeckCardSuit.HEART:
				return this.heartCardToPPN(value);
			case PrefDeckCardSuit.CLUB:
				return this.clubCardToPPN(value);
		}
	}

	public static ppnToCard(ppn: string): PrefDeckCard {
		switch (ppn) {
			case "1":
				return new PrefDeckCard(PrefDeckCardSuit.SPADE, 7);
			case "2":
				return new PrefDeckCard(PrefDeckCardSuit.SPADE, 8);
			case "3":
				return new PrefDeckCard(PrefDeckCardSuit.SPADE, 9);
			case "4":
				return new PrefDeckCard(PrefDeckCardSuit.SPADE, 10);
			case "5":
				return new PrefDeckCard(PrefDeckCardSuit.SPADE, 12);
			case "6":
				return new PrefDeckCard(PrefDeckCardSuit.SPADE, 13);
			case "7":
				return new PrefDeckCard(PrefDeckCardSuit.SPADE, 14);
			case "8":
				return new PrefDeckCard(PrefDeckCardSuit.SPADE, 15);

			case "9":
				return new PrefDeckCard(PrefDeckCardSuit.DIAMOND, 7);
			case "A":
				return new PrefDeckCard(PrefDeckCardSuit.DIAMOND, 8);
			case "B":
				return new PrefDeckCard(PrefDeckCardSuit.DIAMOND, 9);
			case "C":
				return new PrefDeckCard(PrefDeckCardSuit.DIAMOND, 10);
			case "D":
				return new PrefDeckCard(PrefDeckCardSuit.DIAMOND, 12);
			case "E":
				return new PrefDeckCard(PrefDeckCardSuit.DIAMOND, 13);
			case "F":
				return new PrefDeckCard(PrefDeckCardSuit.DIAMOND, 14);
			case "G":
				return new PrefDeckCard(PrefDeckCardSuit.DIAMOND, 15);

			case "H":
				return new PrefDeckCard(PrefDeckCardSuit.HEART, 7);
			case "I":
				return new PrefDeckCard(PrefDeckCardSuit.HEART, 8);
			case "J":
				return new PrefDeckCard(PrefDeckCardSuit.HEART, 9);
			case "K":
				return new PrefDeckCard(PrefDeckCardSuit.HEART, 10);
			case "L":
				return new PrefDeckCard(PrefDeckCardSuit.HEART, 12);
			case "M":
				return new PrefDeckCard(PrefDeckCardSuit.HEART, 13);
			case "N":
				return new PrefDeckCard(PrefDeckCardSuit.HEART, 14);
			case "O":
				return new PrefDeckCard(PrefDeckCardSuit.HEART, 15);

			case "P":
				return new PrefDeckCard(PrefDeckCardSuit.CLUB, 7);
			case "Q":
				return new PrefDeckCard(PrefDeckCardSuit.CLUB, 8);
			case "R":
				return new PrefDeckCard(PrefDeckCardSuit.CLUB, 9);
			case "S":
				return new PrefDeckCard(PrefDeckCardSuit.CLUB, 10);
			case "T":
				return new PrefDeckCard(PrefDeckCardSuit.CLUB, 12);
			case "U":
				return new PrefDeckCard(PrefDeckCardSuit.CLUB, 13);
			case "V":
				return new PrefDeckCard(PrefDeckCardSuit.CLUB, 14);
			case "W":
				return new PrefDeckCard(PrefDeckCardSuit.CLUB, 15);
		}
		throw new Error("PrefDeckCard::cardToPPN:Invalid ppn: " + ppn);
	}

	private static spadeCardToPPN(value: PrefDeckCardValue): string {
		switch (value) {
			case PrefDeckCardValue.SEVEN:
				return "1";
			case PrefDeckCardValue.EIGHT:
				return "2";
			case PrefDeckCardValue.NINE:
				return "3";
			case PrefDeckCardValue.TEN:
				return "4";
			case PrefDeckCardValue.JACK:
				return "5";
			case PrefDeckCardValue.QUEEN:
				return "6";
			case PrefDeckCardValue.KING:
				return "7";
			case PrefDeckCardValue.ACE:
				return "8";
		}
	}

	private static diamondCardToPPN(value: PrefDeckCardValue): string {
		switch (value) {
			case PrefDeckCardValue.SEVEN:
				return "9";
			case PrefDeckCardValue.EIGHT:
				return "A";
			case PrefDeckCardValue.NINE:
				return "B";
			case PrefDeckCardValue.TEN:
				return "C";
			case PrefDeckCardValue.JACK:
				return "D";
			case PrefDeckCardValue.QUEEN:
				return "E";
			case PrefDeckCardValue.KING:
				return "F";
			case PrefDeckCardValue.ACE:
				return "G";
		}
	}

	private static heartCardToPPN(value: PrefDeckCardValue): string {
		switch (value) {
			case PrefDeckCardValue.SEVEN:
				return "H";
			case PrefDeckCardValue.EIGHT:
				return "I";
			case PrefDeckCardValue.NINE:
				return "J";
			case PrefDeckCardValue.TEN:
				return "K";
			case PrefDeckCardValue.JACK:
				return "L";
			case PrefDeckCardValue.QUEEN:
				return "M";
			case PrefDeckCardValue.KING:
				return "N";
			case PrefDeckCardValue.ACE:
				return "O";
		}
	}

	private static clubCardToPPN(value: PrefDeckCardValue): string {
		switch (value) {
			case PrefDeckCardValue.SEVEN:
				return "P";
			case PrefDeckCardValue.EIGHT:
				return "Q";
			case PrefDeckCardValue.NINE:
				return "R";
			case PrefDeckCardValue.TEN:
				return "S";
			case PrefDeckCardValue.JACK:
				return "T";
			case PrefDeckCardValue.QUEEN:
				return "U";
			case PrefDeckCardValue.KING:
				return "V";
			case PrefDeckCardValue.ACE:
				return "W";
		}
	}

}
