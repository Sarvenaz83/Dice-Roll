//element selection
const dice1 = document.querySelector('.dice-1');
const dice2 = document.querySelector('.dice-2');
const psum = document.querySelector('.dice-sum');
const btnStart = document.querySelector('.btn-start');
const btnRestart = document.querySelector('.btn-restart');
const resultValue = document.querySelector('.result');
const knockoutNumber = document.querySelector('.knockout-number');

//variable to store the total sum of all rolls
let totalSum = 0;

//lägg till händelselyssnare för knappen för att starta om spelat
btnRestart.addEventListener('click', ()=> {
    totalSum = 0; //Reset the total sum to zero
    updateResult(); //Update the result display
});

// Function to update the result display
function updateResult() {
    resultValue.innerText = totalSum;
}

// Function to generate a random dice roll
function GetRandomDice() {
    return Math.ceil(Math.random() * 6); //1-6
}

// Function to reset game state
function resetGame() {
    totalSum = 0; // Reset the total sum
    dice1.src = 'img/dice-1.png'; // Reset dice images
    dice2.src = 'img/dice-1.png';
    psum.innerText = 'Sum: 0'; // Reset sum display
    resultValue.innerText = totalSum; // Reset result display
    document.getElementById("knockout").selectedIndex = -1; // Reset knockout number selection
    btnStart.disabled = false; // Enable the start button
}


btnStart.addEventListener('click', ()=>{
    // Check if the knockout number is set
    if (!knockoutNumber.value) {
        alert('Please set a knockout number before starting the game.');
        return;
    }
    btnStart.disabled = true;
    // add animation
    if(!dice1.classList.contains('animation'))
        dice1.classList.add('animation');
    if(!dice2.classList.contains('animation'))
        dice2.classList.add('animation');

        //delay
        setTimeout(()=>
        {
            let d1 = GetRandomDice();
            let d2 = GetRandomDice();

            //update gui
            dice1.src = `img/dice-${d1}.png`; // img/dice-4.png
            dice2.src = `img/dice-${d2}.png`;

            let sum = d1 + d2;
            totalSum += sum;
            psum.innerText = 'Sum: ' + sum;
            updateResult();

            //Check if the game shoul end
            if (sum === parseInt(knockoutNumber.value)){
                //Game over
                alert('Game over! You reached or exceeded the knockout number.')
                resetGame();
            }
            //remove the animation
            if (dice1.classList.contains('animation'))
                dice1.classList.remove('animation');
            if (dice2.classList.contains('animation'))
                dice2.classList.remove('animation');

            btnStart.disabled = false;
        }, 2000);
});
