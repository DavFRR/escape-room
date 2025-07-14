document.addEventListener('DOMContentLoaded', () => {
    console.log('Welcome to Room 3.5!');

    document.addEventListener('mousemove', (e) => {
        const overlay = document.querySelector('.dark-overlay');
        const cursor = document.querySelector('.cursor');
        
        overlay.style.setProperty('--mouse-x', e.clientX + 'px');
        overlay.style.setProperty('--mouse-y', e.clientY + 'px');
        
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const correctWords = ['do', 'everything', 'in', 'love'];
    const inputs = document.querySelectorAll('.input-table input');
    const checkButton = document.querySelector('.check-button');
    const successMessage = document.querySelector('.success-message');

    function checkInputs() {
        const currentWords = Array.from(inputs).map(input => input.value.trim());
        const allWordsPresent = correctWords.every(word => 
            currentWords.some(input => input.toLowerCase() === word.toLowerCase())
        );

        if (allWordsPresent) {
            successMessage.style.display = 'block';
            setTimeout(() => {
                window.location.href = './room-4.html';
            }, 3000);
        }
    }

    checkButton.addEventListener('click', checkInputs);
});