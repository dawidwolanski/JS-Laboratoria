document.addEventListener('DOMContentLoaded', function() {
  
    const channelButtons = document.querySelectorAll('.channel');

    channelButtons.forEach((channel) => {
        const playButton = channel.querySelector('.play-channel');
        const clearButton = channel.querySelector('.clear-channel');
        const channelName = channel.getAttribute('data-channel');

        playButton.addEventListener('click', () => {
            playChannel(channelName);
        });

        clearButton.addEventListener('click', () => {
            recordedSounds[channelName] = [];
        });
    });

    // Obsługa zmiany tempa metronomu
    const bpmInput = document.getElementById('bpm');
    bpmInput.addEventListener('change', (e) => {
        bpm = parseInt(e.target.value);
        if (metronomeActive) {
            clearInterval(metronomeInterval);
            toggleMetronome();
        }
    });
});