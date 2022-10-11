

//Game constants and Variables

let inputDri = { x: 0, y: 0 };
let foodSound = new Audio('sound2.mp3');
let gameOverSound = new Audio('sound1.mp3');
let moveSound = new Audio('moveSound.mp3');
let musicSound = new Audio('sound3.mp3');
let speed = 3;
let score = 0;
let lastpaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 };


//game functions

function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if ((ctime - lastpaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastpaintTime = ctime;
    gameEngine();
}

function iscollide(snake) {
    // if you bump into yourself
    for (let i = 1; i < snakeArr.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }

    // if you bump into wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }

    return false;

}

function gameEngine() {
    //part 1 : updating the snake array

    if (iscollide(snakeArr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDri = { x: 0, y: 0 };
        alert("Game over. Press any key to play again");
        snakeArr = [{ x: 13, y: 15 }];
        // musicSound.play();
        score = 0;
    }

    //if you have eaten the food increment the score and regenrate the food
    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        foodSound.play();
        score += 1;
        if(score > hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "Hi Score : " + hiscoreval;   
        }

        scoreBox.innerHTML = "score : " + score;
        snakeArr.unshift({ x: snakeArr[0].x + inputDri.x, y: snakeArr[0].y + inputDri.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    //moving the snake

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }

    snakeArr[0].x += inputDri.x;
    snakeArr[0].y += inputDri.y;

    // part 2 : display the snake and food

    //display the snake

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x

        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}



// main logic start here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hi Score : " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    inputDri = { x: 0, y: 1 } // start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDri.x = 0;
            inputDri.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDri.x = 0;
            inputDri.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDri.x = -1;
            inputDri.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDri.x = 1;
            inputDri.y = 0;
            break;

        default:
            break;
    }

});


function clicked(dir){
    switch (dir) {
        case "up":
            console.log("ArrowUp");
            inputDri.x = 0;
            inputDri.y = -1;
            break;

        case "down":
            console.log("ArrowDown");
            inputDri.x = 0;
            inputDri.y = 1;
            break;

        case "left":
            console.log("ArrowLeft");
            inputDri.x = -1;
            inputDri.y = 0;
            break;

        case "right":
            console.log("ArrowRight");
            inputDri.x = 1;
            inputDri.y = 0;
            break;

        default:
            break;
    }
}