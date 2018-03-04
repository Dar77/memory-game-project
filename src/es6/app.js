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

let visibleCards = [], // array for cards being compared
	matchingCards = [], // array for matching cards
	cardIndex = 0, // initial value for the cards index
	moveCount = 0, // initial move count
	stars = 5, // initial value for star rating
	timeUp = false,
	time;

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
};

// shuffle the list of cards using the provided "shuffle" function
shuffle(deck);

// loop through each card and create its HTML
const displayCards = deck => { // es6 arrow function
	for (let card of deck) { // give each card a unique 'id' value and a 'class' value to show its icon
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
	});
};

cardClicked();

//  - display the card's symbol
const displayCard = display => $(display).addClass('show open');

//  - add the card to a *list* of "open" cards
const openCards = card => {
	let l = visibleCards.length;
	if (l > 0 && l < 2) { //  - if the list already has another card, check to see if the two cards match
		visibleCards.push(card); // add the selected card to the visible cards array
		checkMatch(card);
	} else {
		visibleCards.push(card); // add the selected card to the visible cards array
	}
	moveCounter(); // + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
	removeStars();
	allMatched(); // + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
};

//  - check to see if the two cards match
const checkMatch = clicked => {
	const a = $(clicked).find('i').attr('class'); //compare the class values
	const b = $(visibleCards[0]).find('i').attr('class');
	const ia = $(visibleCards[1]).attr('id'); // compare the id values (picks up if the same card is clicked twice)
	const ib = $(visibleCards[0]).attr('id');
	const match1 = clicked;
	const match2 = visibleCards[0];

	if (a == b && ia != ib) { // + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
			matching(match1, match2);
		} else { // + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
			setTimeout(() => { // delay the hideCards function, so player can see the cards do not match
			for (let card of visibleCards) {
				$(card).removeClass('open'); // remove the 'open' class
			}
				hideCards();
			}, 1100);
		}
};

// process matching cards
const matching = (match1, match2) => {
	matchingCards.push(match1, match2); // add the matching cards to the matching cards array
	for (let card of visibleCards) {
		$(card).removeClass('show').addClass('match'); // change the matching cards class to match
	}
	visibleCards = []; // clear the visibleCards array
};

// process cards that do not match
const hideCards = () => {
	for (let card of visibleCards) {
		$(card).removeClass('show');
	}
	visibleCards = []; // clear the visibleCards array
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

// initially hide the info screens for 'all cards matched' and 'out of time'
const hideScreens = () => $('.all-matched, .out-of-time').hide();

hideScreens();

// if all cards have matched, display a message with the final score
const allMatched = () => {
	const ln = matchingCards.length;
	if (ln === 16) {
		const msg = `<div class="info del"><h2>All Matched!</h2><p>You have matched all the cards!</p><p>You completed the game in ${$('.timer').text()} and ${moveCount} moves.</p></div>`;
		$('.all-matched').append(msg).fadeIn(1500);
	}
};

// game timer - based on Timer function from https://stackoverflow.com/questions/31559469/how-to-create-a-simple-javascript-timer
const startTimer = duration => {
    let timer = duration, minutes, seconds;
    time = setInterval(() => {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? `0${minutes}` : minutes; // if value is less than 10 add a zero in front
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        $('.timer').text(`${minutes}:${seconds}`); // add the time to document

        // check if all cards have been matched or the timer has reached 0
        if (matchingCards.length === 16) {
            clearInterval(time);
			$('.timer').text(' ');
        } else if (--timer < 0) {
            clearInterval(time);
            timeUp = true;
            outOfTime();
        }
    }, 1000);
}


const gameTime = () => {
	$('.start-button').on('click', function(){ // add an onclick event to start timer
    	startTimer(60 * 1); // call startTimer with the count downs initial value
    	$('.start').fadeOut(1500);
	});
};

gameTime();

// out of time
const outOfTime = () => { // stop the game and display a message if the player runs out of time
	if (timeUp === true) {
		const msg = `<div class="info del"><h2>Sorry, you're out of time!</h2><p>You matched ${matchingCards.length} cards. Time's up ${$('.timer').text()}.</p></div>`;
		$('.out-of-time').append(msg).fadeIn(1500);
	}
};

outOfTime();

// reset game
const newGame = () => { // reset all the games components to their initial state etc.
	$('.restart').on('click', function() {
		clearInterval(time);
		$('.all-matched, .out-of-time').hide(); // hide info screens
    	$('.start').show(); // show the replay screen
		visibleCards = [];
		matchingCards = [];
		cardIndex = 0;
		moveCount = 0;
		stars = 5;
		timeUp = false;
		$('.moves').text(0);
		$('.stars .fa').remove();
		rating();
		$('.matched').remove();
		$('.deck li').remove();
		$('.del').remove(); // removes previous screen message to prevent repeats
		shuffle(deck);
		displayCards(deck);
	});
};

newGame();


