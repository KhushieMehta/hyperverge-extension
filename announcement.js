const API_KEY = 'AIzaSyAM4H9PICKIOMr06R7mBR-rS-Mfh1Ey6UY';
const SHEET_ID = '1FqHi-nnMQ_IxperCNE9BURcTqQlJB1J7XWOHZXBZ4zA';
const RANGE = 'Sheet1!A:C'; // Adjust based on your sheet's structure

async function fetchAnnouncements() {
    const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`);
    const data = await response.json();
    return data.values;
}

function displayAnnouncements(announcements) {
    const container = document.getElementById('announcements');
    announcements.forEach(([date, title, content]) => {
        const announcementDiv = document.createElement('div');
        announcementDiv.className = 'announcement';
        announcementDiv.innerHTML = `
            <h2>${title}</h2>
            <p class="date"><strong>Date:</strong> ${date}</p>
            <p class="content">${content}</p>
        `;
        container.appendChild(announcementDiv);
    });
}

fetchAnnouncements().then(data => {
    displayAnnouncements(data.slice(1)); // Remove headers
});
