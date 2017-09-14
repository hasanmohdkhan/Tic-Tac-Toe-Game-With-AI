var originalBoard;
const humanPlayer = '0';
const aiPlayer = 'X';
const winCombos = [
     [0,1,2],
     [3,4,5],
     [6,7,8],
     [0,4,8],
     [2,4,6],
     [0,3,6],
     [1,4,7],
     [2,5,8]


];

const cells = document.querySelectorAll('.cell');

startGame();
function  startGame() {
    // clearing endgame div
    document.querySelector(".endgame").style.display = "none";
    // giving original board a Array with keys
    originalBoard = Array.from(Array(9).keys());
    // console.log(originalBoard);
    // Clearing input in board and color of click box
    for(var i = 0 ; i < cells.length ; i++)
    {
       cells[i].innerText = '';
       cells[i].style.removeProperty('background-color');
       //Event listener
       cells[i].addEventListener('click',turnClick ,false);

    }

}

// this function get which box is clicked in board
function turnClick(square)
{
   // console.log(square.target.id);
    // this function get which box is clicked in board with human player var i.e 0
    turn(square.target.id, humanPlayer);
    
}

function turn(squareId ,player) {

    originalBoard[squareId] = player ;
    //setting click box to human player variable i.e 0 OR writing in HTML
    document.getElementById(squareId).innerText = player ;

}
