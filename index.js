let gui;
let play;
let nextButton;
let prevButton;
let trackLoop;
let listLoop;
let randomPlay;
let inputFile;
let current_image = 1;

//song list
let image_filelist = ['images/remini.jpg', 'images/futile.jpg', 'images/rewrite.jpg'];
//album cover
let music_filelist = ['playlist/remini.mp3', 'playlist/futiledevices.mp3', 'playlist/raisedbed.mp3'];


let imagelist = [];
let musiclist = [];
let vol;
let nowPlaying;
let status = 0;

function preload() {
  soundFormats('mp3');


  for (let filename of image_filelist) {
    imagelist.push(loadImage(filename));
  }

  for (let filename of music_filelist) {
    musiclist.push(loadSound(filename));
  }

}



function setup() {
  createCanvas(400, 400);
  gui = createGui();
  vol = createSlider("volume", 40, 280, 310);
  play = createButton("⏯", 180, 320, 29, 29);
  nextButton = createButton("⏭", 320, 320, 29, 29);
  prevButton = createButton("⏮", 40, 320, 29, 29);
  randomPlay = createButton("🔀", 180, 360, 29, 29);
  listLoop = createButton("🔁", 320, 360, 29, 29);
  trackLoop = createButton("🔂", 40, 360, 29, 29);
  input = createFileInput(handleFile,0,0);
  
  nowPlaying = musiclist[current_image];


}

function draw() {

  stroke('#000000');
  fill(70);
  strokeWeight(10);
  rect(0, 0, 400, 400, 15);
  drawGui();
  image(imagelist[current_image], 75, 20, 250, 250);
  if (prevButton.isPressed) {
    prev();
  }
  if (nextButton.isPressed) {
    next();
  }
  if (play.isPressed) {
    playsong();
  }
  if (vol.isChanged) {
    nowPlaying.setVolume(vol.val);
  }


}

function next() {
  current_image = current_image + 1;

  if (current_image > imagelist.length - 1) {
    current_image = 0;
  }


  nowPlaying.stop();
  nowPlaying = musiclist[current_image];
  nowPlaying.play();
  print("next song is " + current_image);
}


function prev() {
  current_image = current_image - 1;
  if (current_image < 0) {
    current_image = imagelist.length - 1;
  }
  nowPlaying.stop();
  nowPlaying = musiclist[current_image];
  nowPlaying.play();
  print("previous song is " + current_image);
}

function playsong() {
  if (status == 0) {
    nowPlaying.play();
    status = 1;
  } else {
    status = 0;
    nowPlaying.pause();

  }

}


function handleFile(file) {
  if (file.type === 'audio') {
   musiclist.push(loadSound(file))
   imagelist.push(loadImage('images/remini.jpg'));
  }
}



