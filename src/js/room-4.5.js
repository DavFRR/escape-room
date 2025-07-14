import '../assets/room4.5.png';
document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const answerButtonsElement = document.getElementById('answers');
    const feedbackElement = document.getElementById('feedback');

    let currentQuestionIndex = 0;

    const questions = [
        {
            question: "Cual es la opción que eliges si estás en un examen tipo test y eliges a boleo?",
            answers: [
                { text: "A", correct: true },
                { text: "B", correct: true },
                { text: "C", correct: true }
            ]
        },
        {
            question: "¿Quién es el dios griego asociado con la lira, la poesía y la profecía?",
            answers: [
                { text: "Apolo", correct: true },
                { text: "Hermes", correct: false },
                { text: "Dionisio", correct: false }
            ]
        },
        {
            question: "What is 2*0?",
            answers: [
                { text: "2", correct: false },
                { text: "0", correct: true },
                { text: "5", correct: false }
            ]
        },
        {
            question: "What is the largest ocean on Earth?",
            answers: [
                { text: "Atlantic Ocean", correct: false },
                { text: "Indian Ocean", correct: false },
                { text: "Pacific Ocean", correct: true }
            ]
        },
        {
            question: "Who painted the Mona Lisa?",
            answers: [
                { text: "Leonardo Da vinci", correct: false },
                { text: "tu madre al hacerte", correct: true },
                { text: "Leonardo Di caprio", correct: true }
            ]
        }
    ];

    function showQuestion() {
        resetState();
        const question = questions[currentQuestionIndex];
        questionElement.textContent = question.question;
        question.answers.forEach((answer, index) => {
            const button = answerButtonsElement.children[index];
            button.textContent = answer.text;
            button.onclick = () => selectAnswer(answer.correct);
            button.style.backgroundColor = '#4CAF50'; // Reset to default green
        });
    }

    function resetState() {
        feedbackElement.textContent = '';
        while (answerButtonsElement.firstChild) {
            answerButtonsElement.removeChild(answerButtonsElement.firstChild);
        }
        // Re-add buttons if they were removed, or just ensure they are there
        for (let i = 0; i < 3; i++) {
            const button = document.createElement('button');
            button.classList.add('answer-btn');
            button.style.cssText = 'padding: 10px 20px; background-color: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; margin-bottom: 10px;';
            answerButtonsElement.appendChild(button);
        }
    }

    function selectAnswer(correct) {
        Array.from(answerButtonsElement.children).forEach(button => {
            button.onclick = null; // Disable buttons after selection
        });

        if (correct) {
            feedbackElement.textContent = 'Correct!';
            feedbackElement.style.color = 'lightgreen';
            setTimeout(() => {
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) {
                    showQuestion();
                } else {
                    // All questions answered, redirect
                    document.getElementById('quiz-container').style.display = 'none';
                    const proceedButton = document.getElementById('proceed-button');
                    proceedButton.style.display = 'block';
                    proceedButton.onclick = () => {
                        window.location.href = './room-5.html';
                    };
                }
            }, 1000);
        } else {
            feedbackElement.textContent = 'Incorrect. Try again.';
            feedbackElement.style.color = 'red';
            // Re-enable buttons for another try
            Array.from(answerButtonsElement.children).forEach((button, index) => {
                button.onclick = () => selectAnswer(questions[currentQuestionIndex].answers[index].correct);
            });
        }
    }

    showQuestion();
});