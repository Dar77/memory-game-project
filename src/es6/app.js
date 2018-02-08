/*
 * Create a list that holds all of your cards
 */
const deck = [
	'fa fa-diamond',
	'fa fa-paper-plane-o',
	'fa fa-anchor',
	'fa fa-bolt',
	'fa fa-cube',
	'fa fa-anchor',
	'fa fa-leaf',
	'fa fa-bicycle',
	'fa fa-diamond',
	'fa fa-bomb',
	'fa fa-leaf',
	'fa fa-bomb',
	'fa fa-bolt',
	'fa fa-bicycle',
	'fa fa-paper-plane-o',
	'fa fa-cube'
];

const visibleCards = [];


// Display the cards on the page

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// shuffle the list of cards using the provided "shuffle" function
shuffle(deck);

// loop through each card and create its HTML
const displayCards = deck => {
	const selection = document.getElementById('deck');
	for (card of deck) {
		const elem = document.createElement('li');
		elem.className = 'card';
		selection.appendChild(elem);
		elem.innerHTML = `<i class=" ${card} "></i>`;
	}
};

// add each card's HTML to the page
displayCards(deck);


// set up the event listener for a card. If a card is clicked:
const cardClicked = function() {
	const selectedCard = document.getElementById('deck');
	selectedCard.addEventListener('click', function(e) {
		const target = e.target;
		displayCard(target); // - display the card's symbol (put this functionality in another function that you call from this one)
		openCards(target); // - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
	}, false);
};

cardClicked();

//  - display the card's symbol
const displayCard = display => display.className = 'card match';

//  - add the card to a *list* of "open" cards
const openCards = card => {
	if (visibleCards.length === 2) { //  - if the list already has another card, check to see if the two cards match
		let match = false;
		checkMatch();
	}
	visibleCards.push(card);
	console.log(visibleCards, 'visibleCards content');
};

//  - if the list already has another card, check to see if the two cards match
const checkMatch = () => {
	//TODO
};

//    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
const matching = () => {
	//TODO
};

//    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
const hideCards = () => {
	//TODO
};

//    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
const moveCounter = () => {
	//TODO
};

//    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
const allMatched = () => {
	//TODO
};
