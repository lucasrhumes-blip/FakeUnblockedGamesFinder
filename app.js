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
    var oldScreen = document.getElementById(currentScreen);
    var newScreen = document.getElementById(newScreenId);
    
    if (oldScreen && newScreen) {
        oldScreen.classList.add("hidden");
        newScreen.classList.remove("hidden");
        currentScreen = newScreenId;
    }
}

// ---------------------------------------------------------
// BACKGROUND SLIDER SYSTEM
// ---------------------------------------------------------
setInterval(function() {
    var sliderR = document.getElementById("sliderR");
    var sliderG = document.getElementById("sliderG");
    var bSlider = document.getElementById("sliderB");
    
    if (sliderR && sliderG && bSlider) {
        var r = sliderR.value;
        var g = sliderG.value;
        var b = bSlider.value;
        document.body.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
    }
}, 20);

// ---------------------------------------------------------
// SCREEN NAVIGATION HANDLERS
// ---------------------------------------------------------
var settingsBtn = document.getElementById("settingsBtn");
if (settingsBtn) {
    settingsBtn.addEventListener("click", function() {
        setScreen("screen2");
    });
}

var homeBtn = document.getElementById("home");
if (homeBtn) {
    homeBtn.addEventListener("click", function() {
        setScreen("loginScreen");
    });
}

var home2Btn = document.getElementById("home2");
if (home2Btn) {
    home2Btn.addEventListener("click", function() {
        setScreen("screen1");
    });
}

var flappyBtn = document.getElementById("flappy");
if (flappyBtn) {
    flappyBtn.addEventListener("click", function() {
        window.open("https://code.org", "_blank");
    });
}

// ---------------------------------------------------------
// START APP BUTTON TIMER ANIMATION
// ---------------------------------------------------------
var startBtn = document.getElementById("Start");
if (startBtn) {
    startBtn.addEventListener("click", function() {
        var label1 = document.getElementById("label1");
        
        if (label1) label1.innerText = "Initializing...";
        startBtn.innerText = "Starting in 5s";
        
        setTimeout(function() { startBtn.innerText = "4s"; }, 1000);
        setTimeout(function() { startBtn.innerText = "3s"; }, 2000);
        setTimeout(function() { 
            if (label1) label1.innerText = "Website Found"; 
            startBtn.innerText = "2s"; 
        }, 3000);
        setTimeout(function() { 
            if (label1) label1.innerText = "Make Sure to Allow Popups & Redirects"; 
            startBtn.innerText = "1s"; 
        }, 4000);
        setTimeout(function() { startBtn.innerText = "0s"; }, 5000);
        setTimeout(function() {
            document.body.style.backgroundColor = "rgb(0,0,0)";
            window.open("https://code.org", "_blank");
        }, 6000);
    });
}

// ---------------------------------------------------------
// VALIDATION AND DATA ENTRY SUBMISSION (ENTER BUTTON)
// ---------------------------------------------------------
var exitLoginBtn = document.getElementById("Exitlogin");
if (exitLoginBtn) {
    exitLoginBtn.addEventListener("click", function() {
        var label10 = document.getElementById("label10");
        var label11 = document.getElementById("label11");
        var label9 = document.getElementById("label9");
        
        // Reset warning highlights safely
        if (label10) label10.classList.add("hidden");
        if (label11) label11.classList.add("hidden");
        if (label9) label9.classList.add("hidden");

        var nameInput = document.getElementById("nameInput");
        var emailInput = document.getElementById("emailInput");
        var checkbox3 = document.getElementById("checkbox3");
        
        if (!nameInput || !emailInput || !checkbox3) return;

        var nameVal = nameInput.value;
        var emailVal = emailInput.value;
        var isChecked = checkbox3.checked;

        if (isChecked && nameVal !== "" && emailVal !== "" && emailVal.includes("@")) {
            var timestamp = new Date().toLocaleTimeString();
            var logEntry = "[" + timestamp + "] Name: " + nameVal + " | Email: " + emailVal;
            userLogs.push(logEntry);

            // --- CORRECTED WEB3FORMS ENDPOINT ---
            var formToken = "b7b976f8-6492-4989-b4ac-76dbd74431ff"; 

            fetch("https://web3forms.com", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    access_key: formToken,
                    subject: "New Website Portal Login",
                    User_Name: nameVal,
                    User_Email: emailVal,
                    Login_Time: timestamp
                })
            })
            .then(function() { 
                console.log("Data logged securely to your Web3Forms dashboard."); 
            })
            .catch(function(err) { 
                console.error("Submission failed: ", err); 
            });
            // ---------------------------------------------------

            setScreen("screen1");
        } else {
            if (nameVal === "" && label10) label10.classList.remove("hidden");
            if ((emailVal === "" || !emailVal.includes("@")) && label11) label11.classList.remove("hidden");
            if (!isChecked && label9) label9.classList.remove("hidden");
        }
    });
}

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
        var devLogText = document.getElementById("devLogText");
        if (devLogText) {
            devLogText.value = displayText;
        }
        setScreen("devScreen");
    }
});

var devBackBtn = document.getElementById("devBack");
if (devBackBtn) {
    devBackBtn.addEventListener("click", function() {
        setScreen("screen1");
    });
}
