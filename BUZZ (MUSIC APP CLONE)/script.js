console.log("Welcome to Buzz");

// Initialize the variable
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let masterSongName = document.querySelector('.masterSongName'); // Use querySelector for class
let songItems = Array.from(document.querySelectorAll('.songItemPlay')); // Use querySelectorAll for class

let songs = [
  { songName: "Mombatiyan - Mickey Singh", filepath: "songs/audio1.mp3", coverPath: "covers/cover1.jpg" },
  { songName: "Bom diggy - Zack Knight", filepath: "songs/audio2.mp3", coverPath: "covers/cover2.jpg" },
  { songName: "Thoda pyaar hua - Stebin Ben", filepath: "songs/audio3.mp3", coverPath: "covers/cover3.jpg" },
  { songName: "Toh fir aao - Mustafa Zahid", filepath: "songs/audio4.mp3", coverPath: "covers/cover4.jpg" },
];

songItems.forEach((element, i) => {
  element.addEventListener('click', () => {
    if (songIndex === i) {
      // Toggle play/pause for the same song
      if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.src = songs[songIndex].filepath;
        audioElement.play();
        element.classList.remove('fa-play-circle');
        element.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
      } else {
        audioElement.pause();
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
        gif.style.opacity = 0
      }
    } else {
      // Play the clicked song
      songIndex = i;
      audioElement.src = songs[songIndex].filepath;
      audioElement.play();
      element.classList.remove('fa-play-circle');
      element.classList.add('fa-pause-circle');
      // Reset play icon for other songs
      songItems.forEach((otherElement, j) => {
        if (i !== j) {
          otherElement.classList.remove('fa-pause-circle');
          otherElement.classList.add('fa-play-circle');
        }
      });
    }
  });
});

document.getElementById('next').addEventListener('click', () => {
  songIndex = (songIndex + 1) % songs.length;
  playCurrentSong();
});

document.getElementById('previous').addEventListener('click', () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playCurrentSong();
});

function playCurrentSong() {
  audioElement.src = songs[songIndex].filepath;
  audioElement.play();
  masterSongName.innerText = songs[songIndex].songName;
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
  gif.style.opacity = 1;
  updateSongItems();
}

function updateSongItems() {
  songItems.forEach((element, i) => {
    if (i === songIndex) {
      element.classList.remove('fa-play-circle');
      element.classList.add('fa-pause-circle');
      gif.style.opacity = 1;
    } else {
      element.classList.remove('fa-pause-circle');
      element.classList.add('fa-play-circle');
      gif.style.opacity = 0;
    }
  });
}

masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
  }
});

audioElement.addEventListener('timeupdate', () => {
  const progress = (audioElement.currentTime / audioElement.duration) * 100;
  myprogressbar.value = progress;
});

myprogressbar.addEventListener('input', () => {
  audioElement.currentTime = (myprogressbar.value * audioElement.duration) / 100;
});
