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
let matchingCards = []; // array for matching cards
let cardIndex = 0; // initial value for the cards index
let moveCount = 0; // initial move count
let stars = 5; // initial value for star rating
let stopTimer = false; // initial value for the timer

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
const displayCard = display => $(display).addClass('show open');

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
			for (card of visibleCards) {
				$(card).removeClass('open'); // remove the 'open' class
			}
				hideCards();
			}, 1100);
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
	const l = matchingCards.length;
	if (l === 16 && l < 17) {
		stopTimer = true; // stop the timer
		const msg = `<section class="matched"><div class =info><h2>All Matched!</h2><p>You have matched all the cards!</p><p>You completed the game in ${$('.timer').text()} and ${moveCount} moves.</p></div></section>`;
		$('.container').append(msg).fadeIn(2000);
	}
};

// game timer - startTimer function from https://stackoverflow.com/questions/31559469/how-to-create-a-simple-javascript-timer
const startTimer = duration => {
    let timer = duration, minutes, seconds;
    let time = setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? `0${minutes}` : minutes; // if value is less than 10 add a zero in front
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        $('.timer').text(`${minutes}:${seconds}`);

        if (stopTimer === true) { // if the game has been re-started
            clearInterval(time);
            gameTime();
            stopTimer = false;
        } else if (--timer < 0) { // if the timer has reached 0
            clearInterval(time);
            stopTimer = false;
        }
    }, 1000);
}

const gameTime = () => {
	//$('.card').on('click', function(e){ // add an onclick event to start timer
    	startTimer(60 * 5); // call startTimer with the count downs initial value
	//});
};

gameTime();

// new game
const newGame = () => {
	$('.restart').on('click', function() { // reset all the games components to their initial state etc.
		stopTimer = true; // stop the timer
		visibleCards = [];
		matchingCards = [];
		cardIndex = 0;
		moveCount = 0;
		stars = 5;
		$('.moves').text(0);
		$('.stars .fa').remove();
		rating();
		$('.matched').remove();
		$('.deck li').remove();
		shuffle(deck);
		displayCards(deck);
	});
}

newGame();

