// background.js

let extensionEnabled = true; // Set to true by default

// Load extension state from storage
chrome.storage.local.get('extensionEnabled', function(data) {
    extensionEnabled = data.extensionEnabled !== undefined ? data.extensionEnabled : true;
});

// Function to handle message from popup
function handleMessage(request, sender, sendResponse) {
    if (request.action === "toggleExtension") {
        extensionEnabled = request.enabled;
        // Save extension state to storage
        chrome.storage.local.set({ 'extensionEnabled': extensionEnabled });
        // Inform content script to update extension state
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { action: "updateExtensionState", enabled: extensionEnabled });
        });
    }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener(handleMessage);

// Function to handle tab update event
function handleTabUpdate(tabId, changeInfo, tab) {
    if (changeInfo.status === 'complete' && tab.url.startsWith('https://www.youtube.com/') && extensionEnabled) {
        chrome.tabs.executeScript(tabId, { file: 'content.js' });
    }
}

// Listen for tab update events
chrome.tabs.onUpdated.addListener(handleTabUpdate);
