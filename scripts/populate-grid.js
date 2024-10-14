// Function to load and populate prompts
function populateGrid() {
    fetch('prompts.json')
        .then(response => response.json())
        .then(data => {
            const workPrompts = data.work_prompts;
            const lovePrompts = data.love_prompts;
            let repeatablePrompts = [...data.repeatable_prompts]; // Create a copy to avoid modifying the original array

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

// Run the populateGrid function on page load
document.addEventListener('DOMContentLoaded', populateGrid);
