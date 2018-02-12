/*
 * Create a list that holds all of your cards
 */
const pack = [
	'fa fa-diamond',
	'fa fa-paper-plane-o',
	'fa fa-anchor',
	'fa fa-bolt',
	'fa fa-cube',
	'fa fa-leaf',
	'fa fa-bicycle',
	'fa fa-bomb'
];

// use es6 spread operator to double pack to create the games deck
const deck = [...pack, ...pack];

let visibleCards = [];
const matchingCards = [];


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
const displayCards = deck => { // es6 arrow function
	for (card of deck) {
		const placeCard = `<li class="card"><i class=" ${card} "></i></li>`; // es6 template literal
		$('#deck').append(placeCard);
	}
};

// add each card's HTML to the page
displayCards(deck);


// set up the event listener for a card. If a card is clicked:
const cardClicked = function() {
	$('#deck').on('click', 'li', function(e){
		const target = e.target;
		displayCard(target); // - display the card's symbol (put this functionality in another function that you call from this one)
		openCards(target); // - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
		console.log(target, 'this is target');
	});
};

cardClicked();

//  - display the card's symbol
const displayCard = display => $(display).addClass('show');

//  - add the card to a *list* of "open" cards
const openCards = card => {
	if (visibleCards.length > 0) { //  - if the list already has another card, check to see if the two cards match
		visibleCards.push(card); // add the selected card to the visible cards array
		checkMatch(card);
	} else {
	visibleCards.push(card); // add the selected card to the visible cards array
	}
	console.log(visibleCards, 'visibleCards content');
};

//  - if the list already has another card, check to see if the two cards match
const checkMatch = clicked => {
	const a = $(clicked).find('i').attr('class'); //compare the class values
	const b = $(visibleCards[0]).find('i').attr('class');
	console.log(a, 'this is a', b, 'this is b' );
	const match1 = clicked;
	const match2 = visibleCards[0];

	if (a == b) { // + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
			console.log('this is match', a, 'this is a', b, 'this is b' );
			matching(match1, match2);
		} else { // + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
			console.log('does not match');
			setTimeout(function () { // delay the hideCards function, so player can see the cards do not match
				hideCards();
			}, 600);
		}
};

// process matching cards
const matching = (match1, match2) => {
	matchingCards.push(match1, match2);
	for (card of visibleCards) {
		$(card).removeClass('show').addClass('match');
	}
	visibleCards = [];
	console.log(matchingCards, 'matching cards array');
};

// process cards that do not match
const hideCards = () => {
	console.log('hideCards');
	for (card of visibleCards) {
		$(card).removeClass('show');
	}
	visibleCards = [];
};

//    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
const moveCounter = () => {
	//TODO
};

//    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
const allMatched = () => {
	//TODO
};
