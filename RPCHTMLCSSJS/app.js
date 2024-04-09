let userScore = 0;
let compScore = 0;

let choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
let userScoreP = document.querySelector("#user-score");
let compScoreP = document.querySelector("#comp-score");

const generateComputerChoice = () =>
{
    let randomNumber = Math.floor(Math.random()*choices.length);
    return choices[randomNumber].id;
}

const showWinner = (userWin, user, comp) =>
{
    if (userWin)
    {
        msg.innerText = `You won! ${user} beats ${comp}`;
        msg.style.backgroundColor = "green";
        userScore++;
    }
    else
    {
        msg.innerText = `You lose! ${comp} beats ${user}`;
        msg.style.backgroundColor = "red";
        compScore++;
    }
    userScoreP.innerText = userScore;
    compScoreP.innerText = compScore;
}

const drawGame = () => 
{
    msg.innerText = `Game Draw!`;
    msg.style.backgroundColor = "yellow";
}

const playGame = (userChoice) => 
{
    const compChoice = generateComputerChoice();
    if (compChoice == userChoice)
    {
        drawGame();
    }
    else
    {
        let userWin = true;

        if (userChoice=="rock")
        {
            userWin = compChoice == "paper" ? false : true;
        }
        else if (userChoice=="paper")
        {
            userWin = compChoice == "scissors" ? false : true;
        }
        else
        {
            userWin = compChoice == "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
}

choices.forEach((choice)=>
{
    choice.addEventListener("click", ()=>
    {
        let userChoice = choice.id;
        playGame(userChoice);
    });
});