// Initial Mock Data (Fallback if localStorage is empty)
const defaultDeckData = {
    streams: [
        { platform: "Spotify", count: "142.5K" },
        { platform: "Apple Music", count: "89.1K" },
        { platform: "SoundCloud", count: "34.8K" }
    ],
    wips: [
        { title: "Nocturne in C# (Demo 3)", version: "v1.2" },
        { title: "Sub-Bass Heavy VIP Edit", version: "v2.0" },
        { title: "Acoustic Session Live Stem", version: "v0.9" }
    ],
    tours: [
        { date: "OCT 12", venue: "El Rey Theatre", city: "Los Angeles, CA" },
        { date: "OCT 24", venue: "Public Works", city: "San Francisco, CA" },
        { date: "NOV 05", venue: "Knockdown Center", city: "New York, NY" }
    ],
    collabs: [
        { name: "Producer X (Trap/Ambient)", status: "In Discussion" },
        { name: "Vocalist Y (Indie Pop)", status: "Locked" },
        { name: "Mix Engineer Z", status: "Contacted" }
    ]
};

// Load data from localStorage, or use default data if nothing is saved yet
let deckData = JSON.parse(localStorage.getItem('artistDeckData')) || defaultDeckData;

// Function to save current state to localStorage
function saveToLocalStorage() {
    localStorage.setItem('artistDeckData', JSON.stringify(deckData));
}

// Render Functions
function renderDeck() {
    // Render Streams
    const metricsGrid = document.getElementById('metricsGrid');
    metricsGrid.innerHTML = deckData.streams.map(item => `
        <div class="metric-card">
            <div class="metric-platform">${item.platform}</div>
            <div class="metric-value">${item.count}</div>
        </div>
    `).join('');

    // Render WIPs
    const wipList = document.getElementById('wipList');
    wipList.innerHTML = deckData.wips.map(item => `
        <div class="wip-item">
            <span class="wip-title">${item.title}</span>
            <span class="wip-version">${item.version}</span>
        </div>
    `).join('');

    // Render Tours
    const tourList = document.getElementById('tourList');
    tourList.innerHTML = deckData.tours.map(item => `
        <li class="tour-item">
            <span class="tour-date">${item.date}</span>
            <span>${item.venue} (${item.city})</span>
        </li>
    `).join('');

    // Render Collabs
    const collabBoard = document.getElementById('collabBoard');
    collabBoard.innerHTML = deckData.collabs.map(item => `
        <div class="collab-item">
            <span>${item.name}</span>
            <span class="wip-version" style="color: var(--accent-cyan); background: rgba(6,182,212,0.1);">${item.status}</span>
        </div>
    `).join('');
}

// Add New WIP Item Interactivity + Save State
document.getElementById('addWipBtn').addEventListener('click', () => {
    const input = document.getElementById('newWipTitle');
    if (input.value.trim() !== '') {
        // Push new item to array
        deckData.wips.push({
            title: input.value.trim(),
            version: "v1.0"
        });
        
        // Save to browser storage
        saveToLocalStorage();
        
        // Clear input and re-render
        input.value = '';
        renderDeck();
    }
});

// Initial Render on Page Load
document.addEventListener('DOMContentLoaded', renderDeck);