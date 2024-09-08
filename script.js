document.addEventListener('DOMContentLoaded', () => {
    const holes = document.querySelectorAll('.hole');
    const scoreElement = document.getElementById('score');
    const startButton = document.getElementById('start');
    let score = 0;
    let gameInterval;
    let gameRunning = false;

    // Function to select a random hole
    function randomHole() {
        const index = Math.floor(Math.random() * holes.length);
        return holes[index];
    }

    // Function to show a mole in a random hole
    function showMole() {
        // Remove any existing mole
        holes.forEach(hole => {
            const mole = hole.querySelector('.mole');
            if (mole) {
                mole.classList.remove('show');
                mole.remove();
            }
        });

        // Add a new mole to a random hole
        const hole = randomHole();
        const mole = document.createElement('div');
        mole.classList.add('mole');
        hole.appendChild(mole);

        // Show the mole after a short delay
        setTimeout(() => {
            mole.classList.add('show');
        }, 100);
    }

    // Function to hide the mole
    function hideMole() {
        holes.forEach(hole => {
            const mole = hole.querySelector('.mole');
            if (mole) {
                mole.classList.remove('show');
                mole.remove();
            }
        });
    }

    // Function to start the game
    function startGame() {
        if (gameRunning) return;
        score = 0;
        scoreElement.textContent = score;
        gameRunning = true;
        gameInterval = setInterval(() => {
            hideMole();
            showMole();
        }, 1000); // Mole appears every 1 second
    }

    // Function to end the game
    function endGame() {
        clearInterval(gameInterval);
        hideMole();
        gameRunning = false;
    }

    // Function to handle click events
    function handleClick(event) {
        if (event.target.classList.contains('mole') && event.target.classList.contains('show')) {
            score++;
            scoreElement.textContent = score;
            hideMole();
        }
    }

    // Event listener for the start button
    startButton.addEventListener('click', startGame);

    // Add click event listeners to each hole
    holes.forEach(hole => {
        hole.addEventListener('click', handleClick);
    });
});
