document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const wordInput = document.getElementById('word-input');
    const submitBtn = document.getElementById('submit-btn');
    const message = document.getElementById('message');
    const scoreDisplay = document.getElementById('score');

    let secretWord = generateRandomWord().toUpperCase();
    let currentRow = 0;
    let score = 0;

    // Initialize the game board
    function initBoard() {
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('div');
            row.className = 'word-row';
            for (let j = 0; j < 5; j++) {
                const cell = document.createElement('div');
                cell.className = 'letter-cell';
                row.appendChild(cell);
            }
            board.appendChild(row);
        }
    }

    // Generate a random 5-letter word (for demo, use a predefined list)
    function generateRandomWord() {
        const words = ["APPLE", "CRANE", "GLOBE", "MONEY", "HAPPY", "LINGO"];
        return words[Math.floor(Math.random() * words.length)];
    }

    // Check the guessed word
    function checkWord(guess) {
        const row = board.children[currentRow];
        let correctPositions = 0;

        for (let i = 0; i < 5; i++) {
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

        if (correctPositions === 5) {
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
        if (guess.length !== 5) {
            message.textContent = "Please enter a 5-letter word!";
            return;
        }
        checkWord(guess);
        wordInput.value = '';
    });

    // Initialize the game
    initBoard();
});