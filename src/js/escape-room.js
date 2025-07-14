import '../assets/room_1.gif';
import '../assets/love.png';

function initializeEscapeRoom() {
    console.log('initializeEscapeRoom called.');
    const tableButton = document.getElementById('table-button');
    if (tableButton) {
        console.log('table-button found.');
        tableButton.addEventListener('click', activateZoom);
    } else {
        console.error('table-button not found!');
    }

    const checkButton = document.querySelector('.check-button');
    if (checkButton) {
        console.log('check-button found.');
        checkButton.addEventListener('click', checkAnswer);
    } else {
        console.error('check-button not found!');
    }
}

const correctAnswer = ['E', 'G', 'B', 'A', 'D', 'C', 'I', 'F', 'H'];

function activateZoom() {
    console.log('activateZoom called.');
    const container = document.querySelector('.room-container');
    if (!container.classList.contains('zoom-active')) {
        container.classList.add('zoom-active');
    }
}

function checkAnswer() {
    const inputs = document.querySelectorAll('.answer-input');
    const answers = Array.from(inputs).map(input => input.value.toUpperCase());
    
    if (answers.join('') === correctAnswer.join('')) {
        alert('Congrats on the first room, you\'re so intelligent, click the button to go to the next room');
        window.location.href = './room-2.html';
    } else {
        inputs.forEach((input, index) => {
            if (input.value.toUpperCase() === correctAnswer[index]) {
                input.style.backgroundColor = '#d4edda';
            } else {
                input.style.backgroundColor = '#f8d7da';
                setTimeout(() => {
                    input.style.backgroundColor = '';
                }, 500);
            }
        });
    }
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeEscapeRoom);

// Keep the global reference for potential external calls
window.initializeEscapeRoom = initializeEscapeRoom;
