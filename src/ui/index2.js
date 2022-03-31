let vol;
let nowPlaying;
let gui;
let play;
let nextButton;
let prevButton;
let inputFile;
let mainList = [];  // list of all songs
let playlist = [];  // list of 
let nowList = [];
let input;
let status = false;
const selectPlayList = document.getElementById('selectPlayList');
const selectMusic = document.getElementById('selectMusic');
const option = document.createElement('option');


//************************************************************ */
//Classes

class Song {
    
    constructor(path, id){
        //this.image = loadImage(image);
        this.song = loadSound(path);
        this.id = id;
    
    }
  
    playMusic(){
        this.song.play();
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
    selectPlayList.addEventListener("click", nowPlayList());
    dataLoad();


}

function dataLoad(){
    nowList = mainList;

    if(nowList.length == 0){
        nowPlaying = null;

    }else{
        nowPlaying = nowList[0];
    }
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
  
    if (index > imagelist.length - 1) {
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
        index = imagelist.length - 1;
    }

    nowPlaying.song.stop();
    nowPlaying = nowList[index];
    nowPlaying.playMusic();
    print("previous song is " + index);
}
  
function playsong() {

    if(nowList.length == 0){
        nowPlaying = null;

    }else{
        nowPlaying = nowList[0];
    }

    if (!status && nowPlaying != null) {
      nowPlaying.playMusic();
      status = true;
    } else if (status && nowPlaying != null) {
      status = false;
      nowPlaying.playMusic();
  
    }
  
}

function handleFile(file) {
    if (file.type === 'audio') {
     mainList.push(new Song(file, mainList.length));
     selectMusic.appendChild(document.createTextNode(mainList[mainList.length - 1].id));

    }
}

function createPlayList(name, id){
    let list = new Playlist(name, Playlist.length);
    playlist.push(list);
    option.setAttribute("value", id);
    option.appendChild(document.createTextNode(list.name));
    selectPlayList.appendChild(option);

}

function nowPlayList(){
    nowList = playlist[0];
}



