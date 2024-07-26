// issueTracker.js

document.getElementById('issueForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => { data[key] = value; });

    fetch('https://script.google.com/macros/s/AKfycbzdnOYVXp75gIojwkc01FrKTiHCbSWY4xBtYigOACKpeIQH0p_F-O4mz8wWKSdupcAB/exec', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(response => response.text())
    .then(result => {
        document.getElementById('responseMessage').innerText = 'Issue submitted successfully!';
        this.reset();
    })
    .catch(error => {
        document.getElementById('responseMessage').innerText = 'There was an error submitting your issue.';
        console.error('Error:', error);
    });
});
//https://script.google.com/macros/s/AKfycbzdnOYVXp75gIojwkc01FrKTiHCbSWY4xBtYigOACKpeIQH0p_F-O4mz8wWKSdupcAB/exec