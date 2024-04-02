const whiteKeys = ["z", "x", "c", "v", "b", "n", "m"];
const blackKeys = ["s", "d", "g", "h", "j"];

const keys = document.querySelectorAll(".key");
const whiteKey = document.querySelectorAll(".key.white");
const blackKey = document.querySelectorAll(".key.black");
const recordButton = document.querySelector(".record-button");
const playButton = document.querySelector(".play-button");

// Converts keys to notes for playSong function
const keyMap = [...keys].reduce((map, key) => {
  map[key.dataset.note] = key;
  return map;
}, {});
//

let recordingStartTime;
let songNotes;

keys.forEach((key) => {
  key.addEventListener("click", () => {
    playNote(key);
  });
});

// Plays the note on key press(keyboard)
document.addEventListener("keydown", (e) => {
  if (e.repeat) {
    return;
  }
  const key = e.key;
  const whiteKeyIndex = whiteKeys.indexOf(key);
  const blackKeyIndex = blackKeys.indexOf(key);

  if (whiteKeyIndex > -1) {
    playNote(whiteKey[whiteKeyIndex]);
  }
  if (blackKeyIndex > -1) {
    playNote(blackKey[blackKeyIndex]);
  }
});
//

// Toggles the recording
recordButton.addEventListener("click", toggleRecording);

function toggleRecording() {
  recordButton.classList.toggle("active");
  if (isRecording()) {
    startRecording();
  } else {
    stopRecording();
  }
}
//

// Plays the recorded song when you click Play
playButton.addEventListener("click", playSong);
//

// Checks if it's recording
function isRecording() {
  return recordButton != null && recordButton.classList.contains("active");
}
//

// Starts the recording
function startRecording() {
  recordingStartTime = Date.now();
  songNotes = [];
  playButton.classList.remove("show");
}
//

// Stops recording
function stopRecording() {
  playButton.classList.add("show");
}
//

// Plays the song recorded
function playSong() {
  if (songNotes.length === 0) {
    return;
  }
  songNotes.forEach((note) => {
    setTimeout(() => {
      playNote(keyMap[note.key]);
    }, note.startTime);
  });
}
//

// Plays and styles the note when click a key(browser) or press a specific key(on keyboard)
function playNote(key) {
  if (isRecording()) {
    recordNote(key.dataset.note);
  }
  const noteAudio = document.getElementById(key.dataset.note);
  noteAudio.currentTime = 0;
  noteAudio.play();
  key.classList.add("active");
  noteAudio.addEventListener("ended", () => {
    key.classList.remove("active");
  });
}
//

// Recording the notes
function recordNote(note) {
  songNotes.push({
    key: note,
    startTime: Date.now() - recordingStartTime,
  });
}
//
