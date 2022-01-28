'use strict';

function countInRow(currPlayer, rowIdx) {
	var count = 0;
	for (var i = 0; i < gBoard[rowIdx].length; i++) {
		if (gBoard[rowIdx][i] === currPlayer) count++;
	}
	return count;
}

function countInCol(currPlayer, colIdx) {
	var count = 0;
	for (var i = 0; i < gBoard.length; i++) {
		if (gBoard[i][colIdx] === currPlayer) count++;
	}
	return count;
}

function countInPrimaryDiagnol(currPlayer) {
	var count = 0;
	for (var i = 0; i < gBoard.length; i++) {
		if (gBoard[i][i] === currPlayer) count++;
	}
	return count;
}

function countInSecondaryDiagnol() {
	var count = 0;
	for (var i = 0; i < gBoard.length; i++) {
		if (gBoard[i][gBoard.length - 1 - i] === currPlayer) count++;
	}
	return count;
}
