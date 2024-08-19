const generateSongButton = document.getElementById('generate-song');
const pauseResumeButton = document.getElementById('pause-resume');
const songOutputDiv = document.getElementById('song-output');

let isPlaying = false;
let melodyOscillator;
let harmonyOscillator;
let gainNode;
let audioContext;

generateSongButton.addEventListener('click', generateSong);
pauseResumeButton.addEventListener('click', pauseResume);

function generateSong() {
    // Define the song structure
    const song = {
        melody: [],
        harmony: []
    };

    // Generate the melody
    for (let i = 0; i < 8; i++) {
        const note = getRandomNote();
        song.melody.push(note);
    }

    // Generate the harmony
    for (let i = 0; i < 4; i++) {
        const chord = getRandomChord();
        song.harmony.push(chord);
    }

    // Create the audio context
    audioContext = new AudioContext();

    // Create the melody oscillator
    melodyOscillator = audioContext.createOscillator();
    melodyOscillator.type = 'sine';

    // Create the harmony oscillator
    harmonyOscillator = audioContext.createOscillator();
    harmonyOscillator.type = 'sine';

    // Create a gain node for the melody and harmony
    gainNode = audioContext.createGain();
    gainNode.gain.value = 0.5;

    // Connect the oscillators to the gain node
    melodyOscillator.connect(gainNode);
    harmonyOscillator.connect(gainNode);

    // Connect the gain node to the audio context destination
    gainNode.connect(audioContext.destination);

    // Play the melody
    for (let i = 0; i < song.melody.length; i++) {
        const note = song.melody[i];
        melodyOscillator.frequency.setValueAtTime(note.frequency, audioContext.currentTime + i * 0.5);
    }

    // Play the harmony
    for (let i = 0; i < song.harmony.length; i++) {
        const chord = song.harmony[i];
        harmonyOscillator.frequency.setValueAtTime(chord.frequency, audioContext.currentTime + i * 2);
    }

    // Start the oscillators
    melodyOscillator.start();
    harmonyOscillator.start();

    isPlaying = true;

    // Output the song to the HTML
    const songOutput = `Melody: ${song.melody.map(note => note.name).join(', ')}<br>Harmony: ${song.harmony.map(chord => chord.name).join(', ')}`;
    songOutputDiv.innerHTML = songOutput;
}

function pauseResume() {
    if (isPlaying) {
        // Pause the oscillators
        melodyOscillator.stop();
        harmonyOscillator.stop();

        isPlaying = false;
        pauseResumeButton.innerHTML = 'Stop';
    } else {
        // Resume the oscillators
        melodyOscillator.start();
        harmonyOscillator.start();

        isPlaying = true;
        pauseResumeButton.innerHTML = 'Stop';
    }
}

function getRandomNote() {
    const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
    const index = Math.floor(Math.random() * notes.length);
    const note = notes[index];
    return {
        name: note,
        frequency: getNoteFrequency(note)
    };
}

function getNoteFrequency(note) {
    const notes = {
        'C4': 261.63,
        'D4': 293.66,
        'E4': 329.63,
        'F4': 349.23,
        'G4': 392.00,
        'A4': 440.00,
        'B4': 493.88
    };
    return notes[note];
}

function getRandomChord() {
    const chords = ['C major', 'G major', 'Am minor', 'F major'];
    const index = Math.floor(Math.random() * chords.length);
    const chord = chords[index];
    return {
        name: chord,
        frequency: getChordFrequency(chord)
    };
}

function getChordFrequency(chord) {
    const chords = {
        'C major': 261.63, // C4
        'G major': 392.00, // G4
        'Am minor': 220.00, // A3
        'F major': 349.23 // F4
    };
    return chords[chord];
}
