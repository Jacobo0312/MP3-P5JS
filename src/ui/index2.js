import Song from "/src/model/Song.js";

let vol;
let nowPlaying;
let gui;
let play;
let nextButton;
let prevButton;
let mainList = [];  // list of all songs
let playlist = [];  // list of playlist
const fs = require('fs');

dataLoad();
function preload() {
    soundFormats('mp3');
    

}

function dataLoad(){
    let data = fs.readFileSync('./data/data.json');
    console.log(data);
}

function setup() {
    createCanvas(400, 400);
    gui = createGui();
    vol = createSlider("volume", 40, 280, 310);
    play = createButton("⏯", 180, 320, 29, 29);
    nextButton = createButton("⏭", 320, 320, 29, 29);
    prevButton = createButton("⏮", 40, 320, 29, 29);
    //mainList.push(new Song("images/futile.jpg", "playlist/futiledevices.mp3"));
    //mainList.push(new Song("images/futile.jpg", "playlist/futiledevices.mp3"));
    nowPlaying = null;


}

function draw() {

    stroke('#000000');
    fill(70);
    strokeWeight(10);
    rect(0, 0, 400, 400, 15);
    drawGui();

    if (vol.isChanged && nowPlaying != null) {
        nowPlaying.setVolume(vol.val);
    }
}

