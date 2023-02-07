# sudoku game

## About

I want to share something with you, some time ago, I play sudoku game and it really inspired me, I like this game very much, so I decided why not I try to make this game. So I start working on this game and try to understand the logic of game. After some time I fully understood the logic of the game and I started working on it and I made this game and I will share the logic with you. I made this game just to help people and I will share the logic everyone can make this game their own logic but I am sharing my repo and you can also contribute.

## How to play this game

The goal of Sudoku is to fill the cells with numbers from 1 to 9. The numbers are placed in 9 squares, 3x3 each, thus, in each row, in each column and in each small square there are 9 cells. The same digit can be used only once in each separate column, each line and in each small square. The level of difficulty depends on how many digits are already indicated in the cells. If you open plenty of numbers - then you have very easy Sudoku.

you can see more details on this link: https://sudoku.com/easy/

## Game Logic

We have to create patterns first as you can see in the constants/patterns, all values set according to the ids, then we have to take some random values to show in the UI, so when user enter the value in the cell so we can check the value against the Id whether value is match or not, according to this we can handle all the scnarios as you can see in the code.

## Quick start


1.  Make sure that you have Node.js v16.15.1 and npm v5 or above installed.
2.  Clone this repo using `https://github.com/AhmadFaraz-crypto/sudoku.git`
3.  Move to the appropriate directory: `cd sudoku`.<br />
4.  Run `npm install` in order to install dependencies and clean the git repo.<br />
    _At this point you can run `npm start` to see the example app at `http://localhost:3000`._
5.  Run `yarn test` to run test cases.
6.  Run `yarn run clean` to delete the example app.

## Contributions

Everyone can contribute to this game, there are a lot of things and improvements I haven't done yet, you can create an issue and make a pull request so we can work on it.

## Demo

https://youtu.be/-RXfNFVAgWg
