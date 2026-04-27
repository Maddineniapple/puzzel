function startTimerDisplay() {
    const timerElement = document.createElement('div');
    timerElement.className = 'timer';
    timerElement.id = 'displayTimer';
    document.body.appendChild(timerElement);

    const user = JSON.parse(localStorage.getItem('neon_test_user'));
    const startTime = user.startTime;

    setInterval(() => {
        const now = Date.now();
        const diff = Math.floor((now - startTime) / 1000);
        const mins = Math.floor(diff / 60);
        const secs = diff % 60;
        timerElement.innerText = `Time: ${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }, 1000);
}

document.addEventListener('DOMContentLoaded', startTimerDisplay);
