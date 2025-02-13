const btn = document.querySelector("#assis");

const speakFunc = (input) => {
    const speakInput = new SpeechSynthesisUtterance(input);
    speakInput.lang = 'en-IN'; // Set to Indian English
    window.speechSynthesis.speak(speakInput);
};

const startVoiceInput = () => {
    if ('webkitSpeechRecognition' in window) {
        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US'; // Set to US English

        recognition.onresult = (event) => {
            const speaktext = event.results[0][0].transcript;
            handleCommands(speaktext.toLowerCase());
        };

        recognition.onerror = (error) => {
            console.error("Speech recognition error:", error);
            alert("Error in voice recognition. Please try again.");
        };

        recognition.start();
    } else {
        alert("Voice recognition is not supported in your browser. Please use Google Chrome.");
    }
};

const handleCommands = (command) => {
    if (command.includes("hello") || command.includes("hi")) {
        speakFunc("Hello, how can I help you?");
    } else if (command.includes("who developed you") || command.includes("who created you")) {
        speakFunc("I am Albert, created by Sakshi and Shudhanshu.");
    } else if (command.includes("how are you")) {
        speakFunc("I'm fine, thank you for asking. How can I assist you?");
    } else if (command.includes("open google")) {
        speakFunc("Opening Google...");
        window.open("https://www.google.com");
    } else if (command.includes("open youtube")) {
        speakFunc("Opening YouTube...");
        window.open("https://www.youtube.com");
    } else if (command.includes("open facebook")) {
        speakFunc("Opening Facebook...");
        window.open("https://www.facebook.com");
    } else if (command.includes("time")) {
        const time = new Date().toLocaleTimeString();
        speakFunc(`The current time is ${time}`);
    } else if (command.includes("date")) {
        const date = new Date().toLocaleDateString();
        speakFunc(`Today's date is ${date}`);
    } else {
        speakFunc(`Searching for ${command}`);
        window.open(`https://www.google.com/search?q=${command}`);
    }
};

// Add click event listener to start voice input
btn.addEventListener("click", startVoiceInput);
