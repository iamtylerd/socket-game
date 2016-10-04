'use strict';

const socket = io()

socket.on('connect', () => console.log(`Socket connected: ${socket.id}`))
socket.on('disconnect', () => console.log("Disconnected"))

// Save board state
const boardState = [
['','',''],
['','',''],
['','','']
]

const drawBoard = (boardState) => {
	document.querySelector('.board').innerHTML = `
    <table>
      <tr>
        <td>${boardState[0][0]}</td>
        <td>${boardState[0][1]}</td>
        <td>${boardState[0][2]}</td>
      </tr>
      <tr>
        <td>${boardState[1][0]}</td>
        <td>${boardState[1][1]}</td>
        <td>${boardState[1][2]}</td>
      </tr>
      <tr>
        <td>${boardState[2][0]}</td>
        <td>${boardState[2][1]}</td>
        <td>${boardState[2][2]}</td>
      </tr>
    </table>
  `
}

const winner = b => {
  // Rows
  if (b[0][0] && b[0][0] === b[0][1] && b[0][1] === b[0][2]) {
    return b[0][0]
  } else if (b[1][0] && b[1][0] === b[1][1] && b[1][1] === b[1][2]) {
    return b[1][0]
  } else if (b[2][0] && b[2][0] === b[2][1] && b[2][1] === b[2][2]) {
    return b[2][0]
  }

  // Cols
  else if (b[0][0] && b[0][0] === b[1][0] && b[1][0] === b[2][0]) {
    return b[0][0]
  } else if (b[0][1] && b[0][1] === b[1][1] && b[1][1] === b[2][1]) {
    return b[0][1]
  } else if (b[0][2] && b[0][2] === b[1][2] && b[1][2] === b[2][2]) {
    return b[0][2]
  }

  // Diags
  else if (b[0][0] && b[0][0] === b[1][1] && b[1][1] === b[2][2]) {
    return b[0][0]
  } else if (b[0][2] && b[0][2] === b[1][1] && b[1][1] === b[2][0]) {
    return b[0][2]
  }

  // Tie or In-Progress
  else {
    return null
  }
}

drawBoard(boardState)
let nextPlayer = 'X'

const board = document.querySelector('.board')
board.addEventListener('click', evt => {
	const col = evt.target.cellIndex
	const row = evt.target.parentElement.rowIndex

	if (boardState[row][col]) {
		return console.log('You cant move here')
	}
		boardState[row][col] = nextPlayer
		nextPlayer = nextPlayer === 'X' ? 'O' : 'X'
		drawBoard(boardState)

	console.log("You clicked on:", row, col)
})

