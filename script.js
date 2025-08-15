document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const wordInput = document.getElementById('word-input');
    const submitBtn = document.getElementById('submit-btn');
    const message = document.getElementById('message');
    const scoreDisplay = document.getElementById('score');

    // 4-letter words (first letter will be revealed)
    const words = ["LOVE", "FIRE", "BEAR", "CAKE", "DUCK", "GOLD", "HOPE"];
    let secretWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    let currentRow = 0;
    let score = 0;

    // Initialize the game board with first letter revealed
    function initBoard() {
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('div');
            row.className = 'word-row';
            for (let j = 0; j < 4; j++) {
                const cell = document.createElement('div');
                cell.className = 'letter-cell';
                // Reveal first letter in the first row
                if (i === 0 && j === 0) {
                    cell.textContent = secretWord[0];
                    cell.classList.add('revealed');
                }
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    }

    // Check the guessed word
    function checkWord(guess) {
        const row = board.children[currentRow];
        let correctPositions = 0;

        for (let i = 0; i < 4; i++) {
            const cell = row.children[i];
            const letter = guess[i];
            cell.textContent = letter;

            if (letter === secretWord[i]) {
                cell.classList.add('correct');
                correctPositions++;
            } else if (secretWord.includes(letter)) {
                cell.classList.add('present');
            } else {
                cell.classList.add('absent');
            }
        }

        if (correctPositions === 4) {
            message.textContent = "You win!";
            score += 10;
            scoreDisplay.textContent = score;
            submitBtn.disabled = true;
        } else {
            currentRow++;
            if (currentRow >= 6) {
                message.textContent = `Game Over! The word was: ${secretWord}`;
                submitBtn.disabled = true;
            }
        }
    }

    // Event listeners
    submitBtn.addEventListener('click', () => {
        const guess = wordInput.value.toUpperCase();
        if (guess.length !== 4) {
            message.textContent = "Please enter a 4-letter word!";
            return;
        }
        if (guess[0] !== secretWord[0]) {
            message.textContent = `First letter must be ${secretWord[0]}!`;
            return;
        }
        checkWord(guess);
        wordInput.value = '';
    });

    // Initialize the game
    initBoard();
});