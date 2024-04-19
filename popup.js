// popup.js

// Function to update toggle switch state based on extension state
function updateToggleState() {
    chrome.storage.local.get('extensionEnabled', function(data) {
        const enabled = data.extensionEnabled !== undefined ? data.extensionEnabled : true;
        document.getElementById('toggleSwitch').checked = enabled;
    });
}

// Function to send message to background script to toggle extension state
function toggleExtensionState(enabled) {
    chrome.runtime.sendMessage({ action: "toggleExtension", enabled: enabled });
}

// Attach change event listener to the toggle switch
document.getElementById('toggleSwitch').addEventListener('change', function() {
    const enabled = this.checked;
    toggleExtensionState(enabled); // Send message to background script
});

// Call updateToggleState when the popup is opened to ensure the toggle reflects the current state
updateToggleState();
