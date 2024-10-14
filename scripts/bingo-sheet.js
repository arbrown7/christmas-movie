// Select all grid items except the free space
const gridItems = document.querySelectorAll('.grid-item');
const freeSpaceIndex = 12; // Middle cell in a 5x5 grid is the free space
let activeCells = new Set(); // Keep track of marked cells
let bingoAchieved = false; // Flag to track if bingo has already been achieved

// Initialize free space as active by default
activeCells.add(freeSpaceIndex);

// Add event listeners to all grid items except the free space
gridItems.forEach((item, index) => {
    if (!item.classList.contains('free-space')) {
        item.addEventListener('click', () => {
            toggleActiveState(item, index);
        });
    }
});

// Function to toggle cell active state and check for Bingo
function toggleActiveState(item, index) {
    item.classList.toggle('active');
    if (item.classList.contains('active')) {
        activeCells.add(index);
    } else {
        activeCells.delete(index);
    }
    checkForBingo();
}

// Function to check if there is a Bingo
function checkForBingo() {
    if (bingoAchieved) return; // Exit the function if bingo has already been achieved

    const bingoLines = [
        // Horizontal lines
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        
        // Vertical lines
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        
        // Diagonal lines
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20]
    ];

    // Check each line to see if all indexes in that line are active
    for (let line of bingoLines) {
        if (line.every(index => activeCells.has(index))) {
            displayBingoNotification();
            bingoAchieved = true; // Set the flag to prevent further notifications
            break;
        }
    }
}

function displayBingoNotification() {
    const bingoAlert = document.getElementById('bingoAlert');
    bingoAlert.classList.add('show');
}

// Function to close the bingo alert
function closeBingoAlert() {
    const bingoAlert = document.getElementById('bingoAlert');
    bingoAlert.classList.remove('show');
}

