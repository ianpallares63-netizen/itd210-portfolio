
        const CIRC = 2 * Math.PI * 66;

        const pomo = {
            running: false,
            mode: 'focus',
            totalSec: 25 * 60,
            remaining: 25 * 60,
            sessions: 0,
            focusMin: 0,
            streak: 0,
            interval: null
        };

// the garden one looked 3 timers harder than this one :0 

        function setMode(btn, mode, mins, label) {
            if (pomo.running) return;
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            pomo.mode = mode;
            pomo.totalSec = mins * 60;
            pomo.remaining = pomo.totalSec;
            document.getElementById('pomoLabel').textContent = label;
            document.getElementById('pomoStartBtn').textContent = 'Start';
            renderTimer();
        }

        function renderTimer() {
            const m = Math.floor(pomo.remaining / 60);
            const s = pomo.remaining % 60;
            document.getElementById('pomoTime').textContent =
                String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
            const pct = 1 - pomo.remaining / pomo.totalSec;
            document.getElementById('pomoRing').style.strokeDashoffset = CIRC * (1 - pct);
        }

        function toggleTimer() {
            if (pomo.running) {
                clearInterval(pomo.interval);
                pomo.running = false;
                document.getElementById('pomoStartBtn').textContent = 'Resume';
            } else {
                pomo.running = true;
                document.getElementById('pomoStartBtn').textContent = 'Pause';
                pomo.interval = setInterval(() => {
                    if (pomo.remaining <= 0) {
                        clearInterval(pomo.interval);
                        pomo.running = false;
                        document.getElementById('pomoStartBtn').textContent = 'Done ✓';
                        if (pomo.mode === 'focus') {
                            pomo.sessions++;
                            pomo.focusMin += Math.round(pomo.totalSec / 60);
                            pomo.streak++;
                            updateStats();
                            const dots = document.querySelectorAll('.dot');
                            dots[(pomo.sessions - 1) % 4].classList.add('done');
                        }
                        return;
                    }
                    pomo.remaining--;
                    renderTimer();
                }, 1000);
            }
        }

        function resetTimer() {
            clearInterval(pomo.interval);
            pomo.running = false;
            pomo.remaining = pomo.totalSec;
            document.getElementById('pomoStartBtn').textContent = 'Start';
            renderTimer();
        }

        function updateStats() {
            document.getElementById('statSessions').textContent = pomo.sessions;
            document.getElementById('statFocus').textContent = pomo.focusMin + ' min';
            document.getElementById('statStreak').textContent = pomo.streak + ' 🔥';
        }

        renderTimer();