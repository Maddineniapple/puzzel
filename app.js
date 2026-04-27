// Core Application Logic
const state = {
    user: JSON.parse(localStorage.getItem('neon_test_user')),
    questions: {
        1: [
            { q: "What is 5 + 7?", options: ["10", "11", "12", "13"], correct: 2 },
            { q: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], correct: 1 },
            { q: "What is the capital of France?", options: ["London", "Berlin", "Paris", "Madrid"], correct: 2 },
            { q: "How many legs does a spider have?", options: ["6", "8", "10", "12"], correct: 1 },
            { q: "Which is the largest ocean?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], correct: 3 }
        ],
        2: [
            { q: "Which element has the symbol 'O'?", options: ["Gold", "Oxygen", "Silver", "Iron"], correct: 1 },
            { q: "What is the square root of 144?", options: ["10", "11", "12", "14"], correct: 2 },
            { q: "Who wrote 'Romeo and Juliet'?", options: ["Dickens", "Shakespeare", "Hemingway", "Twain"], correct: 1 },
            { q: "What is the smallest prime number?", options: ["0", "1", "2", "3"], correct: 2 },
            { q: "Which country is home to the Kangaroo?", options: ["India", "USA", "Australia", "Brazil"], correct: 2 }
        ],
        3: [
            { q: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"], correct: 0 },
            { q: "Which gas do plants absorb?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correct: 2 },
            { q: "What is the chemical formula for water?", options: ["CO2", "H2O", "O2", "NaCl"], correct: 1 },
            { q: "Who painted the Mona Lisa?", options: ["Van Gogh", "Picasso", "Da Vinci", "Dalí"], correct: 2 },
            { q: "What is the hardest natural substance?", options: ["Gold", "Iron", "Diamond", "Quartz"], correct: 2 }
        ]
    },
    answers: [],
    currentQuestionIndex: 0
};

function initRound(roundNumber) {
    if (!state.user) {
        window.location.href = 'index.html';
        return;
    }
    
    // Security: Check if user is on the correct round
    if (state.user.currentRound !== roundNumber) {
        window.location.href = `round${state.user.currentRound}.html`;
    }

    renderQuestion();
}

function renderQuestion() {
    const round = state.user.currentRound;
    const qData = state.questions[round][state.currentQuestionIndex];
    const container = document.getElementById('questionContainer');
    
    container.innerHTML = `
        <div class="question-card">
            <h3>Question ${state.currentQuestionIndex + 1} of 5</h3>
            <p style="margin: 1rem 0; font-size: 1.2rem;">${qData.q}</p>
            <div class="options">
                ${qData.options.map((opt, i) => `
                    <button class="option-btn" onclick="selectOption(${i})">${opt}</button>
                `).join('')}
            </div>
        </div>
    `;
}

function selectOption(index) {
    const btns = document.querySelectorAll('.option-btn');
    btns.forEach(b => b.classList.remove('selected'));
    btns[index].classList.add('selected');
    state.answers[state.currentQuestionIndex] = index;
}

async function nextQuestion() {
    if (state.answers[state.currentQuestionIndex] === undefined) {
        alert("Please select an answer!");
        return;
    }

    if (state.currentQuestionIndex < 4) {
        state.currentQuestionIndex++;
        renderQuestion();
    } else {
        await submitRound();
    }
}

async function submitRound() {
    const round = state.user.currentRound;
    const roundKey = `round${round}`;
    
    // Calculate score for this round
    let roundScore = 0;
    state.questions[round].forEach((q, i) => {
        if (state.answers[i] === q.correct) roundScore += 10;
    });

    // Update user state
    state.user[roundKey] = state.answers;
    state.user.score = (state.user.score || 0) + roundScore;
    
    if (round < 3) {
        state.user.currentRound++;
        localStorage.setItem('neon_test_user', JSON.stringify(state.user));
        await DB.updateUser(state.user.userId, state.user);
        window.location.href = `round${state.user.currentRound}.html`;
    } else {
        // Final Submit
        state.user.endTime = Date.now();
        state.user.totalTime = Math.floor((state.user.endTime - state.user.startTime) / 1000);
        state.user.submitted = true;
        localStorage.setItem('neon_test_user', JSON.stringify(state.user));
        await DB.updateUser(state.user.userId, state.user);
        window.location.href = 'submit.html';
    }
}

// Anti-cheat: Prevent back button
history.pushState(null, null, location.href);
window.onpopstate = function () {
    history.go(1);
};

// Anti-cheat: Prevent refresh loss (basic)
window.onbeforeunload = function() {
    return "Are you sure you want to leave? Your progress will be saved but you cannot re-enter if you close.";
};
