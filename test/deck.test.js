const _ = require("lodash");
const expect = require("chai").expect;

let Deck = require("../lib/deck");
const ppnString = "123456789ABCDEFGHIJKLMNOPQRSTUVW";
const unicodeString = "7♠8♠9♠X♠J♠Q♠K♠A♠7♦8♦9♦X♦J♦Q♦K♦A♦7♥8♥9♥X♥J♥Q♥K♥A♥7♣8♣9♣X♣J♣Q♣K♣A♣";
const fullString = "7Spade8Spade9SpadeXSpadeJSpadeQSpadeKSpadeASpade7Diamond8Diamond9DiamondXDiamondJDiamondQDiamondKDiamondADiamond7Heart8Heart9HeartXHeartJHeartQHeartKHeartAHeart7Club8Club9ClubXClubJClubQClubKClubAClub";

describe("Deck tests", function () {
	it("Deck should exist", function () {
		expect(Deck).to.exist;
	});

	describe("Deck constructor/getters tests", function () {
		it("contructor should create object", function () {
			expect(() => new Deck()).to.not.throw();
			expect(new Deck()).to.be.a("object");
		});
		it("Deck getPPN should equal to " + ppnString, function () {
			expect(new Deck().getPPN()).to.be.equal(ppnString);
		});
		it("Deck toString should equal to " + fullString, function () {
			expect(new Deck().toString()).to.be.equal(fullString);
		});
		it("Deck toUnicodeString should equal to " + unicodeString, function () {
			expect(new Deck().toUnicodeString()).to.be.equal(unicodeString);
		});
		it("Deck all should return array", function () {
			expect(new Deck().all()).to.be.an("array");
		});
		it("Deck all should return 32 cards", function () {
			expect(new Deck().all()).to.have.lengthOf(32);
		});
	});

	describe("Deck validate tests", function () {
		it("Deck validate for all should return true", function () {
			expect(Deck.validate(new Deck().all())).to.be.equal(true);
		});
		it("Deck validate should return false", function () {
			expect(Deck.validate(2)).to.be.equal(false);
			expect(Deck.validate([])).to.be.equal(false);
			expect(Deck.validate("puppy")).to.be.equal(false);
		});
	});

	describe("Deck isValid tests", function () {
		it("Deck isValid should return true", function () {
			expect(new Deck().isValid()).to.be.equal(true);
		});
	});

	describe("Deck cut tests", function () {
		let deck = new Deck();
		deck = deck.cut();
		it("Deck cut should return object", function () {
			expect(deck).to.be.a("object");
		});
		it("Deck cut should not equal to " + ppnString, function () {
			expect(deck.getPPN()).to.be.not.equal(ppnString);
		});
		it("Deck cut should return array of length 32", function () {
			expect(deck.all()).to.be.an("array");
			expect(deck.all()).to.have.lengthOf(32);
		});
	});

	describe("Deck cut stress test", function () {
		let deck = new Deck();
		_.forEach(_.times(1000), () => deck.cut());
		it("Deck 1000 cuts should return array of length 32", function () {
			expect(deck.all()).to.be.an("array");
			expect(deck.all()).to.have.lengthOf(32);
		});
	});

	describe("Deck shuffle tests", function () {
		let deck = new Deck();
		let shuffle = deck.shuffle();
		it("Deck shuffle should return object", function () {
			expect(shuffle).to.be.a("object");
		});
		it("Deck shuffle should not equal to " + ppnString, function () {
			expect(shuffle.getPPN()).to.be.not.equal(ppnString);
		});
		it("Deck shuffle should return array of length 32", function () {
			expect(shuffle.all()).to.be.an("array");
			expect(shuffle.all()).to.have.lengthOf(32);
		});
		_.forEach(_.times(1000), () => shuffle = deck.shuffle());
		it("Deck 1000 shuffles should return array of length 32", function () {
			expect(shuffle.all()).to.be.an("array");
			expect(shuffle.all()).to.have.lengthOf(32);
		});
	});

	describe("Deck deal tests", function () {
		let deal = new Deck().deal();
		it("Deck deal should return object", function () {
			expect(deal).to.be.a("object");
		});
		it("Deck cut should not equal to " + ppnString, function () {
			expect(deal.p1).to.be.a("object");
			expect(deal.p1.all()).to.be.an("array");
			expect(deal.p1.all()).to.have.lengthOf(10);
			expect(deal.p2).to.be.a("object");
			expect(deal.p2.all()).to.be.an("array");
			expect(deal.p2.all()).to.have.lengthOf(10);
			expect(deal.p3).to.be.a("object");
			expect(deal.p3.all()).to.be.an("array");
			expect(deal.p3.all()).to.have.lengthOf(10);
			expect(deal.t).to.be.a("object");
			expect(deal.t.all()).to.be.an("array");
			expect(deal.t.all()).to.have.lengthOf(2);
		});
	});

	describe("Deck restore tests", function () {
		let deck = new Deck();
		let deal = deck.deal();
		it("Deck restore for cards should not throw", function () {
			expect(() => deck.restore(deck.all())).to.not.throw();
			let deck2 = new Deck();
			let cutted = deck2.cut().all();
			let shuffled = deck2.shuffle().all();
			expect(() => deck.restore(deck2.all())).to.not.throw();
			expect(deck.restore(deck2.all())).to.be.a("object");
			expect(() => (deck.restore(cutted))).to.not.throw();
			expect(deck.restore(cutted)).to.be.a("object");
			expect(() => deck.restore(shuffled)).to.not.throw();
			expect(deck.restore(shuffled)).to.be.a("object");
		});
		it("Deck restore for cards should throw", function () {
			expect(() => deck.restore()).to.throw();
			expect(() => deck.restore(1)).to.throw();
			expect(() => deck.restore([])).to.throw();
			expect(() => deck.restore("puppy")).to.throw();
			expect(() => deck.restore(deal.p1.all())).to.throw();
		});
		it("Deck validate should return false", function () {
			expect(Deck.validate(2)).to.be.equal(false);
			expect(Deck.validate([])).to.be.equal(false);
			expect(Deck.validate("puppy")).to.be.equal(false);
		});
	});

});
