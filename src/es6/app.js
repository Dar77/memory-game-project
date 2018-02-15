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

// use es6 spread operator to double the pack to create the games deck
const deck = [...pack, ...pack];

let visibleCards = []; // array for cards being compared
const matchingCards = []; // array for matching cards
let cardIndex = 0; // initial value for the cards index
let moveCount = 0; // initial move count
let stars = 5; // initial value for star rating

// Display the cards on the page - shuffle function from http://stackoverflow.com/a/2450976
const shuffle = array => {
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
	for (card of deck) { // give each card a unique 'id' value and a 'class' value to show its icon
		const placeCard = `<li id="index${cardIndex++}" class="card"><i class="${card}"></i></li>`; // es6 template literal
		$('#deck').append(placeCard);
	}
};

// add each card's HTML to the page
displayCards(deck);


// set up the event listener for a card. If a card is clicked:
const cardClicked = () => {
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
	moveCounter(); // + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
	removeStars();
	allMatched(); // + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
	console.log(visibleCards, 'visibleCards content');
};

//  - check to see if the two cards match
const checkMatch = clicked => {
	const a = $(clicked).find('i').attr('class'); //compare the class values
	const b = $(visibleCards[0]).find('i').attr('class');
	const ia = $(visibleCards[1]).attr('id'); // compare the id values (picks up if the same card is clicked twice)
	const ib = $(visibleCards[0]).attr('id');
	const match1 = clicked;
	const match2 = visibleCards[0];

	// TODO
	// needs a check for clicking twice on the same card that currently results in a match
	if (a == b && ia != ib) { // + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
			console.log('this is a match', a, 'this is a', ia, 'this is ia', b, 'this is b', ib, 'this is ib');
			matching(match1, match2);
		} else { // + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
			console.log('does not match', a, 'this is b', ia, 'this is ia', b, 'this is b', ib, 'this is ib');
			setTimeout(function () { // delay the hideCards function, so player can see the cards do not match
				hideCards();
			}, 600);
		}
};

// process matching cards
const matching = (match1, match2) => {
	matchingCards.push(match1, match2); // add the matching cards to the matching cards array
	for (card of visibleCards) {
		$(card).removeClass('show').addClass('match'); // change the matching cards class to match
	}
	visibleCards = []; // clear the visibleCards array
	console.log(matchingCards, 'matching cards array');
};

// process cards that do not match
const hideCards = () => {
	console.log('hideCards');
	for (card of visibleCards) {
		$(card).removeClass('show');
	}
	visibleCards = []; // clear the visibleCards array
	console.log(visibleCards, 'visibleCards content');
};

// increment the move counter and display it on the page
const moveCounter = () => {
	moveCount++;
	$('.moves').text(moveCount);
};

// display the star rating
const rating = () => {
	for (let i = 0; i < stars; i++) {
		const starRating = `<li><i class="fa fa-star"></i></li>`;
		$('.stars').append(starRating);
	}
};

rating();

// remove stars
const removeStars = () => {
	const str = $('.stars')
	let m = moveCount;
	if (m > 26 && m <= 36) { // check the players current number of moves
		stars = 4;
		$('.stars .fa').remove(); // remove stars based on this
		rating();
	} else if (m > 36 && m <= 46) {
		stars = 3;
		$('.stars .fa').remove();
		rating();
	} else if (m > 46 && m <= 56) {
		stars = 2;
		$('.stars .fa').remove();
		rating();
	} else if (m > 56) {
		stars = 1;
		$('.stars .fa').remove();
		rating();
	} else {
		stars = 5;
	}
}

// if all cards have matched, display a message with the final score
const allMatched = () => {
	// TODO
	// needs to be added to a modal that covers game screen (preventing further interaction with cards)
	const l = matchingCards.length;
	if (l === 16 && l < 17) {
		const msg = `<section class="matched"><h2>All Matched!</h2><p>You have matched all the cards!</p><p>You completed the game in ${moveCount} moves.</p></section>`;
		$('.container').append(msg);
	}
};

/* new game
const newGame = () => {
	// TODO
	// needs to be added as an onclick function for refresh icon

	visibleCards = [];
	matchingCards = [];
	moveCount = 0;
	shuffle(deck);
}
*/
