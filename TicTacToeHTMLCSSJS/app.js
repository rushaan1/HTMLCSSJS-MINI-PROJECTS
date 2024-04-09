let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msg = document.querySelector("#msg");
let msgContainer = document.querySelector(".msg-container");

let turnO = true;
let clickCount = 0;

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
];

boxes.forEach((box)=>
{
    box.addEventListener("click", ()=>
    {
        if (turnO)
        {
            box.innerText = "O";
            turnO = false;
        }
        else
        {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        clickCount++;
        checkWinner();
    })
});

const disableBoxes = () => 
{
    for (let box of boxes)
    {
        box.disabled = true;
    }
}

const enableBoxes = () => 
{
    for (let box of boxes)
    {
        box.disabled = false;
        box.innerText = "";
    }
    clickCount = 0;
}

const resetGame = () => 
{
    turnO = true;
    enableBoxes();
    msg.style.paddingLeft = "0px";
    msgContainer.classList.add("hide");
}

const showWinner = (winner, isDraw) => 
{
    msg.innerText = `Winner: ${winner}`;
    if (isDraw)
    {
        msg.innerText = `Game Draw!`;
        msg.style.paddingLeft = "8px";
    }
    msgContainer.classList.remove("hide");
    disableBoxes();
}

const checkWinner = () => 
{
    let gameWon = false;
    for (let pattern of winPatterns)
    {
        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;

        if (val1 != "" && val2 != "" && val3 != "")
        {
            if (val1 == val2 && val2 == val3)
            {
                console.log("we have a winner!");
                showWinner(val1, false);
                gameWon = true;
            }
        }
        if (gameWon==false)
        {
            if (clickCount == 9)
                {
                    showWinner(val1, true);
                }
        }
    }
}

resetBtn.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",resetGame);