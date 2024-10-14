// Select buttons
const clearBoardButton = document.getElementById('clearBoardButton');
const newPromptsButton = document.getElementById('newPromptsButton');

// Clear Board button functionality
clearBoardButton.addEventListener('click', () => {
    clearBoard();
});

// New Prompts button functionality
newPromptsButton.addEventListener('click', () => {
    refreshBoardWithNewPrompts();
});

// Function to clear the board
function clearBoard() {
    document.querySelectorAll('.grid-item').forEach((item, index) => {
        if (!item.classList.contains('free-space')) {
            item.classList.remove('active');
        }
    });
    activeCells = new Set([freeSpaceIndex]); // Only keep the free space as active
    bingoAchieved = false; // Reset bingo state
}

// Function to refresh the board with new prompts
function refreshBoardWithNewPrompts() {
    activeCells = new Set([freeSpaceIndex]); // Reset active cells
    bingoAchieved = false; // Reset bingo state
    populateGrid(); // Re-run the populateGrid function to load new prompts
}

// Function to load and populate prompts
function populateGrid() {
    fetch('prompts.json')
        .then(response => response.json())
        .then(data => {
            const workPrompts = data.work_prompts;
            const lovePrompts = data.love_prompts;
            let repeatablePrompts = [...data.repeatable_prompts]; // Copy of repeatable prompts to shuffle

            // Select one unique prompt from each unique category
            const selectedWorkPrompt = workPrompts[Math.floor(Math.random() * workPrompts.length)];
            const selectedLovePrompt = lovePrompts[Math.floor(Math.random() * lovePrompts.length)];

            // Select all grid items except the free space (e.g., grid-item-13)
            const gridItems = Array.from(document.querySelectorAll('.grid-item:not(.free-space)'));

            // Randomly assign the work prompt to one grid item
            const workIndex = Math.floor(Math.random() * gridItems.length);
            gridItems[workIndex].innerText = selectedWorkPrompt;
            gridItems.splice(workIndex, 1); // Remove the assigned item to avoid duplication

            // Randomly assign the love prompt to another grid item
            const loveIndex = Math.floor(Math.random() * gridItems.length);
            gridItems[loveIndex].innerText = selectedLovePrompt;
            gridItems.splice(loveIndex, 1); // Remove the assigned item to avoid duplication

            // Shuffle the repeatable prompts array to ensure randomness
            repeatablePrompts = shuffleArray(repeatablePrompts);

            // Populate the remaining grid items with unique repeatable prompts
            gridItems.forEach((item, index) => {
                item.innerText = repeatablePrompts[index];
                item.classList.remove('active'); // Clear previous state
            });
        })
        .catch(error => console.error('Error loading prompts:', error));
}

// Utility function to shuffle an array
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
}

// Call populateGrid() on page load
document.addEventListener('DOMContentLoaded', populateGrid);
