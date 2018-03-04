___

# Memory Game Project

For this project I wanted to make a card matching game in which cards are shuffled into a random order and placed face down. Cards are then revealed by clicking on them and compared to see if they match. If they do not match the cards are turned back face down. If they match they stay visible. The player must match all the cards in a set time. I wanted to make use of new **ES6** javascript to write the game and use the **gulp** build tool to process the **ES6** back to **ES5** code for the distribution version.

This project is adapted from Udacity's memory game project which is part of the **Frontend Nanodegree** [program](https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001).
___


### Memory Game

Visit game: [visit game](http://www.it48.xyz/memory-game-project)

![Game screen shot](src/img/readme-images/memory-game-screen.jpg)
___


## Overview

#### Game specification

- Cards must be shuffled into a random order.
- Cards must all start face down.
- Cards must turn over when clicked.
- The first two cards turned over must be compared.
- If they match they must remain visible.
- If they do not match they must turn back over.
- The game must complete when all the cards are matched.
- Should have a game reset button.


#### Extra

- Animation and styling effects for viewing and displaying the cards.
- A counter to keep track of the number of moves the player has made.
- Star rating that reduces based on the number of moves it takes to match all the cards.
- A timer that counts down for each game.
- Game information screens for start, out of time and cards all matched.


#### Code Specification

- Make use of new **ES6** javascript to write the games functionality.
- Use the **Gulp** build tool to process the code, including to convert the **ES6** code to **ES5** for distribution.

- Shuffle the list of cards.
- Loop through each card and create its **HTML**
- Add each card's **HTML** to the page
- Set up the event listener for a card. If a card is clicked:

  - Display the card's symbol (put this functionality in another function that you call from this one)
  - Add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  - If the list already has another card, check to see if the two cards match
  - If the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
  - If the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
  - Increment the move counter and display it on the page (put this functionality in another function that you call from this one)
  - If all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
___


## Installation

To run the project please **fork** a copy to your **Git Hub** account and **clone** to your local machine with **Git**.

- You will need to run the combined gulp task **gulp build**, to set up the project. See instructions below for running gulp.
- You can then open **index.html** in the browser to view. Or open the distribution version by opening the **index.html** located in the **dist** directory.

### To run Gulp tasks

I've used **Gulp** for various tasks including to process the **ES6** javascript to **ES5** with **babel** and **webpack** and to minify the css and javascript into the **dist** directory.  If you do not have **Node.js** and **Gulp** running on your system, follow these steps:

### Install Node.js and Gulp CLI

1. To use **Gulp** you will need to have **Node.js** running on your system. [down load node](https://nodejs.org/en/).
2. Change to the project's root directory:
```bash
   cd /example/path/to/project-directory
```
3. Install the projects dependencies (these are listed in the package.json file) by running:
```bash
   npm install
```
4. You then need to have the **Gulp command line interface (CLI)** installed globally. Run the following on Node.js command line:
```bash
   npm install --global gulp-cli
```
5. Continue with step **3** from instructions below:


### You have Node.js and the Gulp CLI

1. Change to the project's root directory (if you are not already in that location):
```bash
   cd /example/path/to/project-directory
```
2. Install the projects dependencies (these are listed in the package.json file) by running:
```bash
   npm install
```
3. Set up the project by running the combined **gulp** task:
```bash
   gulp build
```

#### Notes:

- Running **gulp build** task will **delete** the content of the **dist** and **.tmp** directories if they exist.
- Then it will process folders and files in **src** directory and send the processed versions to the **dist** directory.
- It will also create a separate **.tmp** directory.
- **index.html** in the project root is set up to reference js files in the **dist** directory so **gulp** must be run first.
- Once **gulp** is run you can also open the distribution version of **index.html** located in the **dist** directory.

See these extra instructions for [getting started with Gulp](https://github.com/gulpjs/gulp/blob/v3.9.1/docs/getting-started.md) (if needed).
___
