// I have used Some AI here, I am not quite good with css. It is HARD and looks HARDER
// I am still working on my JavaScript

const video = document.getElementById('video');
const playBtn = document.getElementById('play-pause');
const seek = document.getElementById('seek');
const timeLabel = document.getElementById('time');
const track = video.textTracks[0];

// Play/Pause
playBtn.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        playBtn.textContent = 'Pause';
    } else {
        video.pause();
        playBtn.textContent = 'Play';
    }
});

// Skip Buttons
document.getElementById('back-10').addEventListener('click', () => video.currentTime -= 10);
document.getElementById('fwd-10').addEventListener('click', () => video.currentTime += 10);

// Seek/Time Update
video.addEventListener('timeupdate', () => {
    seek.value = (video.currentTime / video.duration) * 100;
    let mins = Math.floor(video.currentTime / 60);
    let secs = Math.floor(video.currentTime % 60);
    timeLabel.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
});

seek.addEventListener('input', () => {
    video.currentTime = (seek.value / 100) * video.duration;
});

// Speed & Volume
document.getElementById('speed').addEventListener('change', (e) => video.playbackRate = e.target.value);
document.getElementById('volume').addEventListener('input', (e) => video.volume = e.target.value);

// CC Toggle
document.getElementById('cc-toggle').addEventListener('click', () => {
    track.mode = track.mode === 'showing' ? 'disabled' : 'showing';
});

// PiP & Fullscreen
document.getElementById('pip').addEventListener('click', () => video.requestPictureInPicture());
document.getElementById('fullscreen').addEventListener('click', () => video.requestFullscreen());