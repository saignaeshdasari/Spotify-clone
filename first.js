console.log("hello world");

let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    }else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
    }
});

let progressBar = document.getElementsByClassName("progressBar");
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar[0].value = progress;
});
progressBar[0].addEventListener('change', ()=>{
    audioElement.currentTime = progressBar[0].value * audioElement.duration/100;
});
let volumeBar = document.getElementById("volumeBar");
volumeBar.addEventListener('change', ()=>{
    audioElement.volume = volumeBar.value/100;
});

let volumeIcon = document.getElementById("masterVolume");
volumeIcon.addEventListener('click', ()=>{
    if(volumeIcon.classList.contains('fa-volume-high')){
        volumeIcon.classList.remove('fa-volume-high');
        volumeIcon.classList.add('fa-volume-mute');
        audioElement.volume = 0;
    }else{
        volumeIcon.classList.remove('fa-volume-mute');
        volumeIcon.classList.add('fa-volume-high');
        audioElement.volume = volumeBar.value/100;
    }
});

let currentTime = document.getElementsByClassName("current-time");
audioElement.addEventListener('timeupdate', ()=>{
    let minutes = Math.floor(audioElement.currentTime / 60);
    let seconds = Math.floor(audioElement.currentTime % 60);
    currentTime[0].innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

let songs =[
 {songName: "Lokiverse 2 Leo", filePath: "1.mp3", coverPath: "cover1.png",},
{songName: "Hukum", filePath: "2.mp3", coverPath: "cover2.jpg",}, 
{songName: "Tuyo", filePath: "3.mp3", coverPath: "cover3.jpg",},
{songName: "Marana mass", filePath: "4.mp3", coverPath: "cover4.jpg",},
{songName: "Tere bina", filePath: "5.mp3", coverPath: "cover5.jpg",},
{songName: "Adangatha Asuran", filePath: "6.mp3", coverPath: "cover6.jpg",},
]

let songItems = Array.from(document.getElementsByClassName('songitem'));
songItems.forEach((element, i)=>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
   
    
});
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    });
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        audioElement.src=`songs/${songIndex}.mp3`;
        currentSong.innerText = songs[songIndex-1].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    });
});

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=6){
        songIndex = 1;
    }else{
        songIndex += 1;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    currentSong.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
});

document.getElementById('prev').addEventListener('click', ()=>{
    if(songIndex<=1){
        songIndex = 6;
    }else{
        songIndex -= 1;
    }
    audioElement.src=`songs/${songIndex}.mp3`;
    currentSong.innerText = songs[songIndex-1].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
});

let currentSong = document.getElementById('currentSong');
let totalduration = document.getElementsByClassName('total-duration');
audioElement.addEventListener('loadeddata', ()=>{
    let minutes = Math.floor(audioElement.duration / 60);
    let seconds = Math.floor(audioElement.duration % 60);
    totalduration[0].innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});


