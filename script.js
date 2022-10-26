const weapons = ["rock", "paper", "scissors"];

var playerScore = 0;
var computerScore = 0;
var playerSelection = "";
var computerSelection = "";
var roundsPlayed = 0;

function getComputerChoice() {

    randomIndex=Math.floor(Math.random() * weapons.length)
    return computerSelection = weapons[randomIndex]

}

function playRound(weapon) {

    /* count this round */
    roundsPlayed++;

    /* check progress of the game. If all five rounds have been played the game ends. */
    if(gameHasEnded() == true) {
        return;
    } 
            
    /* prepare for battle */
    prepareForBattle();

    /* get player's selection */
    playerSelection = weapon;

    /* get computer's selection */
    computerSelection = getComputerChoice();

    /* display weapon choices */
    displaySelections();

    /* show who wins this round */
    /* player wins with rock over scissors, scissors over paper or paper over rock */
    if (playerSelection === "rock" && computerSelection === "scissors" ||
        playerSelection === "paper" && computerSelection === "rock" ||
        playerSelection === "scissors" && computerSelection === "paper") {
    
        /* update player's score */
        playerScore++;
        /* display result */
        displayResult("player");
        /* update scores */
        updateScores();
       
    /* nobody wins if both players chose the same weapon */
    } else if (playerSelection === computerSelection) {
      
        /* display result */
        displayResult("draw");
        
    /* computer wins in all other cases */
    } else {
        
        /* update computer's score */
        computerScore++;
        /* display result */
        displayResult("computer");
        /* update scores */
        updateScores();
        
    }  

}

function prepareForBattle() {

    /* Remove weapons selection from previous round */
    document.querySelectorAll(".clicked").forEach((item) => 
        { item.classList.remove("clicked");
    });

}

function displaySelections() {

    /* display computer's selection for this round */
    document.querySelector("#computer-" + computerSelection).classList.add('clicked');
    /* display player's selection for this round */
    document.querySelector("#" + playerSelection).classList.add('clicked');

}

function displayResult(winner) {

    /* display the result */
    switch (winner) {
        case "player":
            document.querySelector(".result").innerText = "You win, " + playerSelection + " wins over " + computerSelection + "!";
            break;
        case "computer":
            document.querySelector(".result").innerText = "You loose, " + computerSelection + " wins over " + playerSelection + "!";
            break;
        case "draw":
            document.querySelector(".result").innerText = "It's a draw!";
            break;
        case "end":
            if(playerScore > computerScore) {
                document.querySelector(".result").innerText = "Congratulations! You won the battle from the computer!";
            } else if (computerScore > playerScore) {
                document.querySelector(".result").innerText = "Aaaahw... The computer has won.";
            } else {
                document.querySelector(".result").innerText = "The game has ended. It's a draw!";
            }
            break;
    }

}

function updateScores() {

        /* update scores */
        document.querySelector("#player-score").innerText = playerScore;
        document.querySelector("#computer-score").innerText = computerScore;

}

function gameHasEnded() {

    /* check if all five rounds have been played */
    if (roundsPlayed < 5) { 
        return false;
    } else {

        /* after five rounds the game has ended. */
        /* Show the winner of the game. */
        displayResult("end");
        
        if(document.querySelector(".restart") == null) {

            /* Create a button to restart (if it does not already exist) */
            const resetBtn = document.createElement('button');
            resetBtn.innerText = "restart";
            resetBtn.className = "restart";
            resetBtn.addEventListener('click',() => location.reload());
            document.querySelector(".result").appendChild(resetBtn);

        }

        return true;
    }

}