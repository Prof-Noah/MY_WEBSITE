window.updateCharCount = function () {
    let textarea = document.getElementById("messageInput");
    let charProgress = document.getElementById("charProgress");
    let charCounter = document.getElementById("charCounter");

    if (!textarea || !charProgress || !charCounter) {
        console.log("Error: One or more elements not found!");
        return;
    }

    let length = textarea.value.length;
    console.log("Character count: " + length);

    charProgress.value = length;
    charCounter.textContent = `${length} / 200 characters`;

    // Save text to localStorage
    localStorage.setItem("messageInput", textarea.value);
};

document.addEventListener("DOMContentLoaded", function () {
    // Welcome Message Logic (index.html)
    const welcomeMessage = document.getElementById('welcomeMessage');
    const greeting = document.getElementById('greeting');
    const userNameInput = document.getElementById('userName');

    window.welcomeUser = function (event) {
        event.preventDefault();
        const name = userNameInput.value.trim();
        if (name) {
            localStorage.setItem('userName', name);
            displayWelcomeMessage(name);
            userNameInput.value = '';
        } else {
            alert('Please enter a valid name!');
        }
    };

    function displayWelcomeMessage(name) {
        const now = new Date();
        const hour = now.getHours();
        let greetingText = '';

        if (hour < 12) greetingText = 'Good Morning';
        else if (hour < 17) greetingText = 'Good Afternoon';
        else greetingText = 'Good Evening';

        const storedName = localStorage.getItem('userName');
        if (storedName && storedName === name) {
            welcomeMessage.textContent = `Welcome back, ${name}! ${greetingText}! 🌟`;
        } else {
            welcomeMessage.textContent = `Welcome, ${name}! ${greetingText}! 🌟`;
        }
        welcomeMessage.classList.add('show');
        if (greeting) {
            greeting.textContent = `Hey there, my name is ${name}, a student at the ${greetingText} Faculty of Computers and Information. I'm interested in forming new social and professional relationships and meeting new friends.`;
        }
    }

    const storedName = localStorage.getItem('userName');
    if (storedName && welcomeMessage) {
        displayWelcomeMessage(storedName);
    }

    // Dark Mode Toggle
    const toggleButton = document.getElementById('toggleMode');
    const modeIcon = document.getElementById('modeIcon');
    if (toggleButton) {
        toggleButton.addEventListener('click', function () {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            modeIcon.textContent = isDark ? '🌙' : '☀️';
            toggleButton.classList.add('toggle-click');
        });
    }

    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        if (modeIcon) {
            modeIcon.textContent = '🌙';
        }
    }

    // Smooth Scroll for Nav Links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });

    // Random Motivational Quote Generator (num1.html)
    const quotes = [
        "Success is not final, failure is not fatal: It is the courage to continue that counts.",
        "The best way to predict the future is to create it.",
        "Believe you can and you're halfway there.",
        "Hard work beats talent when talent doesn’t work hard.",
        "The only way to do great work is to love what you do."
    
    ];

    window.generateQuote = function () {
        const quoteElement = document.getElementById('quote');
        if (quoteElement) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            quoteElement.textContent = `"${quotes[randomIndex]}"`;
        }
    };

    if (document.getElementById('quote')) {
        generateQuote();
    }

    // Show/Hide Extra Info (num1.html)
    window.toggleExtraInfo = function () {
        const extraInfo = document.getElementById('extraInfo');
        if (extraInfo.style.display === 'none') {
            extraInfo.style.display = 'block';
        } else {
            extraInfo.style.display = 'none';
        }
    };

    // Table Filtering (num2.html)
    window.filterCourses = function () {
        const filter = document.getElementById('courseFilter').value;
        const rows = document.querySelectorAll('#courseTable tr[data-category]');
        rows.forEach(row => {
            const category = row.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    };

    // Progress Bar (num2.html)
    let daysCompleted = localStorage.getItem('daysCompleted') ? parseInt(localStorage.getItem('daysCompleted')) : 0;
    const progressBar = document.getElementById('progressBar');
    const daysCompletedSpan = document.getElementById('daysCompleted');

    if (progressBar && daysCompletedSpan) {
        progressBar.value = daysCompleted;
        daysCompletedSpan.textContent = daysCompleted;
    }

    window.updateProgress = function () {
        if (daysCompleted < 30) {
            daysCompleted++;
            localStorage.setItem('daysCompleted', daysCompleted);
            progressBar.value = daysCompleted;
            daysCompletedSpan.textContent = daysCompleted;
            if (daysCompleted === 30) {
                alert('Congratulations! You have completed your goal of learning JavaScript in 30 days!');
            }
        } else {
            alert('You have already completed your goal!');
        }
    };

    // Load saved text on page load
    const savedText = localStorage.getItem("messageInput") || "";
    const textarea = document.getElementById("messageInput");
    if (textarea) {
        textarea.value = savedText;
        updateCharCount();
    }

    window.handleSubmit = function (event) {
        event.preventDefault();
        const form = event.target;
        const name = document.getElementById('formName').value.trim();
        const email = document.getElementById('formEmail').value.trim();
        const message = document.getElementById('messageInput').value.trim();
        const purpose = form.querySelector('input[name="love"]:checked')?.value;

        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const messageError = document.getElementById('messageError');

        let valid = true;
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';

        if (!name) {
            nameError.textContent = 'Name is required.';
            valid = false;
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            emailError.textContent = 'Please enter a valid email.';
            valid = false;
        }

        if (!message) {
            messageError.textContent = 'Message is required.';
            valid = false;
        }

        if (!purpose) {
            alert('Please select a purpose.');
            valid = false;
        }

        if (valid) {
            alert(`Thank you, ${name}! Your message has been received.\nPurpose: ${purpose}`);
            form.reset();
            updateCharCount();
        }
    };
});