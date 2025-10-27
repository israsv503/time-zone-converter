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
