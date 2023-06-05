const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const setBoard = (index, value) => board[index] = value;
    const resetBoard = () => board = ["", "", "", "", "", "", "", "", ""];
    return { getBoard, setBoard, resetBoard };
})();

const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;
    return { getName, getMarker };
}

const GameController = (() => {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;
    let gameOver = false;
    let winner = null;
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontal
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // vertical
        [0, 4, 8], [2, 4, 6]             // diagonal
    ];

    const getCurrentPlayer = () => currentPlayer;
    const getGameOver = () => gameOver;
    const getWinner = () => winner;
    const getWinningCombos = () => winningCombos;

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    }

    const checkWinner = () => {
        winningCombos.forEach(combo => {
            if (Gameboard.getBoard()[combo[0]] === currentPlayer.getMarker() &&
                Gameboard.getBoard()[combo[1]] === currentPlayer.getMarker() &&
                Gameboard.getBoard()[combo[2]] === currentPlayer.getMarker()) {
                winner = currentPlayer;
                gameOver = true;
            }
        });
    }

    const checkTie = () => {
        if (Gameboard.getBoard().every(cell => cell !== "")) {
            gameOver = true;
        }
    }

    const resetGame = () => {
        Gameboard.resetBoard();
        gameOver = false;
        winner = null;
        currentPlayer = player1;
    }

    return { getCurrentPlayer, getGameOver, getWinner, getWinningCombos, switchPlayer, checkWinner, checkTie, resetGame };
})();
