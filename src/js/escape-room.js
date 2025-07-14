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
    console.log('Container found:', container);
    
    if (!container.classList.contains('zoom-active')) {
        console.log('Adding zoom-active class');
        container.classList.add('zoom-active');
        
        // Remove the debug border and background after the animation completes
        setTimeout(() => {
            const tableButton = document.getElementById('table-button');
            if (tableButton) {
                tableButton.style.background = 'transparent';
                tableButton.style.border = 'none';
            }
        }, 1500);
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
