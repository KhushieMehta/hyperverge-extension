document.getElementById('fetch-quote-button').addEventListener('click', fetchQuote);
document.getElementById('back-button').addEventListener('click', flipBook);
document.addEventListener('wheel', handlePageTurn);
document.addEventListener('touchstart', handleTouchStart);
document.addEventListener('touchend', handleTouchEnd);

let isFlipped = false;
let startY = 0;

async function fetchQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random'); // Free quote API
        const data = await response.json();
        const quote = data.content; // Adjust according to API response structure

        // Update the quote text
        document.getElementById('quote').textContent = quote;

        // Show the quote container if it's hidden
        document.getElementById('quote-container').classList.remove('hidden');
    } catch (error) {
        console.error('Error fetching quote:', error);
    }
}

function flipBook() {
    const book = document.querySelector('.book');
    if (isFlipped) {
        book.style.transform = 'rotateY(0deg)';
    } else {
        book.style.transform = 'rotateY(180deg)';
        setTimeout(fetchQuote, 500); // Fetch a new quote after flipping
    }
    isFlipped = !isFlipped;
}

function handlePageTurn(event) {
    if (event.deltaY > 0) {
        if (!isFlipped) flipBook();
    } else {
        if (isFlipped) flipBook();
    }
    event.preventDefault();
}

function handleTouchStart(event) {
    startY = event.touches[0].clientY;
}

function handleTouchEnd(event) {
    const endY = event.changedTouches[0].clientY;
    if (startY > endY + 50) {
        if (!isFlipped) flipBook();
    } else if (startY < endY - 50) {
        if (isFlipped) flipBook();
    }
}
