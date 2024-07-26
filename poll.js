const SHEET_ID = '1PE_3SrIZ2vtyAKcUMXIy-dlxyn5COE3-DeOJS7yjgrQ'; // Replace with your Google Sheet ID
const SHEET_NAME = 'poll'; // Replace with your sheet name if different
const API_KEY = 'AIzaSyC6FKUryMBC_5zYFtpmu_pdNF5lZs10bQU'; // Replace with your Google API key

// const SHEET_ID = 'YOUR_SHEET_ID'; // Replace with your Sheet ID
// const SHEET_NAME = 'Sheet1'; // Replace with your Sheet name
// const API_KEY = 'YOUR_API_KEY'; // Replace with your API key

async function fetchPollData() {
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched poll data:', data); // Debugging line
        return data.values;
    } catch (error) {
        console.error('Error fetching poll data:', error);
    }
}


function displayPoll(question, options, questionIndex) {
    const questionElement = document.getElementById('question');
    const formElement = document.getElementById('poll-form');

    questionElement.textContent = question;
    formElement.innerHTML = ''; // Clear previous options

    options.forEach((option, index) => {
        const label = document.createElement('label');
        const input = document.createElement('input');

        input.type = 'radio';
        input.name = 'poll-option';
        input.value = index;

        label.appendChild(input);
        label.appendChild(document.createTextNode(option));

        formElement.appendChild(label);
    });

    // Create and append submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit'; // Ensure the button type is submit
    submitButton.textContent = 'Vote';
    formElement.appendChild(submitButton);

    // Form submit event listener
    formElement.addEventListener('submit', async (event) => {
        event.preventDefault();
        const selectedOption = formElement.querySelector('input[name="poll-option"]:checked');
        if (selectedOption) {
            const selectedIndex = parseInt(selectedOption.value, 10);
            await updateResponse(questionIndex, selectedIndex);
        } else {
            document.getElementById('response-message').textContent = 'Please select an option!';
        }
    });
}

async function updateResponse(questionIndex, optionIndex) {
    try {
        // Fetch and update data in the Google Sheet
        const data = await fetchPollData();
        if (!data || data.length <= questionIndex + 1) {
            console.error('Invalid data or question index');
            return;
        }

        const row = data[questionIndex + 1];
        const optionCount = parseInt(row[2 + optionIndex], 10) || 0;
        const newVoteCount = optionCount + 1;

        const range = `${SHEET_NAME}!${String.fromCharCode(67 + optionIndex)}${questionIndex + 2}`;
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?valueInputOption=RAW&key=${API_KEY}`;

        const responseData = {
            range: range,
            majorDimension: 'ROWS',
            values: [[newVoteCount]]
        };

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(responseData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Show thank you message
        document.getElementById('thanks-container').style.display = 'block';
        document.getElementById('poll-form').style.display = 'none';

    } catch (error) {
        console.error('Error updating response:', error);
    }
}



async function init() {
    try {
        const pollData = await fetchPollData();
        if (pollData.length > 1) {
            const [question, ...options] = pollData[1];
            const questionIndex = 0; // Adjust based on your logic
            displayPoll(question, options.slice(0, options.length - 1), questionIndex);
        } else {
            document.getElementById('question').textContent = "No poll data available.";
        }
    } catch (error) {
        document.getElementById('question').textContent = "Error loading poll data.";
    }
}

init();
