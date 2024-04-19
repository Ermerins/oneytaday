// content.js

let extensionEnabled = true; // Set to true by default

// Function to select a random video from the recommended list
function selectRandomVideo() {
    // Check if extension is enabled
    if (!extensionEnabled) return;

    // Check if URL contains "/watch?v=" to prevent endless redirect loop
    if (window.location.href.includes("/watch?v=")) return;

    const videoThumbnails = document.querySelectorAll('#video-title-link');

    // If no thumbnails found, exit
    if (!videoThumbnails.length) {
        console.error('No video thumbnails found on the page.');
        return;
    }

    // Choose a random thumbnail index
    const randomIndex = Math.floor(Math.random() * videoThumbnails.length);

    // Get the selected video link
    const selectedVideoLink = videoThumbnails[randomIndex].href;

    // Redirect to the selected video
    window.location.href = selectedVideoLink;
}

// Function to retrieve extension enabled state from storage
chrome.storage.local.get('extensionEnabled', function(data) {
    extensionEnabled = data.extensionEnabled !== undefined ? data.extensionEnabled : true;
});

// Call the function to select a random video after a delay of 2 seconds
setTimeout(selectRandomVideo, 3000);

// Listen for messages from background script to update extension state
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "updateExtensionState") {
        extensionEnabled = request.enabled;
    }
});
