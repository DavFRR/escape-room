import '../assets/room_1.gif';
import '../assets/love.png';

window.initializeEscapeRoom = function() {
    const tableButton = document.getElementById('table-button');
    if (tableButton) {
        tableButton.addEventListener('click', activateZoom);
    }

    const checkButton = document.querySelector('.check-button');
    if (checkButton) {
        checkButton.addEventListener('click', checkAnswer);
    }
}

const correctAnswer = ['E', 'G', 'B', 'A', 'D', 'C', 'I', 'F', 'H'];

function activateZoom() {
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
