let vol;
let nowPlaying;
let gui;
let play;
let nextButton;
let prevButton;
let inputFile;
let playlist = [];  // list of 
let nowList = [];
let input;
let status = false;
const selectPlayList = document.getElementById('selectPlayList');
const selectMusic = document.getElementById('selectMusic');


//************************************************************ */
//Clases

class Song {
    
    constructor(path, id){
        //this.image = loadImage(image);
        this.song = loadSound(path);
        this.id = id;
    
    }
  
    playMusic(){
        this.song.play();
    }

    pauseMusic(){
        this.song.pause();
    }
}
  
class Playlist{
  
    constructor(name, id){
      this.name = name;
      this.id = id;
      this.songs = [];
    }
    
    add(song){
      this.songs.push(song);
    }
  
    play(index){
      if (this.songs[index] != null && this.songs[index] instanceof Song){
        this.songs[index].playMusic();
      }
  
    }
  
}


//************************************************************ */


function preload() {
    soundFormats('mp3');
    

}

function setup() {
    createCanvas(400, 400);
    gui = createGui();
    vol = createSlider("volume", 40, 280, 310);
    play = createButton("⏯", 180, 320, 29, 29);     
    nextButton = createButton("⏭", 320, 320, 29, 29);
    prevButton = createButton("⏮", 40, 320, 29, 29);
    input = createFileInput(handleFile,0,0);
    playlist.push(new Playlist("main", 0));
    nowList = playlist[0].songs;
    nowPlaying = null;

}

function draw() {

    stroke('#000000');
    fill(70);
    strokeWeight(10);
    rect(0, 0, 400, 400, 15);
    drawGui();

    if (vol.isChanged && nowPlaying != null) {
        nowPlaying.song.setVolume(vol.val);
    }
    if (prevButton.isPressed) {
        prev();
    }
    if (nextButton.isPressed) {
        next();
    }
    if (play.isPressed) {
        playsong();
    }
    
}

function next() {
    let index = nowPlaying.id + 1;
  
    if (index > nowList.length - 1) {
        index = 0;
    }
  
    nowPlaying.song.stop();
    nowPlaying = nowList[index];
    nowPlaying.playMusic();
    print("next song is " + index);
}
  
  
function prev() {
    let index = nowPlaying.id - 1;

    if (index < 0) {
        index = nowList.length - 1;
    }

    nowPlaying.song.stop();
    nowPlaying = nowList[index];
    nowPlaying.playMusic();
    print("previous song is " + index);
}
  
function playsong() {

    if(nowPlaying == null){
        nowPlaying = nowList[0];
    }

    if (!status && nowPlaying != null) {
        nowPlaying.playMusic();
        status = true;
    } else {
        status = false;
        nowPlaying.pauseMusic();
    
    }

   
  
}

function handleFile(file) {
    if (file.type === 'audio') {
     playlist[0].songs.push(new Song(file, playlist[0].songs.length));
     let option = document.createElement("option");
     option.setAttribute("value", playlist[0].songs.length - 1);
     option.innerHTML = file.name;
     selectMusic.insertAdjacentElement("beforeend", option);

    }
}

function createPlayList(){

    let input = document.getElementById('namePlaylist');
    let option = document.createElement("option");
    let list = new Playlist(input.value, Playlist.length - 1);
    input.value = "";

    for (let i = 0; i < selectMusic.options.length; i++) {
        if (selectMusic.options[i].selected === true) {
            list.songs.push(playlist[0].songs[selectMusic.options[i].value]);
            selectMusic.options[i].selected = false;
        }  
    }
    
    playlist.push(list);
    option.setAttribute("value", list.id);
    option.innerHTML = list.name;
    selectPlayList.insertAdjacentElement("beforeend", option);
}

function nowPlayList(){
    nowList = playlist[selectPlayList.value].songs;
}



