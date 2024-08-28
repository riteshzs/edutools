function showDateTimeAndGreeting() {
    const greetingElement = document.getElementById('greeting');

    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const day = now.getDate();
    const month = now.getMonth() + 1;
    const year = now.getFullYear();

    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;

    let greeting;
    if (hours < 12) {
        greeting = "Hi there,Good Morning";
    } else if (hours < 18) {
        greeting = "Hi there,Good Afternoon";
    } else {
        greeting = "Hi there,Good Evening";
    }

    // Display the greeting with the current date and time
    greetingElement.textContent = `${greeting}!`;
}

// Call the function once to display the initial greeting
showDateTimeAndGreeting();

// Optionally, update the time every second
setInterval(showDateTimeAndGreeting, 1000);
