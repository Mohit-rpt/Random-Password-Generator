let lengthSlider = document.getElementById('lengthSlider');
let sliderValue = document.getElementById('sliderValue');

sliderValue.textContent = lengthSlider.value;

lengthSlider.addEventListener("input", () => {
    sliderValue.textContent = lengthSlider.value;
});

let checkboxes = document.querySelectorAll('.checkbox');

Array.from(checkboxes).forEach(Element => {
    Element.addEventListener('click', (e) => {
        if (e.target.innerText.trim() === 'radio_button_unchecked') {
            e.target.innerText = 'task_alt';
            e.target.nextElementSibling.nextElementSibling.checked = true;
        } else {
            e.target.innerText = 'radio_button_unchecked';
            e.target.nextElementSibling.nextElementSibling.checked = false;
        }
    });
});

let includeLabels = document.querySelectorAll('.row label');

Array.from(includeLabels).forEach(Element => {
    Element.addEventListener('click', (e) => {
        if (e.target.previousElementSibling.innerText.trim() === 'radio_button_unchecked') {
            e.target.previousElementSibling.innerText = 'task_alt';
            e.target.nextElementSibling.checked = true;
        } else {
            e.target.previousElementSibling.innerText = 'radio_button_unchecked';
            e.target.nextElementSibling.checked = false;
        }
    });
});

let generateBtn = document.getElementById('generateBtn');
let password = document.getElementById('password');

generateBtn.addEventListener('click', function () {
    let length = parseInt(lengthSlider.value);
    let uppercase = document.getElementById('uppercase').checked;
    let lowercase = document.getElementById('lowercase').checked;
    let symbols = document.getElementById('symbols').checked;
    let numbers = document.getElementById('numbers').checked;

    // Alert 1: No checkbox selected
    if (!uppercase && !lowercase && !symbols && !numbers) {
        alert("Select at least one character type!");
        password.value = "";
        return;
    }

    // Alert 2: Length too short
    if (length < 4) {
        alert("Password must be at least 4 characters long!");
        password.value = "";
        return;
    }

    let password_generated;
    try {
        password_generated = generatePassword(length, uppercase, lowercase, symbols, numbers);
        // Alert 3: Output field error (if password cannot be displayed)
        if (!password_generated || password_generated.length === 0) {
            alert("Unable to display password. Try again!");
            password.value = "";
            return;
        }
        password.value = password_generated;
    } catch (err) {
        alert("Unable to display password. Try again!");
        password.value = "";
        return;
    }
});

function generatePassword(length, uppercase, lowercase, symbols, numbers) {
    let charset = "";
    let string = "";

    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (symbols) charset += "!@#$%^&*()";
    if (numbers) charset += "0123456789";

    // Prevent empty charset (shouldn't happen due to earlier check)
    if (charset.length === 0) return "";

    for (let i = 0; i < length; i++) {
        string += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    return string;
}

let copyIcon = document.getElementById('copyIcon');

copyIcon.addEventListener('click', () => {
    if (password.value !== "") {
        navigator.clipboard.writeText(password.value)
            .then(() => {
                copyIcon.innerText = 'check';
                setTimeout(() => {
                    copyIcon.innerText = 'content_copy';
                }, 3000);
            })
            .catch(() => {
                // Alert 4: Copy failed
                alert("Failed to copy password. Try manually!");
            });
    }
});
