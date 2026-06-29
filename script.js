const songs = [
{
    title: "Hip Hop 02",
    artist: "Lily J",
    src: "music1.mp3"
},
{
    title: "A Very Happy Christmas",
    artist: " Michael Ramir C",
    src: "music2.mp3"
},
{
    title: "Beautiful Dream",
    artist: "Diego Nava",
    src: "music3.mp3"
}
];

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");

const title = document.getElementById("title");
const artist = document.getElementById("artist");

const progress = document.getElementById("progress");
const volume = document.getElementById("volume");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const playlist = document.getElementById("playlist");

let songIndex = 0;

// Load Song
function loadSong(index) {
    const song = songs[index];

    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;

    updatePlaylist();
}

// Play Song
function playSong() {
    audio.play();
    playBtn.textContent = "⏸";
}

// Pause Song
function pauseSong() {
    audio.pause();
    playBtn.textContent = "▶";
}

// Toggle Play
playBtn.addEventListener("click", () => {
    if(audio.paused){
        playSong();
    } else {
        pauseSong();
    }
});

// Next Song
function nextSong() {
    songIndex++;
    if(songIndex >= songs.length){
        songIndex = 0;
    }

    loadSong(songIndex);
    playSong();
}

// Previous Song
function prevSong() {
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songIndex);
    playSong();
}

nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Progress Bar
audio.addEventListener("timeupdate", () => {

    const progressPercent =
        (audio.currentTime / audio.duration) * 100;

    progress.value = progressPercent || 0;

    currentTimeEl.textContent =
        formatTime(audio.currentTime);
});

progress.addEventListener("input", () => {
    audio.currentTime =
        (progress.value / 100) * audio.duration;
});

// Duration
audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent =
        formatTime(audio.duration);
});

// Format Time
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// Volume Control
volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

// Playlist
function createPlaylist() {

    songs.forEach((song, index) => {

        const li = document.createElement("li");

        li.textContent =
            `${song.title} - ${song.artist}`;

        li.addEventListener("click", () => {
            songIndex = index;
            loadSong(songIndex);
            playSong();
        });

        playlist.appendChild(li);
    });
}

function updatePlaylist() {
    const items = playlist.querySelectorAll("li");

    items.forEach((item, index) => {
        item.classList.toggle(
            "active",
            index === songIndex
        );
    });
}

// Autoplay Next Song
audio.addEventListener("ended", nextSong);

createPlaylist();
loadSong(songIndex);
