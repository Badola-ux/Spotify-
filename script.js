// Get elements
const playButtons = document.querySelectorAll('.songlist .songlistplay .timestamp i');
const progressBar = document.getElementById('myProgressBar');
const playPauseButton = document.querySelector('.bottom .fa-circle-play');
const audioElement = new Audio(); // Create an audio object

let isPlaying = false;  // Track whether the audio is playing

// Play/Pause functionality for each song
playButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const songItems = document.querySelectorAll('.songItem');
        const songTitle = songItems[index].querySelector('span');
        const timestamp = songItems[index].querySelector('.timestamp');

        // Check if the song is already playing
        if (isPlaying) {
            // Pause the current song
            audioElement.pause();
            button.classList.remove('fa-pause');
            button.classList.add('fa-circle-play');
            isPlaying = false;
            timestamp.style.color = 'black';
        } else {
            // Play the clicked song
            const songSrc = `path/to/song${index + 1}.mp3`; // Set the audio source (replace with actual path)

            audioElement.src = songSrc;
            audioElement.play();

            // Update the button and timestamp style
            button.classList.remove('fa-circle-play');
            button.classList.add('fa-pause');
            isPlaying = true;
            timestamp.style.color = '#1db954'; // Green color when playing
            updateProgressBar();
        }
    });
});

// Play/Pause button at the bottom (for the audio control)
playPauseButton.addEventListener('click', () => {
    if (isPlaying) {
        audioElement.pause();
        playPauseButton.classList.remove('fa-pause');
        playPauseButton.classList.add('fa-circle-play');
        isPlaying = false;
    } else {
        audioElement.play();
        playPauseButton.classList.remove('fa-circle-play');
        playPauseButton.classList.add('fa-pause');
        isPlaying = true;
        updateProgressBar();
    }
});

// Update progress bar as the song plays
function updateProgressBar() {
    setInterval(() => {
        if (audioElement.duration) {
            const progress = (audioElement.currentTime / audioElement.duration) * 100;
            progressBar.value = progress;
        }
    }, 500);
}

// Change song position when progress bar is clicked
progressBar.addEventListener('input', () => {
    const newTime = (progressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = newTime;
});

// When the audio ends, reset the play/pause button and progress bar
audioElement.addEventListener('ended', () => {
    playPauseButton.classList.remove('fa-pause');
    playPauseButton.classList.add('fa-circle-play');
    isPlaying = false;
    progressBar.value = 0;
});
