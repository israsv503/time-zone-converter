// A mapping of the HTML element IDs to the corresponding IANA time zone strings.
const TIME_ZONES = {
  "time-est": "America/New_York", // Eastern Time
  "time-cst": "America/Chicago", // Central Time
  "time-mst": "America/Denver", // Mountain Time
  "time-pst": "America/Los_Angeles", // Pacific Time
};

const localTimeDisplay = document.getElementById("local-time-display");

/**
 * Updates the time for a specific time zone element.
 * @param {string} elementId - The ID of the HTML element to update (e.g., 'time-est').
 * @param {string} timeZone - The IANA time zone string (e.g., 'America/New_York').
 */
function updateClock(elementId, timeZone) {
  const now = new Date();

  // Options for formatting the time (hour, minute, second, AM/PM)
  const options = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true, // Use AM/PM
    timeZone: timeZone,
  };

  // Use Intl.DateTimeFormat for accurate time zone conversion
  const formattedTime = new Intl.DateTimeFormat("en-US", options).format(now);

  // Find the paragraph with class 'time' inside the specific time-card div
  const timeElement = document.getElementById(elementId).querySelector(".time");
  if (timeElement) {
    timeElement.textContent = formattedTime;
  }
}

/**
 * Updates the user's local time and full date display.
 */
function updateLocalTime() {
  const now = new Date();

  // Format the date and time for the user's browser location
  const formattedLocalTime = now.toLocaleTimeString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  localTimeDisplay.textContent = `Your Local Time: ${formattedLocalTime}`;
}

// Function to run all updates (Local time and all 4 US zones)
function updateAllClocks() {
  updateLocalTime();

  // Loop through our defined TIME_ZONES object
  for (const [id, zone] of Object.entries(TIME_ZONES)) {
    updateClock(id, zone);
  }
}

// 1. Initial call: Run immediately so the clocks show time right away
updateAllClocks();

// 2. Interval: Update the clocks every 1000 milliseconds (1 second)
setInterval(updateAllClocks, 1000);


// --- Elements for the Converter Tool ---
const timeInput = document.getElementById('time-input');
const timezoneSelect = document.getElementById('timezone-select');
const convertButton = document.getElementById('convert-button');
const conversionResults = document.getElementById('conversion-results');

/**
 * Converts the user-specified time from their selected zone 
 * to the four major U.S. time zones and displays the results.
 */
function convertTime() {
    const inputTimeValue = timeInput.value; // e.g., "09:00"
    const inputZone = timezoneSelect.value; // e.g., "Europe/London"
    
    // 1. Create a base Date object for the specified input time
    // We get the current date and then set the hours/minutes based on the input.
    const [hours, minutes] = inputTimeValue.split(':');
    const inputDate = new Date(); 
    // Use the user's current date, but set the user's desired time (in their local context).
    inputDate.setHours(hours, minutes, 0, 0); 
    
    // NOTE on Intl.DateTimeFormat: 
    // When formatting, it assumes the 'inputDate' object is in the system's local time, 
    // and then performs the conversion based on the 'timeZone' option provided. 
    // This is the simplest way to convert between arbitrary zones in Vanilla JS.

    // 2. Clear previous results
    conversionResults.innerHTML = '';
    
    // 3. Loop through the target U.S. time zones
    for (const [id, zone] of Object.entries(TIME_ZONES)) {
        
        // Options for the output time display
        const targetOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true, // Use AM/PM
            timeZone: zone // Set the target US time zone
        };
        
        const targetTime = new Intl.DateTimeFormat('en-US', targetOptions).format(inputDate);
        
        // Get the full name from the HTML of the main clocks (e.g., "EST (Eastern)")
        const zoneName = document.getElementById(id).querySelector('h2').textContent;
        
        // 4. Create and append the result card dynamically
        const resultCard = document.createElement('div');
        resultCard.className = 'time-card'; // Reuse the styling class
        resultCard.innerHTML = `
            <h2>${zoneName}</h2>
            <p class="time" style="font-size: 2.2em;">${targetTime}</p>
        `;
        conversionResults.appendChild(resultCard);
    }
}

// Attach the conversion function to the button click event
convertButton.addEventListener('click', convertTime);

// Run a conversion on load so the results container is not empty when the user first sees it
convertTime();