'use strict';

const X = 'X';
const O = 'O';
const EMPTY = '';

var gBoard;
var currPlayer;
var isGameOn;

//RESET BOARD-
function initGame() {
	document.querySelector('.btn').style.display = 'none';
	document.querySelector('h2').style.display = 'none';
	currPlayer = X;
	isGameOn = true;
	gBoard = buildBoard();
	renderBoard();
}

// MAT - MODEL
function buildBoard() {
	var board = [];
	for (var i = 0; i < 3; i++) {
		board[i] = [];
		for (var j = 0; j < 3; j++) {
			board[i][j] = EMPTY;
		}
	}
	return board;
}

//DOM
function renderBoard() {
	var strHTML = '';
	for (var i = 0; i < gBoard.length; i++) {
		strHTML += `<tr>`;
		for (var j = 0; j < gBoard[i].length; j++) {
			strHTML += `<td class="cell${i}${j}" onclick="cellClicked(this, ${i}, ${j})">${EMPTY}</td>`;
		}
		strHTML += `</tr>`;
	}
	var elBoard = document.querySelector('.cells');
	elBoard.innerHTML = strHTML;
}

// PLAYERS
function cellClicked(elCell, i, j) {
	if (elCell.innerHTML !== EMPTY) return;
	if (!isGameOn) return;
	//update DOM-
	elCell.innerHTML = currPlayer;
	//update Model-
	gBoard[i][j] = currPlayer;

	var isVictory = checkWin({ i, j }, currPlayer);
	if (isVictory) {
		document.querySelector('h2').style.display = 'block';
		document.querySelector('h2').innerHTML = 'VICTORY! ' + currPlayer + ' Won!';
		isGameOn = false;
		document.querySelector('.btn').style.display = 'block';
	}

	var isDraw = checkDraw();
	if (isDraw) {
		document.querySelector('h2').style.display = 'block';
		document.querySelector('h2').innerHTML = 'DRAW!';
		isGameOn = false;
		document.querySelector('.btn').style.display = 'block';
	}

	if (currPlayer === X) {
		currPlayer = O;
	} else {
		currPlayer = X;
	}
}

//CHECK WIN
function checkWin(pos, currPlayer) {
	var count = countInRow(currPlayer, pos.i);
	if (count === gBoard.length) return true;

	count = countInCol(currPlayer, pos.j);
	if (count === gBoard.length) return true;

	if (pos.i === pos.j) {
		count = countInPrimaryDiagnol(currPlayer);
		if (count === gBoard.length) return true;
	}

	if (pos.i + pos.j === gBoard.length - 1) {
		count = countInSecondaryDiagnol(currPlayer);
		if (count === gBoard.length) return true;
	}

	return false;
}

// CHECK DRAW
function checkDraw() {
	for (var i = 0; i < gBoard.length; i++) {
		for (var j = 0; j < gBoard[i].length; j++) {
			if (gBoard[i][j] === EMPTY) {
				return false;
			}
		}
	}
	return true;
}
