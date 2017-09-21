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
    if(typeof originalBoard[square.target.id] == 'number'){
        turn(square.target.id, humanPlayer);
        //checking if game is tie or not if not then turn for AI player
        if(!checkTie()) turn(bestSpot(), aiPlayer);

    }

    
}

function turn(squareId ,player) {

    originalBoard[squareId] = player ;
    //setting click box to human player variable i.e 0 OR writing in HTML
    document.getElementById(squareId).innerText = player ;
    let gameWon = checkWin(originalBoard ,player);
    if(gameWon) gameOver(gameWon)
}
function checkWin(board , player) {
    let plays = board.reduce((a,e,i) =>
    (e === player) ? a.concat(i) : a, [];
)
    let gameWon = null;
     for(let [index , win] of winCombos.entries()){
         if(win.every(elem => plays.indexOf(elem ) > -1)) {
             gameWon = {index: index , player : player};
             break;
         }
     }
     return gameWon;
};
function gameOver(gameWon) {
    for (let index of winCombos[gameWon.index]) {
        document.getElementById(index).style.backgroundColor =
            gameWon.player == humanPlayer ? "blue" : "red";
    }
    for (var i = 0; i < cells.length; i++) {
        cells[i].removeEventListener('click', turnClick, false);
    }
    declareWinner(gameWon.player == humanPlayer ? "You Win" : "You lose.");

} 

function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
}




function emptySquares() {

    return originalBoard.filter(s = > typeof s == 'number';
)
};
function bestSpot() {
   // return emptySquares()[0];
   return minimax(originalBoard ,aiPlayer).index;
}

function checkTie() {
    if(emptySquares().length == 0){
    for( var i=0 ;i< cells.length ; i++){
    cells[i].style.backgroundColor = 'green';
    cells[i].removeEventListener('click', turnClick ,false);

    }
 declareWinner("Tie Game!");
   return true;

    }
 return false;
}

function minimax(newBoard , player)
{
    var availSpot = emptySquares(newBoard);
   // if human player win score: -10
   // else AI player win score : 10;
   // else if Tie than score : 0;
    if(checkWin(newBoard , player))
    {return {score: -10}; }
    else if(checkWin(newBoard , aiPlayer)){
        return{score: 10};
    }
    else if (availSpot.length === 0){
        return {score:0};
    }
 var moves = [];
 for(var i = 0 ; i < availSpot.length ; i++ ){
     var move = {};
     move.index = newBoard[availSpot[i]];
     newBoard[availSpot[i]] = player;

     if(player == aiPlayer){
         var result = minimax(newBoard ,humanPlayer);
         move.score = result.score;
     }
     else {
         var result = minimax(newBoard ,aiPlayer);
         move.score = result.score;

     }

    newBoard[availSpot[i]] = move.index;
     moves.push(move);


 }
 var bestMove;
 if (player === aiPlayer) {
     var bestScore = -10000;
     for (var i = 0; i < moves.length; i++) {
         if (moves[i].score > bestScore) {
             bestScore = moves[i].score;
             bestMove = i;
         }

     }
 }

   else{

         var bestScore = 10000;
         for(var i =0 ; i < moves.length; i++){
             if(moves[i].score < bestScore){
                 bestScore = moves[i].score;
                 bestMove = i;
             }

         }

     }


     return moves[bestMove];

 }


