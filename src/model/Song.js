export default class Song {
    
    constructor(image, path){
        this.image = loadImage(image);
        this.song = loadSound(path);

    }

    playMusic(){
        this.song.play();
    }
}
