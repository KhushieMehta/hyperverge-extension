document.addEventListener("DOMContentLoaded", function() {
    const containerBox = document.querySelector('.main-container');
    const changeBackgroundBtn = document.getElementById('changeBgButton');

    let currentBg = 1;

    changeBackgroundBtn.addEventListener('click', () => {
        currentBg++;
        if (currentBg > 2) { // Update this number based on the number of backgrounds
            currentBg = 1;
        }

        // Remove all previous background classes
        containerBox.classList.remove('bg1', 'bg2'); // Add more if you have more backgrounds
        // Add the new background class
        containerBox.classList.add(`bg${currentBg}`);
    });
});
