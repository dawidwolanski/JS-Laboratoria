const soundFiles = {
    'A': 'http://127.0.0.1:5500/lab3/kick-tape.wav',
    'S': 'http://127.0.0.1:5500/lab3/hihat-reso.wav',
    'D': 'http://127.0.0.1:5500/lab3/clap-fat.wav',
    'F': 'http://127.0.0.1:5500/lab3/perc-tambo.wav'
  };

  
  let recording = false;
  let track1 = [];
  let track2 = [];
  let track3 = [];
  let track4 = [];

  
  function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
  }

  
  function recordSound(key, time) {
    if (recording) {
      switch (key) {
        case 'A':
          track1.push({ time, sound: soundFiles[key] });
          break;
        case 'S':
          track2.push({ time, sound: soundFiles[key] });
          break;
        case 'D':
          track3.push({ time, sound: soundFiles[key] });
          break;
        case 'F':
          track4.push({ time, sound: soundFiles[key] });
          break;
      }
    }
  }

  // Funkcja obsługująca odtwarzanie ścieżki dźwiękowej
  function playTrack(track) {
    track.forEach(({ time, sound }) => {
      setTimeout(() => playSound(sound), time);
    });
  }

  // Funkcja obsługująca zdarzenie naciśnięcia klawisza
  function handleKeyPress(event) {
    const key = event.key.toUpperCase();
    playSound(soundFiles[key]);
    recordSound(key, Date.now());
  }

  
  function startRecording() {
    recording = true;
  }

  function stopRecording() {
    recording = false;
  }

  
  function playAllTracks() {
    playTrack(track1);
    playTrack(track2);
    playTrack(track3);
    playTrack(track4);
  }

  // do poprawy ścieżki nagrywania
  document.addEventListener('keydown', handleKeyPress);
  document.getElementById('startRecordingBtn').addEventListener('click', startRecording);
  document.getElementById('stopRecordingBtn').addEventListener('click', stopRecording);
  document.getElementById('playAllTracksBtn').addEventListener('click', playAllTracks);